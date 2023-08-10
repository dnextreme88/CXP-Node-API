/* eslint-disable max-len */
const uuid = require('uuid').v4;
const db = require('../models');
const PaginationService = require('../lib/PaginationService');

const pagination = new PaginationService();

class TenantService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll() {
        const tenants = await db.Tenant.findAll({
            order: [['CreatedAt', 'ASC']],
        });

        return tenants;
    }

    // GetById
    async getById(id) {
        const tenant = await db.Tenant.findByPk(id);

        return tenant;
    }

    // GetPaged
    async getPaged(paginationParams) {
        const page = paginationParams.Page;
        const take = paginationParams.Take;
        const startIndex = (page - 1) * take;
        const endIndex = page * take; // total count until that page

        const tenants = await db.Tenant.findAll({
            offset: startIndex, // Skip
            limit: take, // Take
        });

        const tenantsWithCountAndRows = await db.Tenant.findAndCountAll();
        const totalCount = tenantsWithCountAndRows.count;

        if (tenants.length) {
            const paginatedData = pagination.toPagedList(tenants, page, startIndex, endIndex, take, totalCount);
            return paginatedData;
        }

        return [];
    }

    // ToggleActive
    async toggleActive(id) {
        const tenant = await db.Tenant.findByPk(id);

        // Reverse the Active field value of tenant, update and save it
        tenant.Active = !tenant.Active;
        await tenant.save();

        return tenant;
    }

    async createTenant(body) {
        const values = {
            Id: uuid(),
            Active: body.Active,
            Name: body.Name,
            Address: body.Address,
            Phone: body.Phone,
            Email: body.Email,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CreatedById: body.UserId,
            ModifiedById: body.UserId,
        };
        const newTenant = await db.Tenant.create(values);

        return newTenant;
    }

    async updateTenant(id, body) {
        const tenant = await db.Tenant.findByPk(id);
        let active;
        let userId;

        if (body.Active || body.Active === false) {
            active = body.Active;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Active: active,
            Name: body.Name ? body.Name : tenant.Name,
            Address: body.Address ? body.Address : tenant.Address,
            Phone: body.Phone ? body.Phone : tenant.Phone,
            Email: body.Email ? body.Email : tenant.Email,
            CreatedAt: tenant.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: tenant.CreatedById,
            ModifiedById: userId,
        };
        const updateTenant = await db.Tenant.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateTenant[1].dataValues;
    }

    async deleteTenant(id) {
        await db.Tenant.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = TenantService;
