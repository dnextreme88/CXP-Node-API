/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const Helpers = require('../lib/Helpers');
const AmazonS3Service = require('../lib/AmazonS3Service');
const ConstantsService = require('../lib/ConstantsService');
const PaginationService = require('../lib/PaginationService');

const helpers = new Helpers();
const amazonS3 = new AmazonS3Service();
const constants = new ConstantsService();
const pagination = new PaginationService();

const hideAttributes = ['PasswordHash', 'PasswordSalt'];

const joinPodProject = 'LEFT OUTER JOIN "PodProject" AS "PodProject" ON "Project"."Id" = "PodProject"."ProjectId"';
const joinCustomer = 'LEFT OUTER JOIN "Customer" AS "Customer" ON "Project"."CustomerId" = "Customer"."Id"';
const joinUser = 'LEFT OUTER JOIN "User" AS "User" ON "Project"."MainContactId" = "User"."Id"';
const joinGoal = 'LEFT OUTER JOIN "Goal" AS "Goal" ON "Project"."Id" = "Goal"."ProjectId"';
const joinGoalType = 'LEFT OUTER JOIN "GoalType" AS "GoalType" ON "Goal"."GoalTypeId" = "GoalType"."Id"';

class ProjectService {
    constructor(log) {
        this.log = log;
    }

