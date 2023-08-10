/* eslint-disable max-len */
const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const db = require('../models');
const Helpers = require('../lib/Helpers');
const ConstantsService = require('../lib/ConstantsService');
const MailService = require('../lib/MailService');
const UserResolverService = require('../lib/UserResolverService');
const NotificationService = require('./NotificationService');
const TemplateService = require('./TemplateService');
const UserRoleService = require('./UserRoleService');

const helpers = new Helpers();
const constants = new ConstantsService();
const mail = new MailService();
const userResolver = new UserResolverService();
const notificationService = new NotificationService(this.log);
const templateService = new TemplateService(this.log);
const userRoleService = new UserRoleService(this.log);

const hideAttributes = ['PasswordHash', 'PasswordSalt'];

class UserService {
    constructor(log) {
        this.log = log;
    }

    // GetUsers
    async getAll() {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            where: {
                [Op.not]: { DsTypeId: 2 }, // NOT EQUAL TO Not Active
                UserTypeId: 1, // EQUAL TO Victorious
            },
            include: [
                {
                    model: await db.UserRole,
                    include: [{ model: await db.Role }],
                },
                {
                    model: await db.PodUser,
                },
            ],
            order: [['LastName', 'ASC']],
        });

        return users;
    }

    // GetUsersWithMailSettingsForCustomer
    async getAllByCustomerIdWithUserEmailSettings(customerId) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            where: {
                CustomerId: customerId,
                DsTypeId: 1, // EQUAL TO Active
                UserTypeId: 2, // EQUAL TO Customer
            },
            include: { model: await db.UserEmailSettings },
        });

        return users;
    }

    // GetUsersForWeeklyEmail, used in cronjob
    async getAllForWeeklyEmail(customerId) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            where: {
                CustomerId: customerId,
                DsTypeId: 1, // EQUAL TO Active
                UserTypeId: 2, // EQUAL TO Customer
            },
            include: { model: await db.UserPic },
        });

        return users;
    }

    // GetVictoriousMembers
    async getAllVictoriousMembers(paginationParams) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            offset: paginationParams.Skip,
            limit: paginationParams.Take,
            where: {
                [Op.not]: { DsTypeId: 2 }, // NOT EQUAL TO Not Active
                UserTypeId: 1, // EQUAL TO Victorious
            },
            include: [
                {
                    model: await db.UserRole,
                    include: { model: await db.Role },
                },
                {
                    model: await db.PodUser,
                    include: { model: await db.Pod },
                },
            ],
            order: [['LastName', 'ASC']],
        });

        return users;
    }

    // GetCustomers
    async getAllByCustomerId(customerId, paginationParams) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            offset: paginationParams.Skip,
            limit: paginationParams.Take,
            where: {
                CustomerId: customerId,
                [Op.not]: { DsTypeId: 2 }, // NOT EQUAL TO Not Active
                UserTypeId: 2, // EQUAL TO Customer
            },
            include: [
                {
                    model: await db.UserRole,
                    include: { model: await db.Role },
                },
                {
                    model: await db.PodUser,
                    include: { model: await db.Pod },
                },
            ],
            order: [['LastName', 'ASC']],
        });

        return users;
    }

    // GetUsersWithoutPod
    async getAllWithoutPods(paginationParams) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            offset: paginationParams.Skip,
            limit: paginationParams.Take,
            where: {
                [Op.not]: {
                    Email: 'product@victoriousseo.com',
                    DsTypeId: 2, // NOT EQUAL TO Not Active
                },
            },
            include: [
                {
                    model: await db.UserRole,
                    include: { model: await db.Role },
                },
                {
                    model: await db.PodUser,
                    where: {
                        UserId: { [Op.is]: null },
                    },
                },
            ],
            order: [['LastName', 'ASC']],
        });

        return users;
    }

    // GetById, do not exclude PasswordHash and PasswordSalt fields as there's a check when
    // updating password in the PUT /users/changePassword route
    async getById(id) {
        const user = await db.User.findOne({
            where: {
                Id: id,
                DsTypeId: { [Op.not]: 2 }, // NOT EQUAL TO Not Active
            },
        });

        return user;
    }

    // GetByIdList
    async getByIdList(id) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            where: {
                Id: id,
                [Op.not]: { DsTypeId: 2 }, // NOT EQUAL TO Not Active
            },
        });

        return users;
    }

    // GetPrimaryContact
    async getByPrimaryContact() {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: {
                [Op.not]: { IsPrimaryContact: null },
            },
        });

        return user;
    }

    // GetByIdWithRolesAndPods
    async getByIdWithRolesandPods(id) {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: {
                Id: id,
                [Op.not]: { DsTypeId: 2 }, // NOT EQUAL TO Not Active
            },
            include: [
                {
                    model: await db.UserRole,
                    include: { model: await db.Role },
                },
                {
                    model: await db.PodUser,
                    include: { model: await db.Pod },
                },
                {
                    model: await db.UserPic,
                },
                {
                    model: await db.UserEmailSettings,
                },
            ],
        });

        return user;
    }

    // GetActiveByEmail
    async getByActiveForEmail(email) {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: {
                Email: email,
                DsTypeId: 1, // EQUAL TO Active
            },
        });

        return user;
    }

    // GetByEmail
    async getByEmail(email) {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: { Email: email },
        });

        return user;
    }

    // GetActiveByEmailWithRolesAndPods
    async getByEmailWithRolesAndPods(email) {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: {
                Email: email,
                DsTypeId: 1, // EQUAL TO Active
            },
            include: [
                {
                    model: await db.UserRole,
                    include: { model: await db.Role },
                },
                {
                    model: await db.PodUser,
                    include: { model: await db.Pod },
                },
            ],
        });

        return user;
    }

    // GetByEmailWithUserRoles
    async getByEmailWithUserRoles(email) {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: { Email: email },
            include: [
                {
                    model: await db.UserRole,
                    include: { model: await db.Role },
                },
            ],
        });

        return user;
    }

    // EmailExists
    async checkIfEmailExists(email) {
        const user = await db.User.findOne({
            attributes: { exclude: hideAttributes },
            where: { Email: email },
        });

        if (!user) return false;

        return true;
    }

    async createUser(body) {
        const values = {
            Id: uuid(),
            TenantId: uuid(),
            FirstName: body.FirstName,
            LastName: body.LastName,
            FirstLastName: '', // setDataValue is called on server/models/User.js
            Title: body.Title,
            Email: body.Email,
            PasswordHash: body.Password,
            PasswordSalt: body.Password,
            FunFacts: body.FunFacts,
            IsPrimaryContact: body.IsPrimaryContact,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CustomerId: body.CustomerId ? body.CustomerId : null,
            DsTypeId: body.DsTypeId,
            UserTypeId: body.UserTypeId,
        };
        const newUser = await db.User.create(values);
        // Manually set values and explicitly call save method as
        // setDataValue does not update the values on save by default
        await newUser.setDataValue('CreatedById', values.Id);
        await newUser.setDataValue('ModifiedById', values.Id);
        await newUser.save();

        return newUser;
    }

    async updateUser(id, body) {
        const user = await db.User.findByPk(id);
        let isPrimaryContact;
        let customerId;
        let dsTypeId;
        let userTypeId;

        if (body.IsPrimaryContact || body.IsPrimaryContact === false) {
            isPrimaryContact = body.IsPrimaryContact;
        }
        if (body.CustomerId) {
            customerId = body.CustomerId;
        }
        if (body.DsTypeId) {
            dsTypeId = body.DsTypeId;
        }
        if (body.UserTypeId) {
            userTypeId = body.UserTypeId;
        }

        const values = {
            // Not defined as a Foreign Key
            TenantId: body.TenantId ? body.TenantId : user.TenantId,
            FirstName: body.FirstName ? body.FirstName : user.FirstName,
            LastName: body.LastName ? body.LastName : user.LastName,
            FirstLastName: body.FirstLastName ? body.FirstLastName : user.FirstLastName,
            Title: body.Title ? body.Title : user.Title,
            Email: body.Email ? body.Email : user.Email,
            // TOOD: Password must be hashed
            PasswordHash: body.Password ? body.Password : user.Password,
            PasswordSalt: body.Password ? body.Password : user.Password,
            FunFacts: body.FunFacts ? body.FunFacts : user.FunFacts,
            IsPrimaryContact: isPrimaryContact,
            CreatedAt: user.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: user.Id,
            ModifiedById: user.Id,
            CustomerId: customerId,
            DsTypeId: dsTypeId,
            UserTypeId: userTypeId,
        };
        const updateUser = await db.User.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateUser[1].dataValues;
    }

    async deleteUser(id) {
        await db.User.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // IMPLEMENTED FROM BlUser.cs
    // CreatePendingUserWithRole
    async createPendingUserWithRole(user, userTypeId) {
        const isUserEmail = await this.checkIfEmailExists(user.Email);
        if (isUserEmail === true) return { error: true };

        // Map and assign to new object
        const userObj = user;
        userObj.DsTypeId = 3; // EQUAL TO Pending
        userObj.TenantId = await userResolver.getTenantId();
        userObj.UserTypeId = userTypeId; // ADDED

        const newUser = await this.createUser(userObj);

        const userRoleValues = { RoleId: userTypeId === 1 ? 1 : 5, UserId: newUser.Id };
        const newUserRole = await userRoleService.createUserRole(userRoleValues);
        newUser.UserRole = newUserRole;

        return newUser;
    }

    // CreateNotificationSendEmail
    async createNotificationSendEmail(user, templateTypeId, isAnonymous) {
        const notificationGuid = await uuid();
        const template = await templateService.getByTemplateTypeId(templateTypeId);

        if (!template) return { error: true };

        const dateTomorrow = helpers.dateGreaterFromToday(1);
        const dateNextWeek = helpers.dateGreaterFromToday(7);

        // Create notification
        const notificationValues = {
            To: user.Email,
            TemplateTypeId: templateTypeId,
            // TemplateTypeId: 3 = Forgot Password
            ValidTill: templateTypeId === 3 ? dateTomorrow : dateNextWeek,
            Message: '',
            Subject: '',
            UserId: user.Id,
            NotificationGuid: notificationGuid,
            From: '',
            TemplateId: template.Id,
            CreatedById: isAnonymous === true ? user.Id : null,
            ModifiedById: isAnonymous === true ? user.Id : null,
        };

        const newNotification = await notificationService.createNotification(notificationValues);

        const templateBody = template.Template;
        // NOTE: There is a {userName} placeholder defined in the .cs files so I thought I'd use it
        // DRY principle with routes/users/index.js/:id/resendInvitation route
        const body = templateBody
            .replaceAll(await constants.getBaseUrlPlaceholder(), await constants.getWebBaseUrl())
            .replaceAll(await constants.getNotificationGuidPlaceholder(), String(notificationGuid))
            .replaceAll(await constants.getUserNamePlaceholder(), user.FirstName)
            .replaceAll(await constants.getUserEmailPlaceholder(), user.Email);

        // Send email
        const fromShortname = 'Victorious App';
        await mail.sendMail(fromShortname, user.Email, body, template.Name);

        return newNotification;
    }

    // CUSTOM
    async hashPassword(password) {
        const hashedPassword = await bcrypt.hash(password, 12);

        return hashedPassword;
    }

    async isValidPassword(id, password) {
        const user = await db.User.findByPk(id);
        // Compare input password against password stored in the database
        const isValid = await bcrypt.compare(password, user.PasswordHash);

        return isValid;
    }

    async getAllByTeamUpdate(customerId) {
        const users = await db.User.findAll({
            attributes: { exclude: hideAttributes },
            where: {
                CustomerId: customerId,
                DsTypeId: 1, // EQUAL TO Active
                UserTypeId: 2, // EQUAL TO Customer
            },
            include: [
                {
                    model: await db.UserEmailSettings,
                    where: {
                        UserEmailSettingsTypeId: 6, // EQUAL TO Team update
                        Value: true,
                    },
                },
            ],
        });

        return users;
    }
}

module.exports = UserService;
