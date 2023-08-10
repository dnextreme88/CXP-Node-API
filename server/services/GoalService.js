const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const NotificationAppService = require('./NotificationAppService');

const notificationApps = new NotificationAppService(this.log);

class GoalService {
    constructor(log) {
        this.log = log;
    }

    // GetForProject
    async getAllByProjectId(projectId) {
        const goals = await db.Goal.findAll({
            where: { ProjectId: projectId },
        });

        return goals;
    }

    // GetActiveForProject
    async getAllActiveForProject(projectId) {
        const goals = await db.Goal.findAll({
            where: {
                ValidFrom: { [Op.lt]: new Date() },
                ValidTo: { [Op.gt]: new Date() },
                ProjectId: projectId,
            },
        });

        return goals;
    }

    // GetLatestForProject
    async getAllLatestForProject(projectId) {
        const goalTypes = await db.GoalType.findAll({
            include: [
                {
                    model: await db.Goal,
                    where: { ProjectId: projectId },
                    order: [['ValidTo', 'DESC']],
                },
            ],
        });

        return goalTypes;
    }

    // GetById
    async getById(id) {
        const goal = await db.Goal.findByPk(id);

        return goal;
    }

    // GetLastGoalForProjectByType
    async getLastGoalByProjectIdAndGoalTypeId(projectId, goalTypeId) {
        const goal = await db.Goal.findOne({
            where: {
                ProjectId: projectId,
                GoalTypeId: goalTypeId,
            },
            order: [['ValidTo', 'DESC']],
        });

        return goal;
    }

    // UserHasAccess
    async checkIfUserHasAccess(customerId, goalsArray) {
        const goal = await db.Goal.findOne({
            where: {
                Id: { [Op.in]: goalsArray },
            },
            include: [
                {
                    model: await db.Project,
                    where: { CustomerId: customerId },
                },
            ],
        });

        if (goal) return true;

        return false;
    }

    // IsValidNewGoal
    async checkIfValidNewGoal(body) {
        const goal = await db.Goal.findOne({
            where: {
                // All goals of type must expire before a new goal can be setup
                ValidTo: { [Op.gte]: new Date() },
                ProjectId: body.ProjectId,
                GoalTypeId: body.GoalTypeId,
            },
        });

        if (!goal) return true;

        return false;
    }

    async createGoal(body) {
        const values = {
            Id: uuid(),
            ValidFrom: body.ValidFrom,
            ValidTo: body.ValidTo,
            Goal: body.Goal,
            InitialValue: body.InitialValue,
            EndValue: body.EndValue,
            // Don't fill this up upon creation as goals cannot be reached
            // immediately when the goal is initially set
            GoalReachedAt: null,
            PerformanceIncreasedCount: body.PerformanceIncreasedCount,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            ProjectId: body.ProjectId,
            GoalTypeId: body.GoalTypeId,
        };
        const newGoal = await db.Goal.create(values);
        await newGoal.setDataValue('CreatedById', body.UserId);
        await newGoal.setDataValue('ModifiedById', body.UserId);
        await newGoal.save();

        return newGoal;
    }

    async bulkCreateGoal(valuesArray) {
        const newGoals = await db.Goal.bulkCreate(valuesArray, {
            validate: true,
            returning: true,
        });

        return newGoals;
    }

    async updateGoal(id, body) {
        const goal = await db.Goal.findByPk(id);
        let projectId;
        let goalTypeId;

        if (body.ProjectId) {
            projectId = body.ProjectId;
        }
        if (body.GoalTypeId) {
            goalTypeId = body.GoalTypeId;
        }

        const values = {
            ValidFrom: body.ValidFrom ? body.ValidFrom : goal.ValidFrom,
            ValidTo: body.ValidTo ? body.ValidTo : goal.ValidTo,
            Goal: body.GoalName ? body.GoalName : goal.Goal,
            InitialValue: body.InitialValue ? body.InitialValue : goal.InitialValue,
            EndValue: body.EndValue ? body.EndValue : goal.EndValue,
            GoalReachedAt: body.GoalReachedAt ? body.GoalReachedAt : goal.GoalReachedAt,
            PerformanceIncreasedCount: body.PerformanceIncreasedCount
                ? body.PerformanceIncreasedCount : goal.PerformanceIncreasedCount,
            CreatedAt: goal.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: goal.CreatedById,
            ModifiedById: goal.ModifiedById,
            ProjectId: projectId,
            GoalTypeId: goalTypeId,
        };
        const updateGoal = await db.Goal.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateGoal[1].dataValues;
    }

