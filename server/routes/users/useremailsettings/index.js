/* eslint-disable max-len */
const express = require('express');
const { ValidationError } = require('sequelize');
const Helpers = require('../../../lib/Helpers');
const ApiResponse = require('../../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { userEmailSettings, userEmailSettingsTypes, users } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();

    // UPDATE
    router.post('/:id/update', async (request, response, next) => {
        const errorList = {};

        try {
            const userEmailSetting = await userEmailSettings.getById(request.params.id);
            if (!userEmailSetting) {
                return response.status(404).json(api.error('', 404));
            }

            const userEmailSettingsType = await userEmailSettingsTypes.getById(request.body.UserEmailSettingsTypeId);
            const user = await users.getById(request.body.UserId);

            if (request.body.UserEmailSettingsTypeId && !userEmailSettingsType) {
                errorList.UserEmailSettingsTypeId = helpers.addErrorMessages('UserEmailSettingsTypeId');
            }
            if (request.body.UserId && !user) {
                errorList.UserId = helpers.addErrorMessages('UserId');
            }

            const updatedUserEmailSettings = await userEmailSettings.updateUserEmailSettings(
                request.params.id, request.body,
            );

            return response.json(api.success(updatedUserEmailSettings));
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

    return router;
};
