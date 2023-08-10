/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-else-return */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const UserResolverService = require('../../lib/UserResolverService');
const ConstantsService = require('../../lib/ConstantsService');
const MailService = require('../../lib/MailService');

const router = express.Router();

module.exports = (params) => {
    const {
        comments, commentTypes, goals, projects, notificationApps, users, templates,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const userResolver = new UserResolverService();
    const constants = new ConstantsService();
    const mail = new MailService();

    router.post('/', async (request, response, next) => {
        try {
            // Validate Goal and CommentType
            // CommentTypeId: 1 = Home
            if (request.body.CommentTypeId === 1 && request.body.GoalId) {
                return response.status(500).json(api.error('Goal id must be null for this comment type'));
            } else if (request.body.CommentTypeId !== 1) {
                if (!request.body.GoalId) {
                    return response.status(400).json(api.error('Goal id is invalid', 400));
                }

                const goal = await goals.getById(request.body.GoalId);
                const commentType = await commentTypes.getById(request.body.CommentTypeId);
                if (commentType.GoalTypeId !== goal.GoalTypeId) {
                    return response.status(400).json(api.error('Invalid comment type for goal', 400));
                }
            }

            const currentComment = await comments.getActiveByCommentTypeIdAndProjectId(
                request.body.CommentTypeId, request.body.ProjectId,
            );
            if (currentComment) await comments.deleteComment(currentComment.Id);

            const newComment = await comments.createComment(request.body);

            // Create notification
            const notificationAppValues = {
                TenantId: await userResolver.getTenantId(),
                CommentId: newComment.Id,
                CreatedById: await userResolver.getUserId(),
                NotificationAppTypeId: 1, // EQUAL TO Comment
                Title: request.body.Title,
                Description: request.body.Description,
            };
            await notificationApps.createNotificationApp(notificationAppValues);

            const project = await projects.getById(request.body.ProjectId);
            // NOTE: No need to check for null CustomerId, also an updated query for this function
            // is now being used by allUsersWithTeamUpdate
            // const allUsers = await users.getAllByCustomerIdWithUserEmailSettings(project.CustomerId);

            const template = await templates.getByTemplateTypeId(9); // TemplateTypeId: 9 = Team update
            const templateBody = template.Template;
            const body = templateBody
                .replaceAll(await constants.getBaseUrlPlaceholder(), await constants.getWebBaseUrl())
                .replaceAll(await constants.getLandingPage(), await comments.getLandingUrlByCommentTypeId(request.body.CommentTypeId))
                .replaceAll(await constants.getProjectIdPlaceholder(), String(project.Id));

            // Send email
            let hasPrimaryContact;
            if (project.MainContactId !== null) {
                hasPrimaryContact = true;
            } else if (project.MainContactId === null) {
                hasPrimaryContact = false;
            }
            const primaryContact = hasPrimaryContact ? project.MainContactId.FirstName : 'Admin';

            const allUsersWithTeamUpdate = await users.getAllByTeamUpdate(project.CustomerId);

            for (let j = 0; j < allUsersWithTeamUpdate; j++) {
                const userSpecificBody = body.replaceAll(await constants.getUserEmailPlaceholder(), allUsersWithTeamUpdate[j].Email);
                const emailBody = userSpecificBody.replaceAll(
                    constants.getUserNamePlaceholder(), allUsersWithTeamUpdate[j].FirstName,
                );

                await mail.sendMail(
                    primaryContact, allUsersWithTeamUpdate[j].Email, emailBody, 'New Comment from Victorious',
                );
            }

            return response.status(201).json(api.success(newComment));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/', async (request, response, next) => {
        const errorList = {};

        try {
            const { commentTypeId, projectId } = request.query;
            const commentType = await commentTypes.getById(commentTypeId);
            if (!commentType) {
                errorList.CommentTypeId = helpers.addErrorMessages('CommentTypeId');
            }

            const project = await projects.getById(projectId);
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            if (Object.keys(errorList).length > 0) {
                return response.status(404).json(api.error(errorList, 404));
            }

            const comment = await comments.getActiveByCommentTypeIdAndProjectId(
                commentTypeId, projectId,
            );
            if (!comment) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(comment));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/home', async (request, response, next) => {
        const errorList = {};

        try {
            const { projectId } = request.query;
            const project = await projects.getById(projectId);
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const isAuthorized = await userResolver.isVictoriousAndProjectOwner(projectId);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            // CommentTypeId: 1 = Home
            const comment = await comments.getActiveByCommentTypeIdAndProjectId(1, projectId);

            return response.json(api.success(comment));
        } catch (event) {
            response.status(500).json({
                errors: errorList,
                statusCode: 500,
            });

            return next(event);
        }
    });

    router.get('/goals', async (request, response, next) => {
        try {
            const { goalIds } = request.query;
            const goalsObj = goalIds.split(',');

            const comment = await comments.getAllLatestCommentsForGoals(goalsObj);

            return response.json(api.success(comment));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id', async (request, response, next) => {
        const errorList = {};

        try {
            const comment = await comments.getById(request.params.id);
            if (!comment) {
                return response.status(404).json(api.error('', 404));
            }

            const commentType = await commentTypes.getById(request.body.CommentTypeId);
            const goal = await goals.getById(request.body.GoalId);
            const project = await projects.getById(request.body.ProjectId);

            if (request.body.CommentTypeId && !commentType) {
                errorList.CommentTypeId = helpers.addErrorMessages('CommentTypeId');
            }
            if (request.body.GoalId && !goal) {
                errorList.GoalId = helpers.addErrorMessages('GoalId');
            }
            if (request.body.ProjectId && !project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const updatedComment = await comments.updateComment(request.params.id, request.body);

            // Create notification
            const notificationAppValues = {
                // NOTE: CreatedAt is automatically set on createNotificationApp function
                TenantId: await userResolver.getTenantId(),
                CommentId: updatedComment.Id,
                CreatedById: await userResolver.getUserId(),
                NotificationAppTypeId: 1, // EQUAL TO Comment
                Title: request.body.Title,
                Description: request.body.Description,
            };
            await notificationApps.createNotificationApp(notificationAppValues);

            return response.json(api.success(updatedComment));
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

    router.delete('/:id', async (request, response, next) => {
        try {
            const comment = await comments.getById(request.params.id);
            if (!comment) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteComment = await comments.delete(request.params.id);

            return response.json(api.success(deleteComment));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/goals/:goalId', async (request, response, next) => {
        try {
            const goal = await goals.getById(request.params.goalId);
            if (!goal) {
                return response.status(404).json(api.error('', 404));
            }

            const allComments = await comments.getAllByGoalId(request.params.goalId);

            return response.json(api.success(allComments));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/commentTypes/projects/:projectId', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const allCommentTypes = await comments.getAllCommentTypesByProjectId(
                request.params.projectId,
            );

            return response.json(api.success(allCommentTypes));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/commentsCount/projects/:projectId', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.projectId);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const commentsNeededCount = await comments.getAllCommentsNeededCountForProject(
                request.params.projectId,
            );

            return response.json(api.success(commentsNeededCount));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const comment = await comments.getById(request.params.id);
            if (!comment) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(comment));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
