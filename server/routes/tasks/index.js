/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unneeded-ternary */
require('dotenv').config(); // .env
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const UserResolverService = require('../../lib/UserResolverService');
const MailService = require('../../lib/MailService');
const AsanaService = require('../../lib/AsanaService');

const router = express.Router();
const asanaAccessToken = process.env.ASANA_PERSONAL_ACCESS_TOKEN;

module.exports = (params) => {
    const {
        tasks, asanaDeliverableTypes, deliverables, projects, users, tenantSettings, notificationApps,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const userResolver = new UserResolverService();
    const mail = new MailService();
    const asana = new AsanaService(asanaAccessToken);

    router.get('/', async (request, response, next) => {
        const errorList = {};

        try {
            const { projectId } = request.query;
            let project;
            project = await projects.getById(projectId);
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const asanaTenantSettings = await tenantSettings.getAllByNamePrefix('ASANA');
            const asanaSettings = {};
            for (let i = 0; i < asanaTenantSettings.length; i++) {
                if (asanaTenantSettings[i].Name === 'ASANA_ASSIGNED_TO_CUSTOMER_VALUE') {
                    asanaSettings.assignedToCustomerValue = asanaTenantSettings[i].Val1;
                }
                if (asanaTenantSettings[i].Name === 'ASANA_CUSTOMER_APPROVAL_VALUE') {
                    asanaSettings.customerApprovalValue = asanaTenantSettings[i].Val1;
                }
                if (asanaTenantSettings[i].Name === 'ASANA_FIELD_DELIVERABLE_TYPE') {
                    asanaSettings.fieldDeliverableType = asanaTenantSettings[i].Val1;
                }
                if (asanaTenantSettings[i].Name === 'ASANA_CUSTOMER_DESCRIPTION_FIELD') {
                    asanaSettings.customerDescriptionField = asanaTenantSettings[i].Val1;
                }
                if (asanaTenantSettings[i].Name === 'ASANA_HELPFUL_MATERIAL_FIELD') {
                    asanaSettings.helpfulMaterialField = asanaTenantSettings[i].Val1;
                }
                if (asanaTenantSettings[i].Name === 'ASANA_CUSTOMER_NOTE_FIELD') {
                    asanaSettings.customerNoteField = asanaTenantSettings[i].Val1;
                }
            }
            const asanaTeamProjectSections = await tenantSettings.getAllAsanaTeamProjectSections();
            for (let i = 0; i < asanaTeamProjectSections.length; i++) {
                if (asanaTeamProjectSections[i].Val1 === '1200076563390729'
                    && (asanaTeamProjectSections[i].Name === 'ASANA_TEAM_PROJECT_SECTION_DONE'
                    || asanaTeamProjectSections[i].Name === 'ASANA_TEAM_PROJECT_SECTION_REVISION')) {
                    asanaSettings.asanaProjectGid = asanaTeamProjectSections[i].Val1;
                }
            }

            const skip = 0;
            project = await projects.getByOffsetForAsanaSync(skip);
            try {
                const asanaProject = await asana.getProjectById(project.AsanaProjectId);
                if (asanaProject.message === 'Not a recognized ID' // Deleted in Asana
                    || asanaProject.Team ? asanaProject.team.name.toLowerCase() === 'archived' : '' // Moved to team 'archived'
                    || asanaProject.Archived) { // Action archive
                    project.ProjectStatusId = 5; // EQUAL TO Archived
                    await project.save();
                }

                const newTasksArray = [];
                const newDeliverablesArray = [];
                let newTasks = {};
                let newDeliverables = {};

                const asanaTasks = await asana.getTasksBySection(1200240727313687);
                for (let i = 0; i < asanaTasks.length; i++) {
                    let deliverable;
                    let task;
                    let deliverableValue;
                    let asanaDeliverableType;

                    // Map Asana values to tasks
                    task = await tasks.getByAsanaGid(asanaTasks[i].gid);
                    if (task == null) task = {};

                    task.AsanaGid = asanaTasks[i].gid;
                    task.Name = asanaTasks[i].name;
                    task.DueDate = asanaTasks[i].due_on;
                    task.ProjectId = project.Id;
                    task.Completed = asanaTasks[i].completed;

                    if (asanaTasks[i].custom_fields.length > 0) {
                        for (let j = 0; j < asanaTasks[i].custom_fields.length; j++) {
                            if (asanaTasks[i].custom_fields[j].enum_value) {
                                task.NeedsApproval = asanaTasks[i].custom_fields[j].enum_value.gid === asanaSettings.customerApprovalValue ? true : false;
                                task.AssignedToCustomer = asanaTasks[i].custom_fields[j].enum_value.gid === asanaSettings.assignedToCustomerValue ? true : false;

                                if (asanaTasks[i].custom_fields[j].gid === asanaSettings.fieldDeliverableType) {
                                    deliverableValue = asanaTasks[i].custom_fields[j].enum_value.name;
                                }

                                if (deliverableValue) {
                                    asanaDeliverableType = await asanaDeliverableTypes.getByName(deliverableValue);

                                    if (asanaDeliverableType) {
                                        task.AsanaDeliverableTypeId = asanaDeliverableType.Id;
                                    } else {
                                        task.AsanaDeliverableTypeId = null;
                                    }
                                }
                            }
                            task.Description = asanaTasks[i].custom_fields[j].gid === asanaSettings.customerDescriptionField ? asanaTasks[i].custom_fields[j].text_value : null;
                            task.HelpfulMaterial = asanaTasks[i].custom_fields[j].gid === asanaSettings.helpfulMaterialField ? asanaTasks[i].custom_fields[j].text_value : null;
                            task.Note = asanaTasks[i].custom_fields[j].gid === asanaSettings.customerNoteField ? asanaTasks[i].custom_fields[j].text_value : null;
                        }

                        const membershipsSection = asanaTasks[i].memberships;
                        // Find if the array contains an object by comparing the property value
                        if (membershipsSection.some((obj) => obj.section.gid === '1200076563390738')) {
                            task.Done = true;
                        } else {
                            task.Done = false;
                        }

                        if (membershipsSection.some((obj) => obj.section.gid === '1200076563390739')) {
                            task.Revision = true;
                        } else {
                            task.Revision = false;
                        }

                        if (membershipsSection.some((obj) => obj.project.gid === asanaSettings.asanaProjectGid)) {
                            task.AsanaTeamProjectGid = asanaSettings.asanaProjectGid;
                        }

                        let assigneeUser;
                        if (asanaTasks[i].assignee) {
                            assigneeUser = await users.getByEmail(asanaTasks[i].assignee.email);

                            if (assigneeUser) {
                                task.AssigneeId = assigneeUser.Id;
                            } else {
                                task.AssigneeId = null;
                            }
                        } else {
                            task.AssigneeId = null;
                        }

                        const checkIfAsanaTaskAlreadyExists = await tasks.getByAsanaGid(asanaTasks[i].gid);
                        let taskId = task.Id;
                        // Do not create a new task record if the task GID already exists in DB
                        if (!checkIfAsanaTaskAlreadyExists) {
                            const newTask = await tasks.createTask(task);
                            taskId = newTask.Id;
                            newTasksArray.push(newTask);
                        } else {
                            newTasksArray.push(task);
                        }

                        // Map attachments to deliverables
                        const taskAttachments = asanaTasks[i].attachments;
                        for (let k = 0; k < taskAttachments.length; k++) {
                            if (taskAttachments[k].host === 'gdrive') {
                                deliverable = await deliverables.getByAsanaGid(taskAttachments[k].gid);
                                if (deliverable == null) deliverable = {};

                                deliverable.Task = task;
                                deliverable.Project = project.dataValues;
                                deliverable.TaskId = taskId;
                                deliverable.ProjectId = project.Id;
                                deliverable.AsanaGid = taskAttachments[k].gid;
                                deliverable.Name = taskAttachments[k].name;
                                deliverable.Host = taskAttachments[k].host;
                                deliverable.PermanentUrl = taskAttachments[k].permanent_url;
                                deliverable.ViewUrl = taskAttachments[k].view_url;

                                if (task.AsanaDeliverableTypeId) {
                                    deliverable.DeliverableTypeId = asanaDeliverableType.DeliverableTypeId;
                                }

                                if (deliverable.CreatedBy) {
                                    if (deliverable.CreatedBy.Email !== taskAttachments[k].created_by.email) {
                                        const attachmentUser = await users.getByEmail(taskAttachments[k].created_by.email);
                                        deliverable.CreatedById = attachmentUser.Id;
                                    }
                                }

                                newDeliverablesArray.push(deliverable);
                                await deliverables.createDeliverable(deliverable);
                            }
                        }
                    }
                }
                newTasks = newTasksArray;
                newDeliverables = newDeliverablesArray;

                // Replace tasks and deliverables with current
                project.Task = newTasks;
                project.Deliverable = newDeliverables;
                await project.save();

                return response.json(api.success(newTasks));
            } catch (e) {
                errorList.AsanaResponse = `Sync failed: ${e}`;
                return response.json(api.error(errorList, e.statusCode));
            }
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/complete', async (request, response, next) => {
        try {
            const task = await tasks.getByIdWithProjectAndMainContact(request.params.id);

            const { CustomerId, MainContact } = task.Project;

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(CustomerId);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const userInfo = await userResolver.userInfo();

            // Execute Asana API requests
            const taskCompletedResponse = await asana.markTaskCompleted(task.AsanaGid);
            if (taskCompletedResponse.error) {
                return response.status(taskCompletedResponse.statusCode).json(api.error(
                    taskCompletedResponse.message, taskCompletedResponse.statusCode,
                ));
            }

            const subtaskResponse = await asana.addSubtask(
                task.AsanaGid, `Task ${task.Name} completed by ${userInfo}`, MainContact.Email,
            );
            if (subtaskResponse.error) {
                return response.status(subtaskResponse.statusCode).json(api.error(
                    subtaskResponse.message, subtaskResponse.statusCode,
                ));
            }

            task.Completed = true;
            await task.save();

            // Create notification
            const notificationAppValues = {
                // NOTE: CreatedAt is automatically set on createNotificationApp function
                TaskId: task.Id,
                Title: `${task.Name} has been completed`,
                Description: '',
                TenantId: await userResolver.getTenantId(),
                UserId: await userResolver.getUserId(),
                NotificationAppTypeId: 3, // EQUAL TO Task
            };
            await notificationApps.createNotificationApp(notificationAppValues);

            return response.json(api.success(task, 'Task marked as complete'));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/approve', async (request, response, next) => {
        try {
            const asanaSettings = await tenantSettings.getAllAsanaSettings();
            const task = await tasks.getByIdWithProjectAndMainContact(request.params.id);

            const { CustomerId, MainContact } = task.Project;

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(CustomerId);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const userInfo = await userResolver.userInfo();

            // Execute Asana API requests
            const approvedTaskResponse = await asana.approveTask(task.AsanaGid, asanaSettings.NeedsApprovalField);
            if (approvedTaskResponse.error) {
                return response.status(approvedTaskResponse.statusCode).json(api.error(
                    approvedTaskResponse.message, approvedTaskResponse.statusCode,
                ));
            }

            const subtaskResponse = await asana.addSubtask(
                task.AsanaGid, `Task ${task.Name} approved by ${userInfo}`, MainContact.Email,
            );
            if (subtaskResponse.error) {
                return response.status(subtaskResponse.statusCode).json(api.error(
                    subtaskResponse.message, subtaskResponse.statusCode,
                ));
            }

            task.NeedsApproval = false;
            task.Completed = true;
            await task.save();

            // Create notification
            const notificationAppValues = {
                // NOTE: CreatedAt is automatically set on createNotificationApp function
                TaskId: task.Id,
                Title: `${task.Name} has been approved`,
                Description: '',
                TenantId: await userResolver.getTenantId(),
                UserId: await userResolver.getUserId(),
                NotificationAppTypeId: 3, // EQUAL TO Task
            };
            await notificationApps.createNotificationApp(notificationAppValues);

            return response.json(api.success(task, 'Task approved'));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/assistance', async (request, response, next) => {
        try {
            const task = await tasks.getByIdWithProjectAndMainContact(request.params.id);
            task.AssistanceRequestedAt = new Date();
            await task.save();

            const { CustomerId, MainContact } = task.Project;

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(CustomerId);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const userId = await userResolver.getUserId();
            const user = await users.getById(userId);
            const userInfo = await userResolver.userInfo();

            // Execute Asana API request
            const subtaskResponse = await asana.addSubtask(
                task.AsanaGid, `${userInfo} needs assistance`, MainContact.Email,
            );
            if (subtaskResponse.error) {
                return response.status(subtaskResponse.statusCode).json(api.error(
                    subtaskResponse.message, subtaskResponse.statusCode,
                ));
            }

            // Send email
            const fromShortname = `${user.FirstName} via Victorious App`;
            await mail.sendMail(
                fromShortname, MainContact.Email,
                `${userInfo} needs assistance with the task: ${task.Name}`,
                `${userInfo} needs assistance`,
            );

            return response.json(api.success(task, 'Requested assistance'));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/feedback', async (request, response, next) => {
        try {
            const asanaSettings = await tenantSettings.getAllAsanaSettings();
            const task = await tasks.getByIdWithProjectAndMainContact(request.params.id);

            const { CustomerId, MainContact } = task.Project;

            const isAuthorized = await userResolver.isVictoriousAndProjectCustomer(CustomerId);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const sections = await tenantSettings.getAllAsanaTeamProjectSections();
            let revisionId;
            sections.forEach((section) => {
                if (section.Val1 === task.AsanaTeamProjectGid
                    && section.Name === 'ASANA_TEAM_PROJECT_SECTION_REVISION') { // TenantSettings.AsanaTeamProjectSectionRevision
                    revisionId = section.Val2;
                }
            });

            const userInfo = await userResolver.userInfo();

            // Execute Asana API requests
            const sentFeedbackResponse = await asana.taskFeedbackSent(task.AsanaGid, asanaSettings.NeedsApprovalField);
            if (sentFeedbackResponse.error) {
                return response.status(sentFeedbackResponse.statusCode).json(api.error(
                    sentFeedbackResponse.message, sentFeedbackResponse.statusCode,
                ));
            }

            const taskMovedResponse = await asana.moveTaskToSection(revisionId, task.AsanaGid);
            if (taskMovedResponse.error) {
                return response.status(taskMovedResponse.statusCode).json(api.error(
                    taskMovedResponse.message, taskMovedResponse.statusCode,
                ));
            }

            const subtaskResponse = await asana.addSubtask(
                task.AsanaGid, `[Revisions] ${task.Name} by ${userInfo}`, MainContact.Email,
            );
            if (subtaskResponse.error) {
                return response.status(subtaskResponse.statusCode).json(api.error(
                    subtaskResponse.message, subtaskResponse.statusCode,
                ));
            }

            task.NeedsApproval = false;
            task.Revision = true;
            await task.save();

            return response.json(api.success(task, 'Task sent for revision'));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/asanaProjects/:asanaProjectGid', async (request, response, next) => {
        try {
            const allTasks = await tasks.getAllByAsanaProjectIdOfProject(request.params.asanaProjectGid);

            return response.json(api.success(allTasks));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const task = await tasks.getById(request.params.id);
            if (!task) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(task));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const asanaDeliverableType = await asanaDeliverableTypes.getById(request.body.AsanaDeliverableTypeId);
            const project = await projects.getById(request.body.ProjectId);
            const user = await users.getById(request.body.AssigneeId);

            if (!asanaDeliverableType) {
                errorList.AsanaDeliverableTypeId = helpers.addErrorMessages('AsanaDeliverableTypeId');
            }
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }
            if (!user) {
                errorList.AssigneeId = helpers.addErrorMessages('UserId');
            }

            const newTask = await tasks.createTask(request.body);

            return response.status(201).json(api.success(newTask));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });
            }

            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    // UPDATE
    router.post('/:id/update', async (request, response, next) => {
        const errorList = {};

        try {
            const task = await tasks.getById(request.params.id);
            if (!task) {
                return response.status(404).json(api.error('', 404));
            }

            const asanaDeliverableType = await asanaDeliverableTypes.getById(request.body.AsanaDeliverableTypeId);
            const project = await projects.getById(request.body.ProjectId);
            const user = await users.getById(request.body.UserId);

            if (request.body.AsanaDeliverableTypeId && !asanaDeliverableType) {
                errorList.AsanaDeliverableTypeId = helpers.addErrorMessages('AsanaDeliverableTypeId');
            }
            if (request.body.ProjectId && !project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }
            if (request.body.UserId && !user) {
                errorList.AssigneeId = helpers.addErrorMessages('UserId');
            }

            const updatedTask = await tasks.updateTask(request.params.id, request.body);

            return response.json(api.success(updatedTask));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });
            }

            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    // DELETE
    router.post('/:id/delete', async (request, response, next) => {
        try {
            const task = await tasks.getById(request.params.id);
            if (!task) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteTask = await tasks.deleteTask(request.params.id);

            return response.json(api.success(deleteTask));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
