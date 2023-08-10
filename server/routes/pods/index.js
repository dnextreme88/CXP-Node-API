/* eslint-disable no-await-in-loop */
/* eslint-disable no-else-return */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const UserResolverService = require('../../lib/UserResolverService');

const router = express.Router();
let podObj = {};
let successMessage = '';

module.exports = (params) => {
    const {
        pods, podProjects, podUsers, projects, users, customers,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const userResolver = new UserResolverService();

    router.get('/getAll', async (request, response, next) => {
        try {
            const tenantId = await userResolver.getTenantId();
            const allPods = await pods.getAllByTenantId(tenantId);
            const podProjectUserArray = [];
            let podProject = {};
            let podUser = {};

            if (!tenantId) {
                return response.json(api.success(allPods));
            }

            for (let i = 0; i < allPods.length; i++) {
                const lstProjectId = await podProjects.getAllByPodId(allPods[i].Id);

                // Check if they have a Project
                if (lstProjectId.length > 0) {
                    const lstProject = await projects.getByIdList(lstProjectId[0].ProjectId);

                    podProject = { ...allPods[i].dataValues, Project: lstProject };
                } else {
                    podProject = { ...allPods[i].dataValues, Project: null };
                }

                const lstUserId = await podUsers.getAllByPodId(allPods[i].Id);

                // Check if they have a User
                if (lstUserId.length > 0) {
                    const lstUser = await users.getByIdList(lstUserId[0].UserId);

                    podUser = { ...podProject, User: lstUser };
                } else {
                    podUser = { ...podProject, User: null };
                }

                // Push to array before assigning it to the object
                podProjectUserArray.push(podUser);
            }
            podObj = podProjectUserArray;

            return response.json(api.success(podObj));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/user', async (request, response, next) => {
        try {
            const user = await users.getByIdWithRolesandPods(request.body.UserId);
            if (!user) {
                const userNotFound = helpers.addErrorMessages('UserId');
                return response.status(404).json(api.error(userNotFound, 404));
            }

            const podUser = user.PodUser;

            if (request.body.Remove === true) {
                if (!podUser) {
                    return response.status(404).json(api.error('User has no pod user', 404));
                }

                await podUsers.deletePodUser(podUser.Id);

                podObj = { ...user.dataValues, PodUser: null };

                return response.json(api.success(podObj, 'Pod user deleted'));
            } else {
                const pod = await pods.getById(request.body.PodId);
                if (!pod) {
                    const podNotFound = helpers.addErrorMessages('PodId');
                    return response.status(404).json(api.error(podNotFound, 404));
                }

                if (podUser) {
                    const updatedPodUser = await podUsers.updatePodUser(podUser.Id, request.body);

                    podObj = { ...updatedPodUser, Pod: pod };
                    successMessage = 'Pod user updated';
                } else if (!request.body.Remove) {
                    const newPodUser = await podUsers.createPodUser(request.body);

                    podObj = { ...newPodUser.dataValues, Pod: pod };
                    successMessage = 'Pod user created';
                }
            }
            const userWithPodUser = { ...user.dataValues, PodUser: podObj };

            return response.json(api.success(userWithPodUser, successMessage));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/project', async (request, response, next) => {
        try {
            const project = await projects.getByIdWithPods(request.body.ProjectId);
            if (!project) {
                const projectNotFound = helpers.addErrorMessages('ProjectId');
                return response.status(404).json(api.error(projectNotFound, 404));
            }
            // TODO: Might have to be defined on its respective Service file as part of the
            // 'include' key instead of manually appending them to the object
            const user = await users.getById(project.MainContactId);
            const customer = await customers.getById(project.CustomerId);

            const podProject = project.PodProject;

            if (request.body.Remove === true) {
                if (!podProject) {
                    return response.status(404).json(api.error('Project has no pod project', 404));
                }

                await podProjects.deletePodProject(podProject.Id);

                podObj = { ...project.dataValues, PodProject: null };

                return response.json(api.success(podObj, 'Pod project deleted'));
            } else {
                const pod = await pods.getById(request.body.PodId);
                if (!pod) {
                    const podNotFound = helpers.addErrorMessages('PodId');
                    return response.status(404).json(api.error(podNotFound, 404));
                }

                if (podProject) {
                    const updatedPodProject = await podProjects.updatePodProject(
                        podProject.Id, request.body,
                    );

                    podObj = { ...updatedPodProject, Pod: pod };
                    successMessage = 'Pod project updated';
                } else if (!request.body.Remove) {
                    const newPodProject = await podProjects.createPodProject(request.body);

                    podObj = { ...newPodProject.dataValues, Pod: pod };
                    successMessage = 'Pod project created';
                }
            }
            const projectWithPodProject = {
                ...project.dataValues,
                Customer: customer,
                MainContact: user,
                PodProject: podObj,
            };

            return response.json(api.success(projectWithPodProject, successMessage));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/create', async (request, response, next) => {
        const errorList = {};

        try {
            const tenantId = await userResolver.getTenantId();
            if (!tenantId) {
                errorList.TenantId = helpers.addErrorMessages('TenantId');
            }

            const newPod = await pods.createPod(request.body);

            return response.status(201).json(api.success(newPod));
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

    router.put('/update', async (request, response, next) => {
        try {
            const pod = await pods.getById(request.body.Id);
            if (!pod) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedPod = await pods.updatePod(request.body.Id, request.body);

            return response.json(api.success(updatedPod));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        let projectOfPod;
        let userOfPod;

        try {
            const pod = await pods.getById(request.params.id);
            if (!pod) {
                return response.status(404).json(api.error('', 404));
            }

            const podProject = await podProjects.getAllByPodId(request.params.id);
            if (!podProject[0]) {
                projectOfPod = null;
            } else {
                const lstProject = await projects.getByIdList(podProject[0].ProjectId);
                projectOfPod = lstProject;
            }

            const podUser = await podUsers.getAllByPodId(request.params.id);
            if (!podUser[0]) {
                userOfPod = null;
            } else {
                const lstUser = await users.getByIdList(podUser[0].UserId);
                userOfPod = lstUser;
            }

            const podProjectUser = {
                ...pod.dataValues,
                Project: projectOfPod,
                User: userOfPod,
            };

            return response.json(api.success(podProjectUser));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id', async (request, response, next) => {
        try {
            const pod = await pods.getById(request.params.id);
            if (!pod) {
                return response.status(404).json(api.error('', 404));
            }

            const deletePod = await pods.deletePod(request.params.id);

            return response.json(api.success(deletePod));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
