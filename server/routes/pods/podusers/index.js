const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { podUsers, pods, users } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/pods/:podId', async (request, response, next) => {
        try {
            const allPodUsers = await podUsers.getAllByPodId(request.params.podId);
            if (allPodUsers.count < 1) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(allPodUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/users/:userId', async (request, response, next) => {
        try {
            const allPodUsers = await podUsers.getAllByUserId(request.params.userId);
            if (allPodUsers.length < 1) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(allPodUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const podUser = await podUsers.getById(request.params.id);
            if (!podUser) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(podUser));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const pod = await pods.getById(request.body.PodId);
            const user = await users.getById(request.body.UserId);

            if (!pod) {
                errorList.PodId = helpers.addErrorMessages('PodId');
            }
            if (!user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const newPodUser = await podUsers.createPodUser(request.body);

            return response.status(201).json(api.success(newPodUser));
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
            const podUser = await podUsers.getById(request.params.id);
            if (!podUser) {
                return response.status(404).json(api.error('', 404));
            }

            const pod = await pods.getById(request.body.PodId);
            const user = await users.getById(request.body.UserId);

            if (request.body.PodId && !pod) {
                errorList.PodId = helpers.addErrorMessages('PodId');
            }
            if (request.body.UserId && !user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const updatedPodUser = await podUsers.updatePodUser(request.params.id, request.body);

            return response.json(api.success(updatedPodUser));
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
            const podUser = await podUsers.getById(request.params.id);
            if (!podUser) {
                return response.status(404).json(api.error('', 404));
            }

            const deletePodUser = await podUsers.deletePodUser(request.params.id);

            return response.json(api.success(deletePodUser));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