    // Get
    // TODO: To modify query for selecting distinct GoalTypes
    async getPaged(paginationParams, isVictoriousAdmin, customerId, podId) {
        const projectAttr = await db.Project.rawAttributes;
        const projectFields = [];
        let query;

        for (const fieldKey in projectAttr) {
            const fieldName = '"Project"."' + projectAttr[fieldKey].field + '"';
            projectFields.push(fieldName);
        }

        // NOTE: Removed 'AND NOT "ProjectStatusId" = \'5\' at the end as it's conflicting with the
        // totalActive and totalInactive vars. These 2 vars are getting records whose ProjectStatusId
        // is either Not Archived or Archived, respectively.
        if (podId === null) {
            query = 'SELECT ' + projectFields + ' FROM "Project" AS "Project" '
            + joinPodProject + ' ' + joinCustomer + ' ' + joinUser
            + ' WHERE ("Project"."CustomerId" = \'' + customerId + '\')';
        } else {
            query = 'SELECT ' + projectFields + ' FROM "Project" AS "Project" '
            + joinPodProject + ' ' + joinCustomer + ' ' + joinUser
            + ' WHERE ("PodProject"."PodId" = \'' + podId + '\' OR "Project"."CustomerId" = \'' + customerId + '\')';
        }

        if (paginationParams.Search) {
            const searchString = paginationParams.Search.toLowerCase();

            query += ' AND ("Customer"."Name" LIKE \'%' + searchString
            + '%\' OR "Project"."Name" LIKE \'%' + searchString
            + '%\' OR "User"."FirstName" LIKE \'%' + searchString
            + '%\' OR "User"."LastName" LIKE \'%' + searchString + '%\')';
        }

        // Add ORDER BY params to query
        query += await pagination.orderByParams('project', paginationParams.OrderBy, paginationParams.Direction);

        let orderByClause;
        const selectUntilOrderByClause = query.slice(0, query.indexOf('ORDER BY'));
        orderByClause = query.slice(query.indexOf('ORDER BY'), query.length);
        // Build query strings
        const activeBuildQuery = selectUntilOrderByClause + ' AND "Project"."ProjectStatusId" != 5 ' + orderByClause;
        const inactiveBuildQuery = selectUntilOrderByClause + ' AND "Project"."ProjectStatusId" = 5 ' + orderByClause;

        const activeQuery = await db.sequelize.query(
            activeBuildQuery, { type: db.sequelize.QueryTypes.SELECT },
        );

        const inactiveQuery = await db.sequelize.query(
            inactiveBuildQuery, { type: db.sequelize.QueryTypes.SELECT },
        );

        let newQuery = paginationParams.Active === 'true' ? activeBuildQuery : inactiveBuildQuery;

        // Add LIMIT and OFFSET params to query
        newQuery += await pagination.pageByPagingParams(paginationParams.Take, paginationParams.Skip);

        const runNewQuery = await db.sequelize.query(
            newQuery, { type: db.sequelize.QueryTypes.SELECT },
        );

        let leftOuterJoinBuildQuery = '';
        const selectToFrom = newQuery.slice(0, newQuery.indexOf('FROM'));
        const fromToLeftOuterJoin = newQuery.slice(newQuery.indexOf('FROM'), newQuery.indexOf('LEFT OUTER JOIN'));
        const leftOuterJoinToWhere = newQuery.slice(newQuery.indexOf('LEFT OUTER JOIN'), newQuery.indexOf('WHERE'));
        const whereToOrderBy = newQuery.slice(newQuery.indexOf('WHERE'), newQuery.indexOf('ORDER BY'));
        orderByClause = newQuery.slice(newQuery.indexOf('ORDER BY'), newQuery.length);
        const goalTypeSelectBuildQuery = selectToFrom + ', "Goal"."GoalTypeId" ';

        // GoalTypesCount
        leftOuterJoinBuildQuery = goalTypeSelectBuildQuery + fromToLeftOuterJoin + leftOuterJoinToWhere
        + joinGoal + joinGoalType;

        // TODO: To fix, not-so solution to select distinct count
        const goalTypeWhereBuildQuery = leftOuterJoinBuildQuery + whereToOrderBy
        + ' AND "Goal"."GoalTypeId" IS NOT null ' + orderByClause;

        // QUERY
        const goalTypeCountQuery = await db.sequelize.query(
            goalTypeWhereBuildQuery, { type: db.sequelize.QueryTypes.SELECT },
        );

        // HasTotalAndPageOne
        leftOuterJoinBuildQuery = goalTypeSelectBuildQuery + fromToLeftOuterJoin + leftOuterJoinToWhere
        + joinGoal + joinGoalType;

        // QUERY
        const hasTotalPageOneWhereBuildQuery = leftOuterJoinBuildQuery + whereToOrderBy
        + ' AND ("Goal"."GoalTypeId" = 6 OR "Goal"."GoalTypeId" = 2) ' + orderByClause;

        const hasTotalAndPageOneQuery = await db.sequelize.query(
            hasTotalPageOneWhereBuildQuery, { type: db.sequelize.QueryTypes.SELECT },
        );

        // ActiveCommentCount
        const date12DaysAgo = helpers.dateLessFromToday(12); // CommentValidDays = 12

        const commentSelectBuildQuery = selectToFrom
        + ', "Comment"."Active", "Comment"."ModifiedAt" AS "CModifiedAt" ';

        leftOuterJoinBuildQuery = commentSelectBuildQuery
        + fromToLeftOuterJoin + leftOuterJoinToWhere
        + 'LEFT OUTER JOIN "Comment" AS "Comment" ON "Project"."Id" = "Comment"."ProjectId" ';

        // QUERY
        const commentWhereBuildQuery = leftOuterJoinBuildQuery + whereToOrderBy
        + ' AND ("Comment"."Active" = true AND "Comment"."ModifiedAt" >= \'' + date12DaysAgo + '\') '
        + orderByClause;

        const activeCommentCountQuery = await db.sequelize.query(
            commentWhereBuildQuery, { type: db.sequelize.QueryTypes.SELECT },
        );

        const result = {
            Project: runNewQuery,
            GoalTypesCount: goalTypeCountQuery.length,
            HasTotalAndPageOne: hasTotalAndPageOneQuery.length > 0, // boolean
            ActiveCommentCount: activeCommentCountQuery.length,
        };

        // let numberOfCommentTypesPerGoal = 2;
        // commentsNeeded = (1 - ActiveCommentCount) + (numberOfCommentTypesPerGoal * GoalTypesCount) - (HasTotalAndPageOne ? 2 : 0)
        const commentsNeeded = (1 - result.ActiveCommentCount) + (2 * result.GoalTypesCount) - (result.HasTotalAndPageOne ? 2 : 0);

        const projectCommentsNeeded = { Project: result.Project, CommentsNeeded: commentsNeeded };

        // ProjectPagedData
        return {
            Result: projectCommentsNeeded,
            InactiveCount: inactiveQuery.length,
            ActiveCount: activeQuery.length,
        };
    }

    // GetProjectByStatus
    async getAllByProjectStatusId(projectStatusId) {
        const projects = await db.Project.findAll({
            where: { ProjectStatusId: projectStatusId },
        });

        return projects;
    }

