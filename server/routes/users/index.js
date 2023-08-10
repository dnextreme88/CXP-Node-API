/* eslint-disable max-len */
require('dotenv').config(); // .env
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const { ValidationError } = require('sequelize');
const db = require('../../models');
const AmazonS3Service = require('../../lib/AmazonS3Service');
const AsanaService = require('../../lib/AsanaService');
const MailService = require('../../lib/MailService');
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const ConstantsService = require('../../lib/ConstantsService');
const UserResolverService = require('../../lib/UserResolverService');

const storageConfig = multer.diskStorage({
    destination: async (req, file, cb) => {
        const directory = 'temp/';
        if (!fs.existsSync(directory)) fs.mkdirSync(directory);

        cb(null, directory);
    },
    filename: async (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();
const asanaAccessToken = process.env.ASANA_PERSONAL_ACCESS_TOKEN;

module.exports = (params) => {
    const {
        users, customers, dsTypes, userTypes, notifications, tenantSettings, templates, podUsers, userPics,
        userEmailSettingsTypes, userEmailSettings, projects, roles,
    } = params;
    const amazonS3 = new AmazonS3Service();
    const asana = new AsanaService(asanaAccessToken);
    const mail = new MailService();
    const helpers = new Helpers();
    const api = new ApiResponse();
    const constants = new ConstantsService();
    const userResolver = new UserResolverService();

    router.get('/', async (request, response, next) => {
        try {
            const allUsers = await users.getAll();

            return response.json(api.success(allUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/victorious', async (request, response, next) => {
        try {
            const { Skip, Take } = request.query;
            let takeParam = Take;

            if (!Take) {
                takeParam = 10;
            } else if (Take > 25) {
                return response.json(api.error('Take parameter should not be more than 25'));
            }

            const paginationParams = { Skip, Take: takeParam };

            const allUsers = await users.getAllVictoriousMembers(paginationParams);

            return response.json(api.success(allUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/customer/:customerId', async (request, response, next) => {
        try {
            const { Skip, Take } = request.query;
            const paginationParams = { Skip, Take };
            const allUsers = await users.getAllByCustomerId(request.params.customerId, paginationParams);

            return response.json(api.success(allUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/inviteVictorious', async (request, response, next) => {
        try {
            const asanaTenantSettings = await tenantSettings.getAllByNamePrefix('ASANA');
            let asanaWorkSpaceVal1;
            for (let i = 0; i < asanaTenantSettings.length; i++) {
                if (asanaTenantSettings[i].Name === 'ASANA_WORKSPACE_GID') {
                    asanaWorkSpaceVal1 = asanaTenantSettings[i].Val1;

                    if (asanaWorkSpaceVal1 === null) {
                        return response.status(404).json(api.error('Asana workspace GID not found', 404));
                    }
                }
            }

            const asanaUsersResponse = await asana.getUsersByEmail(request.body.Email, asanaWorkSpaceVal1);
            if (asanaUsersResponse.error) {
                return response.status(asanaUsersResponse.statusCode).json(api.error(
                    asanaUsersResponse.message, asanaUsersResponse.statusCode,
                ));
            }

            let asanaUserData;
            for (let j = 0; j < asanaUsersResponse.length; j++) {
                if (asanaUsersResponse[j].email.toLowerCase() === request.body.Email.toLowerCase()) {
                    asanaUserData = asanaUsersResponse[j];
                } else {
                    return response.status(404).json(api.error('Asana user not found', 404));
                }
            }

            // Map and assign to new object
            const asanaUserObj = request.body;
            asanaUserObj.Title = asanaUserData.role ? asanaUserData.role : null;
            asanaUserObj.FunFacts = asanaUserData.aboutMe ? asanaUserData.aboutMe : null;

            // Create user
            const newPendingUser = await users.createPendingUserWithRole(asanaUserObj, 1);
            if (newPendingUser.error === true) {
                return response.status(400).json(api.error('Specified email already exists', 400));
            }

            if (request.body.PodId) {
                const podUserValues = { PodId: request.body.PodId, UserId: newPendingUser.Id };
                await podUsers.createPodUser(podUserValues);
            }

            // Add photo
            const userPicValues = {
                IsNotifPic: true,
                Location: asanaUserData.photo.image_1024x1024
                    ? asanaUserData.photo.image_1024x1024 : asanaUserData.photo.image_128x128,
                UserId: newPendingUser.Id,
            };
            await userPics.createUserPic(userPicValues);

            // Send email
            // TemplateTypeId: 2 = Registration
            const sendEmail = await users.createNotificationSendEmail(newPendingUser, 2, false);
            if (sendEmail.error === true) {
                return response.status(404).json(api.error('Template with template type id 2 not found', 404));
            }

            const victoriousMember = {
                ...newPendingUser.dataValues,
                NotificationId: sendEmail.Id,
                NotificationGuid: sendEmail.NotificationGuid,
            };

            return response.status(201).json(api.success(victoriousMember, 'Victorious member successfully invited'));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/inviteCustomer', async (request, response, next) => {
        try {
            // Create user
            const newCustomerUser = await users.createPendingUserWithRole(request.body, 2);
            if (newCustomerUser.error === true) {
                return response.status(500).json(api.error('Specified email already exists'));
            }

            const userEmailSettingsArray = [];
            const allUserEmailSettingTypes = await userEmailSettingsTypes.getAll();
            allUserEmailSettingTypes.forEach((userEmailSettingsType) => {
                const userEmailSetting = {
                    Value: true,
                    UserId: newCustomerUser.Id,
                    UserEmailSettingsTypeId: userEmailSettingsType.Id,
                };

                userEmailSettingsArray.push(userEmailSetting);
            });

            newCustomerUser.UserEmailSettings = userEmailSettingsArray;
            await newCustomerUser.save();

            // Send email
            // TemplateTypeId: 4 = Registration Customer
            const sendEmail = await users.createNotificationSendEmail(newCustomerUser, 4, false);
            if (sendEmail.error === true) {
                return response.status(404).json(api.error('Template with template type id 4 not found', 404));
            }

            const customerMember = {
                ...newCustomerUser.dataValues,
                NotificationId: sendEmail.Id,
                NotificationGuid: sendEmail.NotificationGuid,
            };

            return response.status(201).json(api.success(customerMember, 'Customer successfully invited'));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/:id/resendInvitation', async (request, response, next) => {
        try {
            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            // UserTypeId: 1 = Victorious
            // TemplateTypeId: 2 = Registration
            // TemplateTypeId: 4 = Registration Customer
            const templateTypeId = user.UserTypeId === 1 ? 2 : 4;

            const notification = await notifications.getByTemplateTypeIdAndUserId(templateTypeId, user.Id);
            if (!notification || user.DsTypeId !== 3) { // NOT EQUAL TO Pending
                return response.status(500).json(api.error('User does not have a pending invite'));
            }

            const template = await templates.getByTemplateTypeId(templateTypeId);
            if (!template) {
                const templateTypeNotFound = `Template with template type id ${templateTypeId} not found`;
                return response.status(404).json(api.error(templateTypeNotFound, 404));
            }

            const notificationDate = notification.ValidTill.getDate(); // between 1 - 31
            const validDaysDiff = new Date().getDate() - notificationDate;
            const notificationValidDaysFromCurrent = validDaysDiff + 7;
            const notificationAddDays = new Date().setDate(notificationDate + notificationValidDaysFromCurrent);
            notification.ValidTill = new Date(notificationAddDays).toISOString();
            await notification.save(); // Update notification

            const templateBody = template.Template;
            // NOTE: There is a {userName} placeholder defined in the .cs files so I thought I'd use it
            // DRY principle with UserService/createNotificationSendEmail
            const body = templateBody
                .replaceAll(await constants.getBaseUrlPlaceholder(), await constants.getWebBaseUrl())
                .replaceAll(await constants.getNotificationGuidPlaceholder(), String(notification.NotificationGuid))
                .replaceAll(await constants.getUserNamePlaceholder(), user.FirstName)
                .replaceAll(await constants.getUserEmailPlaceholder(), user.Email);

            // Send email
            const fromShortname = 'Victorious App';
            await mail.sendMail(fromShortname, user.Email, body, template.Name);

            return response.json(api.success(null, 'Invitation resent successfully'));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/getUserByNotificationGuid', async (request, response, next) => {
        try {
            const { guid } = request.query;
            const notification = await notifications.getByNotificationGuid(guid);
            if (!notification) {
                return response.status(404).json(api.error('Notification not found by notification guid', 404));
            }

            const user = notification.User;
            if (!user) {
                return response.status(404).json(api.error('Notification expired or not found', 404));
            }

            return response.json(api.success(user));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/setupPassword', async (request, response, next) => {
        try {
            const notification = await notifications.getByNotificationGuid(request.body.NotificationGuid);
            if (!notification) {
                return response.status(404).json(api.error('Notification not found by notification guid', 404));
            }

            const hashedPassword = await users.hashPassword(request.body.Password);
            const user = notification.User;
            user.PasswordHash = hashedPassword;
            user.DsTypeId = 1; // EQUAL TO Active
            await user.save();

            // Invalidate notification
            notification.ValidTill = new Date();
            await notification.save();

            const userData = {
                Email: user.Email,
                Password: request.body.Password,
                KeepLoggedIn: request.body.KeepLoggedIn,
            };

            return response.json(api.success(userData));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/changePassword', async (request, response, next) => {
        try {
            const user = await users.getById(request.body.UserId);
            // Add additional check if user password is null or unset
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }
            if (!user.PasswordHash) {
                return response.status(404).json(api.error('Password is currently unset for this user', 404));
            }

            const isPasswordOk = await users.isValidPassword(user.Id, request.body.CurrentPassword);

            if (!isPasswordOk) {
                return response.status(500).json(api.error('Current password not valid'));
            }
            if (request.body.CurrentPassword === request.body.NewPassword) {
                return response.status(500).json(api.error('New password must be different from the previous one'));
            }

            const hashedNewPassword = await users.hashPassword(request.body.NewPassword);
            user.PasswordHash = hashedNewPassword;
            await user.save();

            return response.json(api.success(user));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/resetPassword', async (request, response, next) => {
        try {
            const user = await users.getByActiveForEmail(request.body.Email);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            // Send email
            // TemplateTypeId: 3 = Forgot Password
            const sendEmail = await users.createNotificationSendEmail(user, 3, true);
            if (sendEmail.error === true) {
                return response.status(404).json(api.error('Template with template type id 3 not found', 404));
            }

            return response.json(api.success(null, 'Password reset request sent to email'));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/:id/picture', upload.single('File'), async (request, response, next) => {
        try {
            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            const allUserPicsCount = await userPics.getAllPictureCountByUserId(request.params.id);
            if (allUserPicsCount >= 3) {
                return response.status(400).json(api.error('Max number of pictures allowed is 3', 400));
            }

            const fileKey = `${uuid()}-${request.file.filename}`;
            const userPicValues = {
                UserId: user.Id,
                IsNotifPic: false,
                Location: fileKey,
                OrderNumber: request.body.OrderNumber,
                BackColor: request.body.BackColor,
            };
            const newUserPic = await userPics.createUserPic(userPicValues);

            await amazonS3.uploadFileToS3(request.file, fileKey, await constants.getImageBucket(), 'public-read');

            return response.status(201).json(api.success(newUserPic));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/pictures', async (request, response, next) => {
        try {
            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            const allUserPics = await userPics.getAllByUserId(request.params.id);

            return response.json(api.success(allUserPics));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/pictures/:userPicId/color', async (request, response, next) => {
        try {
            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            const userPic = await userPics.getById(request.params.userPicId);
            if (!userPic) {
                return response.status(404).json(api.error('', 404));
            }

            const userPicValues = { BackColor: request.body.BackColor };
            const updatedUserPic = await userPics.updateUserPic(request.params.userPicId, userPicValues);

            return response.json(api.success(updatedUserPic));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/pictures/:userPicId', upload.single('File'), async (request, response, next) => {
        try {
            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            const userPic = await userPics.getCxpPhotoById(request.params.userPicId);
            if (!userPic) {
                return response.status(404).json(api.error('Photo not found', 404));
            }

            const oldKey = userPic.Location;
            const fileKey = `${uuid()}-${request.file.filename}`;
            const userPicValues = { Location: fileKey };

            const updatedUserPic = await userPics.updateUserPic(userPic.Id, userPicValues);

            await amazonS3.uploadFileToS3(request.file, fileKey, await constants.getImageBucket(), 'public-read');

            if (!oldKey) {
                await amazonS3.deleteFileS3(oldKey, await constants.getImageBucket());
            }

            return response.json(api.success(updatedUserPic));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id/pictures/:userPicId', async (request, response, next) => {
        try {
            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            const userPic = await userPics.getCxpPhotoById(request.params.userPicId);
            if (!userPic) {
                return response.status(404).json(api.error('Photo not found', 404));
            }

            const deleteUserPic = await userPics.deleteUserPic(userPic.Id);

            await amazonS3.deleteFileS3(userPic.Location, await constants.getImageBucket());

            return response.json(api.success(deleteUserPic));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/withoutPod', async (request, response, next) => {
        try {
            const { Skip, Take } = request.query;
            const paginationParams = { Skip, Take };

            const allUsers = await users.getAllWithoutPods(paginationParams);

            return response.json(api.success(allUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/emailSettings', async (request, response, next) => {
        try {
            const userId = await userResolver.getUserId();

            const userEmailSetting = await userEmailSettings.getByUserEmailSettingsTypeIdAndUserId(
                request.body.Type, userId,
            );

            // If there is no user email setting record for user, create a new one
            if (!userEmailSetting) {
                const newUserEmailSetting = await db.UserEmailSettings.create({
                    Id: uuid(),
                    UserEmailSettingsTypeId: request.body.Type,
                    UserId: userId,
                });

                newUserEmailSetting.Value = request.body.Value;
                await newUserEmailSetting.save();

                return response.status(201).json(api.success(newUserEmailSetting));
            }

            userEmailSetting.Value = request.body.Value;
            await userEmailSetting.save();

            return response.json(api.success(userEmailSetting));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const user = await users.getByIdWithRolesandPods(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(user));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id', async (request, response, next) => {
        const errorList = {};

        try {
            const user = await users.getByIdWithRolesandPods(request.params.id);
            if (!user) {
                return response.status(500).json(api.error('User DsTypeId should not be Not Active'));
            }

            const customerId = await userResolver.getCustomerId();
            const userId = await userResolver.getUserId();
            const isVictorious = await userResolver.isVictorious();
            const isCustomerAdmin = await userResolver.isCustomerAdmin();
            if (isVictorious === false // Not a Victorious user
                && (user.CustomerId !== customerId // Different Customer
                    || (isCustomerAdmin === false && userId !== request.params.id) // Not admin and different user
                )
            ) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            if (request.body.Email != null) {
                const checkIfEmailExists = await users.checkIfEmailExists(request.body.Email);

                if (request.body.Email.toLowerCase() !== user.Email.toLowerCase() && checkIfEmailExists) {
                    return response.status(400).json(api.error('Email already exists', 400));
                }
            }

            const role = user.UserRole.Role;
            if (role.Id !== request.body.RoleId) {
                role.Role = await roles.getById(request.body.RoleId);
            }

            if (user.UserTypeId === 1) { // EQUAL TO Victorious
                const podUser = user.PodUser;

                if (request.body.PodId) {
                    podUser.PodId = request.body.PodId;
                    user.PodUser = podUser;
                } else if (podUser !== null) {
                    await podUser.deletePodUser(podUser.Id);
                }
            }

            await user.save();

            return response.json(api.success(user));
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
            const isAdmin = await userResolver.isCustomerAdminOrVictoriousAdmin(request.params.id);
            if (!isAdmin) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const user = await users.getById(request.params.id);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            if (user.IsPrimaryContact) {
                return response.status(400).json(api.error('Not possible to delete the primary contact', 400));
            }

            const allProjects = await projects.getAllByMainContactId(user.Id);
            if (allProjects.length > 0) {
                const primaryContact = await users.getByPrimaryContact();

                allProjects.forEach((project) => { project.MainContactId = primaryContact.Id; });
            }

            const deleteUser = await users.deleteUser(request.params.id);

            return response.json(api.success(deleteUser));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/weeklyEmail/customers/:customerId/emailSettings', async (request, response, next) => {
        try {
            const allUsers = await users.getAllByCustomerIdWithUserEmailSettings(request.params.customerId);

            return response.json(api.success(allUsers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/list/active', async (request, response, next) => {
        try {
            const user = await users.getByIdList(request.params.id);

            return response.json(api.success(user));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/email', async (request, response, next) => {
        try {
            const user = await users.getByEmail(request.body.Email);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(user));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/email/userRoles', async (request, response, next) => {
        try {
            const user = await users.getByEmailWithUserRoles(request.body.Email);
            if (!user) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(user));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const customer = await customers.getById(request.body.CustomerId);
            const dsType = await dsTypes.getById(request.body.DsTypeId);
            const userType = await userTypes.getById(request.body.UserTypeId);

            if (!customer) {
                errorList.CustomerId = helpers.addErrorMessages('CustomerId');
            }
            if (!dsType) {
                errorList.DsTypeId = helpers.addErrorMessages('DsTypeId');
            }
            if (!userType) {
                errorList.UserTypeId = helpers.addErrorMessages('UserTypeId');
            }

            const newUser = await users.createUser(request.body);

            return response.status(201).json(api.success(newUser));
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
