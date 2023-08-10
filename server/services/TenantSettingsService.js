const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const PaginationService = require('../lib/PaginationService');

const pagination = new PaginationService();

class TenantSettingsService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const tenantSettings = await db.TenantSettings.findAll({
            order: [['Id', 'ASC']],
        });

        return tenantSettings;
    }

    // GetPaged
    async getPaged(paginationParams) {
        const page = paginationParams.Page;
        const take = paginationParams.Take;
        const startIndex = (page - 1) * take;
        const endIndex = page * take; // total count until that page

        const tenantSettings = await db.TenantSettings.findAll({
            offset: startIndex, // Skip
            limit: take, // Take
        });

        const tenantSettingsWithCountAndRows = await db.TenantSettings.findAndCountAll();
        const totalCount = tenantSettingsWithCountAndRows.count;

        if (tenantSettings.length) {
            const paginatedData = pagination.toPagedList(
                tenantSettings, page, startIndex, endIndex, take, totalCount,
            );
            return paginatedData;
        }

        return [];
    }

    // GetByPrefix
    async getAllByNamePrefix(prefix) {
        const tenantSettings = await db.TenantSettings.findAll({
            where: {
                Name: { [Op.startsWith]: prefix.toUpperCase() },
            },
        });

        return tenantSettings;
    }

    // GetAsanaSettings
    async getAllAsanaSettings() {
        const tenantSettings = await this.getAllByNamePrefix('ASANA');
        const asanaSettingsObj = {};

        for (let i = 0; i < tenantSettings.length; i++) {
            if (tenantSettings[i].Name === 'ASANA_TOKEN') {
                asanaSettingsObj.Token = tenantSettings[i].Val1;
            }
            if (tenantSettings[i].Name === 'ASANA_WORKSPACE_GID') {
                asanaSettingsObj.WorkspaceGid = tenantSettings[i].Val1;
            }
            if (tenantSettings[i].Name === 'ASANA_CUSTOMER_APPROVAL_FIELD') {
                asanaSettingsObj.NeedsApprovalField = tenantSettings[i].Val1;
            }
        }

        return asanaSettingsObj;
    }

    // GetSmtpSettings
    async getAllSmtpSettings() {
        const smtpSettings = await this.getAllByNamePrefix('SMTP');

        return smtpSettings;
    }

    // GetAsanaTeamProjectSections
    async getAllAsanaTeamProjectSections() {
        const asanaTeamProjectSections = await this.getAllByNamePrefix('ASANA_TEAM_PROJECT_SECTION'); // Look at .env file

        return asanaTeamProjectSections;
    }

    // GetById
    async getById(id) {
        const tenantSetting = await db.TenantSettings.findByPk(id);

        return tenantSetting;
    }

    // GetByName
    async getByName(name) {
        const tenantSettings = await db.TenantSettings.findOne({
            where: { Name: name },
        });

        return tenantSettings;
    }

    // GetAsanaHookSecret
    async getAsanaHookSecret() {
        const tenantSettings = await this.getByName('ASANA_HOOK_SECRET');

        return tenantSettings.Val1;
    }

    // InsertAsanaHookScecret
    async insertAsanaHookSecret(hookSecret) {
        let message = '';
        let errorCode = '';
        const asanaHookSecret = await this.getByName('ASANA_HOOK_SECRET'); // Look at .env file

        if (!hookSecret) {
            errorCode = 404;
            message = 'Asana hook not found';
        } else if (!hookSecret.Val1) {
            errorCode = 500;
            message = 'Asana hook already exists';
        }

        if (message.length > 0) {
            return {
                message,
                error: true,
                statusCode: errorCode,
            };
        }

        asanaHookSecret.Val1 = hookSecret;

        return asanaHookSecret;
    }

    // GetHubSpotApiKey
    async getHubspotApiKey() {
        const hubspotKey = await this.getByName('HUBSPOT_API_KEY'); // Look at .env file

        if (hubspotKey.length < 1) {
            return {
                message: 'Hubspot api key not found',
                error: true,
            };
        }

        return hubspotKey[0].Val1;
    }

    async createTenantSettings(body) {
        const values = {
            Id: uuid(),
            Name: body.Name,
            Val1: body.Val1,
            Val2: body.Val2,
            TenantId: body.TenantId,
        };
        const newTenantSetting = await db.TenantSettings.create(values);

        return newTenantSetting;
    }

    async updateTenantSettings(id, body) {
        const tenantSetting = await db.TenantSettings.findByPk(id);
        let tenantId;

        if (body.TenantId) {
            tenantId = body.TenantId;
        }

        const values = {
            Name: body.Name ? body.Name : tenantSetting.Name,
            Val1: body.Val1 ? body.Val1 : tenantSetting.Val1,
            Val2: body.Val2 ? body.Val2 : tenantSetting.Val2,
            TenantId: tenantId,
        };
        const updateTenantSetting = await db.TenantSettings.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTenantSetting[1].dataValues;
    }

    async deleteTenantSettings(id) {
        await db.TenantSettings.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = TenantSettingsService;