    // GetAllByCustomerId
    async getAllByCustomerId(customerId) {
        const projects = await db.Project.findAll({
            where: {
                CustomerId: customerId,
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            include: [
                {
                    model: await db.Customer,
                },
                {
                    model: await db.PodProject,
                    include: { model: await db.Pod },
                },
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'MainContact',
                    include: { model: await db.UserPic },
                },
            ],
            order: [['Name', 'ASC']],
        });

        return projects;
    }

    // GetAllByMainContact
    async getAllByMainContactId(userId) {
        const projects = await db.Project.findAll({
            where: { MainContactId: userId },
        });

        return projects;
    }

    // GetProjectGaJob
    async getAllGaJob() {
        const projects = await db.Project.findAll({
            where: {
                GoogleAnalyticsViewId: { [Op.not]: null },
                GoogleAnalyticsPropertyId: { [Op.not]: null },
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            include: { model: await db.Goal },
        });

        return projects;
    }

    // GetProjectBackfillIncrement
    async getAllForBackfillIncrement() {
        const projects = await db.Project.findAll({
            where: {
                GoogleAnalyticsViewId: { [Op.not]: null },
                GoogleAnalyticsPropertyId: { [Op.not]: null },
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
        });

        return projects;
    }

    // GetById
    async getById(id) {
        const project = await db.Project.findOne({
            where: { Id: id },
            include: [
                { model: await db.Customer },
                {
                    model: await db.PodProject,
                    include: { model: await db.Pod },
                },
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'MainContact',
                    include: { model: await db.UserPic },
                },
            ],
        });

        return project;
    }

    // GetByIdList
    async getByIdList(id) {
        const projects = await db.Project.findAll({
            where: { Id: id },
        });

        return projects;
    }

    // GetByIdWithPods
    async getByIdWithPods(id) {
        const project = await db.Project.findOne({
            where: { Id: id },
            include: { model: await db.PodProject },
        });

        return project;
    }

    // UserHasAccess
    async checkIfUserHasAccess(id, customerId) {
        const project = await db.Project.findOne({
            where: {
                Id: id,
                CustomerId: customerId,
            },
        });

        if (!project) return false;

        return true;
    }

    // ProjectHasAnyGoals
    async checkIfProjectHasAnyGoals(id) {
        const project = await db.Project.findOne({
            where: { Id: id },
            include: { model: await db.Goal },
        });

        if (project.dataValues.Goal === null) return false;

        return true;
    }

    // GooglePropertyExists
    async checkIfGoogleAnalyticsPropertyIdExists(googleAnalyticsPropertyId) {
        const project = await db.Project.findOne({
            where: { GoogleAnalyticsPropertyId: googleAnalyticsPropertyId },
        });

        if (!project) return false;

        return true;
    }

    // GoogleViewExists
    async checkIfGoogleAnalyticsViewIdExists(googleAnalyticsViewId) {
        const project = await db.Project.findOne({
            where: { GoogleAnalyticsViewId: googleAnalyticsViewId },
        });

        if (!project) return false;

        return true;
    }

    // AsanaIdExists
    async checkIfAsanaProjectIdExists(asanaProjectId) {
        const project = await db.Project.findOne({
            where: { AsanaProjectId: asanaProjectId },
        });

        if (!project) return false;

        return true;
    }

    // AsanaIdInvalid
    async checkIfAsanaProjectIdIsInvalid(id, asanaProjectId) {
        const project = await db.Project.findOne({
            where: {
                Id: { [Op.not]: id },
                AsanaProjectId: asanaProjectId,
            },
        });

        if (!project) return true;

        return false;
    }

    // GetProjectForAsanaSync
    async getByOffsetForAsanaSync(skip = 0) {
        const project = await db.Project.findOne({
            offset: skip,
            where: {
                AsanaProjectId: { [Op.not]: null },
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            include: [
                { model: await db.Deliverable },
                { model: await db.Task },
            ],
            order: [['Id', 'ASC']],
        });

        return project;
    }

    // GetProjectForTargetKeywordPositioningSync
    async getByOffsetForTargetKeywordPositioningSync(skip = 0) {
        const project = await db.Project.findOne({
            offset: skip,
            where: {
                GoogleDriveFolderId: { [Op.not]: null },
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            include: [
                {
                    model: await db.Goal,
                },
                {
                    model: await db.TargetPage,
                    include: { model: await db.TargetKeyword, as: 'Keywords' },
                },
            ],
            order: [['Id', 'ASC']],
        });

        return project;
    }

    // GetProjectForTargetPagesAndKeywordSync
    async getByOffsetForTargetPagesAndKeywordSync(skip = 0) {
        const project = await db.Project.findOne({
            offset: skip,
            where: {
                GoogleDriveFolderId: { [Op.not]: null },
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            order: [['Id', 'ASC']],
        });

        return project;
    }

    // GetProjectForTotalKeywordsRanked
    async getByOffsetForTotalKeywordsRanked(skip = 0) {
        const project = await db.Project.findOne({
            offset: skip,
            where: {
                Domain: { [Op.not]: null },
                ProjectStatusId: { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            order: [['Id', 'ASC']],
            include: { model: await db.Goal },
        });

        return project;
    }

    // ProjectExistsForCustomer
    async checkIfProjectExistsForCustomer(customerId) {
        const project = await db.Project.findOne({
            where: {
                CustomerId: customerId,
                ProjectStatusId: { [Op.notIn]: [1, 5] }, // NOT Setup required OR NOT Archived
            },
        });

        if (!project) return false;

        return true;
    }

    async createProject(body) {
        const values = {
            Id: uuid(),
            Name: body.Name,
            AsanaProjectId: body.AsanaProjectId ? body.AsanaProjectId : null,
            AsanaRefName: body.AsanaRefName ? body.AsanaRefName : null,
            AsanaOwnerName: body.AsanaOwnerName ? body.AsanaOwnerName : null,
            AsanaTeamName: body.AsanaTeamName ? body.AsanaTeamName : null,
            AsanaCreatedAt: body.AsanaCreatedAt ? body.AsanaCreatedAt : null,
            GoogleAnalyticsPropertyId: body.GoogleAnalyticsPropertyId ? body.GoogleAnalyticsPropertyId : null,
            GoogleAnalyticsViewId: body.GoogleAnalyticsViewId ? body.GoogleAnalyticsViewId : null,
            Domain: body.Domain ? body.Domain : null,
            GoogleDriveFolderId: body.GoogleDriveFolderId ? body.GoogleDriveFolderId : null,
            GoogleDriveFolderName: body.GoogleDriveFolderName ? body.GoogleDriveFolderName : null,
            ContractFileName: body.ContractFileName ? body.ContractFileName : null,
            ContractLocation: body.ContractLocation,
            LogoLocation: body.LogoLocation,
            AsanaSectionDone: body.AsanaSectionDone ? body.AsanaSectionDone : null,
            AsanaSectionRevision: body.AsanaSectionRevision ? body.AsanaSectionRevision : null,
            MaxBackfills: body.MaxBackfills ? body.MaxBackfills : 12,
            NumBackfills: body.NumBackfills ? body.NumBackfills : 0,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CustomerId: body.CustomerId,
            ProjectStatusId: body.ProjectStatusId,
            TenantId: body.TenantId,
            MainContactId: body.MainContactId ? body.MainContactId : null,
        };
        const newProject = await db.Project.create(values);
        await newProject.setDataValue('CreatedById', body.UserId);
        await newProject.setDataValue('ModifiedById', body.UserId);
        await newProject.save();

        return newProject;
    }

    async updateProject(id, body) {
        const project = await db.Project.findByPk(id);
        let customerId;
        let projectStatusId;
        let tenantId;
        let mainContactId;
        let userId;

        if (body.CustomerId) {
            customerId = body.CustomerId;
        }
        if (body.ProjectStatusId) {
            projectStatusId = body.ProjectStatusId;
        }
        if (body.TenantId) {
            tenantId = body.TenantId;
        }
        if (body.MainContactId) {
            mainContactId = body.MainContactId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Name: body.Name ? body.Name : project.Name,
            AsanaProjectId: body.AsanaProjectId ? body.AsanaProjectId : project.AsanaProjectId,
            AsanaRefName: body.AsanaRefName ? body.AsanaRefName : project.AsanaRefName,
            AsanaOwnerName: body.AsanaOwnerName ? body.AsanaOwnerName : project.AsanaOwnerName,
            AsanaTeamName: body.AsanaTeamName ? body.AsanaTeamName : project.AsanaTeamName,
            AsanaCreatedAt: body.AsanaCreatedAt ? body.AsanaCreatedAt : project.AsanaCreatedAt,
            GoogleAnalyticsPropertyId: body.GoogleAnalyticsPropertyId
                ? body.GoogleAnalyticsPropertyId : project.GoogleAnalyticsPropertyId,
            GoogleAnalyticsViewId: body.GoogleAnalyticsViewId
                ? body.GoogleAnalyticsViewId : project.GoogleAnalyticsViewId,
            Domain: body.Domain ? body.Domain : project.Domain,
            GoogleDriveFolderId: body.GoogleDriveFolderId
                ? body.GoogleDriveFolderId : project.GoogleDriveFolderId,
            GoogleDriveFolderName: body.GoogleDriveFolderName
                ? body.GoogleDriveFolderName : project.GoogleDriveFolderName,
            ContractFileName: body.ContractFileName,
            ContractLocation: body.ContractLocation,
            LogoLocation: body.LogoLocation,
            AsanaSectionDone: body.AsanaSectionDone
                ? body.AsanaSectionDone : project.AsanaSectionDone,
            AsanaSectionRevision: body.AsanaSectionRevision
                ? body.AsanaSectionRevision : project.AsanaSectionRevision,
            MaxBackfills: body.MaxBackfills ? body.MaxBackfills : project.MaxBackfills,
            NumBackfills: body.NumBackfills ? body.NumBackfills : project.NumBackfills,
            CreatedAt: project.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: project.CreatedById,
            ModifiedById: userId,
            CustomerId: customerId,
            ProjectStatusId: projectStatusId,
            TenantId: tenantId,
            MainContactId: mainContactId,
        };
        const updateProject = await db.Project.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateProject[1].dataValues;
    }

    async deleteProject(id) {
        await db.Project.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM - Implemented from BlProject.cs
    // GetContract
    async getContract(id) {
        const project = await db.Project.findByPk(id);

        if (!project.ContractLocation) return null;

        const url = await amazonS3.getPresignedUrlRequest(await constants.getContractBucket(), project.ContractLocation);

        return url;
    }

    // UploadLogo
    async uploadLogo(id, file) {
        const project = await db.Project.findByPk(id);
        const oldLogo = project.LogoLocation;
        const key = file.path;
        const values = { LogoLocation: key };

        const updatedProject = await this.updateProject(project.Id, values);

        if (!oldLogo) {
            await amazonS3.deleteFileS3(oldLogo, await constants.getImageBucket());
        }

        await amazonS3.uploadFileToS3(file, key, await constants.getImageBucket(), 'public-read');

        return updatedProject;
    }

    // DeleteLogo
    async deleteLogo(id) {
        const project = await db.Project.findByPk(id);
        const oldLogo = project.LogoLocation;
        const values = { LogoLocation: null };

        const updatedProject = await this.updateProject(project.Id, values);

        if (!oldLogo) {
            await amazonS3.deleteFileS3(oldLogo, await constants.getImageBucket());
        }

        return updatedProject;
    }

    // UploadContract
    async uploadContract(id, file) {
        const project = await db.Project.findByPk(id);
        const fileName = file.filename;
        const oldContract = project.ContractLocation;
        const key = file.path;
        const values = { ContractLocation: key, ContractFileName: fileName };

        const updatedProject = await this.updateProject(project.Id, values);

        await amazonS3.uploadFileToS3(file, key, await constants.getContractBucket(), 'bucket-owner-full-control');

        if (!oldContract) {
            await amazonS3.deleteFileS3(oldContract, await constants.getContractBucket());
        }

        return updatedProject;
    }

    // DeleteContract
    async deleteContract(id) {
        const project = await db.Project.findByPk(id);
        const oldContract = project.ContractLocation;
        const projectValues = { ContractLocation: null, ContractFileName: null };
        const updatedProject = await this.updateProject(project.Id, projectValues);

        if (!oldContract) {
            await amazonS3.deleteFileS3(oldContract, await constants.getContractBucket());
        }

        return updatedProject;
    }

    // UpdateProjectStatus
    async updateProjectStatus(id, projectStatusId) {
        const project = await db.Project.findByPk(id);
        let newProjectStatusIdValue;
        if (projectStatusId > project.ProjectStatusId) newProjectStatusIdValue = projectStatusId;

        const projectValues = { ProjectStatusId: newProjectStatusIdValue };
        const updatedProject = await this.updateProject(id, projectValues);

        return updatedProject;
    }
}

module.exports = ProjectService;