    async deleteGoal(id) {
        await db.Goal.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM, used in cronjobs
    async createNotificationForGoalType(goalObj, sum, tenantId, goalTypeId, domainData = null) {
        const values = { TenantId: tenantId, GoalId: goalObj.Id };

        let isGoalReached = await this.isGoalReached(goalObj, sum);
        // For TotalKeywordsRankedJob
        if (domainData) {
            if (goalTypeId === 2) { // Total keywords ranked
                isGoalReached = await this.isGoalReached(goalObj, sum, 2, domainData);
            } else if (goalTypeId === 6) { // Page one keyword
                isGoalReached = await this.isGoalReached(goalObj, sum, 6, domainData);
            }
        }

        const goal = await this.getById(goalObj.Id);
        if (isGoalReached) {
            goal.GoalReachedAt = new Date();
            await goal.save();

            if (goalTypeId === 1) { // GoalTypeId: 1 = Organic search traffic
                values.Title = 'We reached your Organic search traffic goal';

                values.Description = 'Organic search traffic description';
            } else if (goalTypeId === 5) { // GoalTypeId: 5 = eCommerce/Revenue tracking
                values.Title = 'We reached your eCommerce goal';

                values.Description = 'eCommerce goal description';
            } else if (goalTypeId === 4) { // GoalTypeId: 4 = Goal conversions
                values.Title = 'We reached your Goal conversions goal';

                values.Description = 'Goal conversions description';
            } else if (goalTypeId === 3) { // GoalTypeId: 3 = Target keyword positioning
                values.Title = 'We reached your Target keyword positioning goal';

                values.Description = 'Target keyword positioning description';
            } else if (goalTypeId === 2) { // GoalTypeId: 2 = Total keywords ranked
                values.Title = 'We reached your Total keywords ranked goal';

                values.Description = 'Total keywords ranked description';
            } else if (goalTypeId === 6) { // GoalTypeId: 6 = Page one keyword
                values.Title = 'We reached your Page one keyword goal';

                values.Description = 'Page one keyword description';
            }

            const celebrationType = 4; // NotificationAppTypeId: 4 = Celebration
            values.NotificationAppTypeId = celebrationType;
            await notificationApps.createNotificationApp(values);

            const goalReachedType = 2; // NotificationAppTypeId: 2 = GoalReached
            values.NotificationAppTypeId = goalReachedType;
            await notificationApps.createNotificationApp(values);
        } else if (goalObj != null && !goalObj.Goal) {
            const increase = sum - goalObj.InitialValue;
            const percentIncrease = increase / (goalObj.InitialValue * 100);

            // GoalConstants.PerformanceIncreasedThreshold = 20;
            if (percentIncrease >= (goalObj.PerformanceIncreasedCount + 1) * 20) {
                goal.PerformanceIncreasedCount += 1;
                values.Title = `${percentIncrease}%`;
                await goal.save();

                if (goalTypeId === 1) { // GoalTypeId: 1 = Organic search traffic
                    values.Description = `We achieved a ${percentIncrease}% increase for Organic search traffic goal`;
                } else if (goalTypeId === 5) { // GoalTypeId: 5 = eCommerce/Revenue tracking
                    values.Description = `We achieved a ${percentIncrease}% increase for eCommerce goal`;
                } else if (goalTypeId === 4) { // GoalTypeId: 4 = Goal conversions
                    values.Description = `We achieved a ${percentIncrease}% increase for Goal conversions goal`;
                } else if (goalTypeId === 3) { // GoalTypeId: 3 = Target keyword positioning
                    values.Description = `We achieved a ${percentIncrease}% increase for Target keyword positioning goal`;
                } else if (goalTypeId === 2) { // GoalTypeId: 2 = Total keywords ranked
                    values.Description = `We achieved a ${percentIncrease}% increase for Total keywords ranked goal`;
                } else if (goalTypeId === 6) { // GoalTypeId: 6 = Page one keyword
                    values.Description = `We achieved a ${percentIncrease}% increase for Page one keyword goal`;
                }

                const perfIncreaseType = 5; // NotificationAppTypeId: 5 = Performance increase
                values.NotificationAppTypeId = perfIncreaseType;
                await notificationApps.createNotificationApp(values);

                const goalReachedType = 2; // NotificationAppTypeId: 2 = GoalReached
                values.NotificationAppTypeId = goalReachedType;
                await notificationApps.createNotificationApp(values);
            }
        }
    }

    async isGoalReached(goal, value, goalTypeId = null, domainData = null) {
        if (domainData !== null) { // For TotalKeywordsRankedJob
            if (goalTypeId === 2) { // Total keywords ranked
                return goal != null
                    && !goal.GoalReachedAt
                    && goal.Goal
                    && domainData.Top100 >= goal.Goal;
            }
            // Page one keyword
            return goal != null
                    && !goal.GoalReachedAt
                    && goal.Goal
                    && domainData.Top10 >= goal.Goal;
        }
        // All the rest
        return goal != null && !goal.GoalReachedAt && goal.Goal && value >= goal.Goal;
    }
}

module.exports = GoalService;
