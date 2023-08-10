const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { userPics, users } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    router.get('/users/:userId', async (request, response, next) => {
        try {
            const user = await users.getById(request.params.userId);
            if (!user) {
                const userNotFound = helpers.addErrorMessages('UserId');
                return response.status(404).json(api.error(userNotFound, 404));
            }

            const allUserPics = await userPics.getAllByUserId(request.params.userId);

            return response.json(api.success(allUserPics));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/users/:userId/pictureCount', async (request, response, next) => {
        try {
            const user = await users.getById(request.params.userId);
            if (!user) {
                const userNotFound = helpers.addErrorMessages('UserId');
                return response.status(404).json(api.error(userNotFound, 404));
            }

            const allUserPicsCount = await userPics.getAllPictureCountByUserId(
                request.params.userId,
            );

            return response.json(api.success(allUserPicsCount));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const userPic = await userPics.getById(request.params.id);
            if (!userPic) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(userPic));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/cxpPhoto', async (request, response, next) => {
        try {
            const userPic = await userPics.getCxpPhotoById(request.params.id);
            if (!userPic) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(userPic));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const user = await users.getById(request.body.UserId);
            if (!user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const newUserPic = await userPics.createUserPic(request.body);

            return response.status(201).json(api.success(newUserPic));
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
            const userPic = await userPics.getById(request.params.id);
            if (!userPic) {
                return response.status(404).json(api.error('', 404));
            }

            const user = await users.getById(request.body.UserId);
            if (request.body.UserId && !user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const updatedUserPic = await userPics.updateUserPic(request.params.id, request.body);

            return response.json(api.success(updatedUserPic));
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
            const userPic = await userPics.getById(request.params.id);
            if (!userPic) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteUserPic = await userPics.deleteUserPic(request.params.id);

            return response.json(api.success(deleteUserPic));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
