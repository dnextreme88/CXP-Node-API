const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { podProjects, pods, projects } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/pods/:podId', async (request, response, next) => {
        try {
            const allPodProjects = await podProjects.getAllByPodId(request.params.podId);

            return response.json(api.success(allPodProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/projects/:projectId', async (request, response, next) => {
        try {
            const allPodProjects = await podProjects.getAllByProjectId(request.params.projectId);
            if (allPodProjects.length < 1) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(allPodProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const podProject = await podProjects.getById(request.params.id);
            if (!podProject) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(podProject));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const pod = await pods.getById(request.body.PodId);
            const project = await projects.getById(request.body.ProjectId);

            if (!pod) {
                errorList.PodId = helpers.addErrorMessages('PodId');
            }
            if (!project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const newPodProject = await podProjects.createPodProject(request.body);

            return response.status(201).json(api.success(newPodProject));
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
            const podProject = await podProjects.getById(request.params.id);
            if (!podProject) {
                return response.status(404).json(api.error('', 404));
            }

            const pod = await pods.getById(request.body.PodId);
            const project = await projects.getById(request.body.ProjectId);

            if (request.body.PodId && !pod) {
                errorList.PodId = helpers.addErrorMessages('PodId');
            }
            if (request.body.ProjectId && !project) {
                errorList.ProjectId = helpers.addErrorMessages('ProjectId');
            }

            const updatedPodProject = await podProjects.updatePodProject(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedPodProject));
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
            const podProject = await podProjects.getById(request.params.id);
            if (!podProject) {
                return response.status(404).json(api.error('', 404));
            }

            const deletePodProject = await podProjects.deletePodProject(request.params.id);

            return response.json(api.success(deletePodProject));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
