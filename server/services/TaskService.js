/* eslint-disable max-len */
const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');

const hideAttributes = ['PasswordHash', 'PasswordSalt'];

class TaskService {
    constructor(log) {
        this.log = log;
    }

    // GetForProject
    async getAllByProjectId(projectId) {
        const tasks = await db.Task.findAll({
            where: { ProjectId: projectId },
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'Assignee',
                    include: { model: await db.UserPic },
                },
                { model: await db.Deliverable },
                {
                    model: await db.AsanaDeliverableType,
                    include: { model: await db.DeliverableType },
                },
                {
                    model: await db.TaskComment,
                    include: {
                        model: await db.User,
                        attributes: { exclude: hideAttributes },
                        as: 'CreatedBy',
                        include: { model: await db.UserPic },
                    },
                },
            ],
        });

        return tasks;
    }

    // GetByAsanaProjectGid
    async getAllByAsanaProjectIdOfProject(asanaProjectId) {
        const tasks = await db.Task.findAll({
            include: [
                {
                    model: await db.Project,
                    where: { AsanaProjectId: asanaProjectId },
                },
            ],
        });

        return tasks;
    }

    // GetById
    async getById(id) {
        const task = await db.Task.findOne({
            where: { Id: id },
            include: [
                { model: await db.Deliverable },
                {
                    model: await db.AsanaDeliverableType,
                    include: { model: await db.DeliverableType },
                },
                {
                    model: await db.TaskComment,
                    include: {
                        model: await db.User,
                        attributes: { exclude: hideAttributes },
                        as: 'CreatedBy',
                        include: { model: await db.UserPic },
                    },
                },
            ],
        });

        return task;
    }

    // GetByIdWithProjectAndContact
    async getByIdWithProjectAndMainContact(id) {
        const task = await db.Task.findOne({
            where: { Id: id },
            include: [
                {
                    model: await db.User,
                    attributes: { exclude: hideAttributes },
                    as: 'Assignee',
                    include: { model: await db.UserPic },
                },
                { model: await db.Deliverable },
                {
                    model: await db.AsanaDeliverableType,
                    include: { model: await db.DeliverableType },
                },
                {
                    model: await db.TaskComment,
                    include: {
                        model: await db.User,
                        attributes: { exclude: hideAttributes },
                        as: 'CreatedBy',
                        include: { model: await db.UserPic },
                    },
                },
                {
                    model: await db.Project,
                    include: {
                        model: await db.User,
                        attributes: { exclude: hideAttributes },
                        as: 'MainContact',
                    },
                },
            ],
        });

        return task;
    }

    // GetTaskForAsanaSync
    async getForAsanaSync(skip = 0) {
        const task = await db.Task.findOne({
            offset: skip,
            // Complex where clauses at the top-level
            where: {
                '$Project.ProjectStatusId$': { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            include: [
                {
                    model: await db.TaskComment,
                    include: {
                        model: await db.User,
                        attributes: { exclude: hideAttributes },
                        as: 'CreatedBy',
                    },
                },
                { model: await db.Project },
            ],
            order: [['Id', 'ASC']],
        });

        return task;
    }

    async createTask(body) {
        const values = {
            Id: uuid(),
            AsanaGid: body.AsanaGid,
            Name: body.Name,
            Description: body.Description,
            DueDate: body.DueDate,
            AssignedToCustomer: body.AssignedToCustomer,
            NeedsApproval: body.NeedsApproval,
            Completed: body.Completed,
            AssistanceRequestedAt: body.AssistanceRequestedAt,
            Revision: body.Revision,
            HelpfulMaterial: body.HelpfulMaterial,
            Note: body.Note,
            Done: body.Done,
            AsanaTeamProjectGid: body.AsanaTeamProjectGid,
            AsanaDeliverableTypeId: body.AsanaDeliverableTypeId ? body.AsanaDeliverableTypeId : null,
            ProjectId: body.ProjectId,
            AssigneeId: body.AssigneeId ? body.AssigneeId : null,
        };
        const newTask = await db.Task.create(values);

        return newTask;
    }

    async updateTask(id, body) {
        const task = await db.Task.findByPk(id);
        let assignedToCustomer;
        let needsApproval;
        let completed;
        let revision;
        let done;
        let asanaDeliverableTypeId;
        let projectId;
        let assigneeId;

        if (body.AssignedToCustomer || body.AssignedToCustomer === false) {
            assignedToCustomer = body.AssignedToCustomer;
        }
        if (body.NeedsApproval || body.NeedsApproval === false) {
            needsApproval = body.NeedsApproval;
        }
        if (body.Completed || body.Completed === false) {
            completed = body.Completed;
        }
        if (body.Revision || body.Revision === false) {
            revision = body.Revision;
        }
        if (body.Done || body.Done === false) {
            done = body.Done;
        }
        if (body.AsanaDeliverableTypeId) {
            asanaDeliverableTypeId = body.AsanaDeliverableTypeId;
        }
        if (body.ProjectId) {
            projectId = body.ProjectId;
        }
        if (body.AssigneeId) {
            assigneeId = body.AssigneeId;
        }

        const values = {
            AsanaGid: body.AsanaGid ? body.AsanaGid : task.AsanaGid,
            Name: body.Name ? body.Name : task.Name,
            Description: body.Description ? body.Description : task.Description,
            DueDate: body.DueDate ? body.DueDate : task.DueDate,
            AssignedToCustomer: assignedToCustomer,
            NeedsApproval: needsApproval,
            Completed: completed,
            AssistanceRequestedAt: body.AssistanceRequestedAt ? body.AssistanceRequestedAt : task.AssistanceRequestedAt,
            Revision: revision,
            HelpfulMaterial: body.HelpfulMaterial ? body.HelpfulMaterial : task.HelpfulMaterial,
            Note: body.Note ? body.Note : task.Note,
            Done: done,
            AsanaTeamProjectGid: body.AsanaTeamProjectGid ? body.AsanaTeamProjectGid : task.AsanaTeamProjectGid,
            AsanaDeliverableTypeId: asanaDeliverableTypeId,
            ProjectId: projectId,
            AssigneeId: assigneeId,
        };
        const updateTask = await db.Task.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTask[1].dataValues;
    }

    async deleteTask(id) {
        await db.Task.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM
    async getByAsanaGid(asanaGid) {
        const task = await db.Task.findOne({
            where: { AsanaGid: asanaGid },
        });

        return task;
    }
}

module.exports = TaskService;
