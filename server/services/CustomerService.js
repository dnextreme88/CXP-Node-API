/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');
const PaginationService = require('../lib/PaginationService');
const UserResolverService = require('../lib/UserResolverService');

const pagination = new PaginationService();
const userResolver = new UserResolverService();

class CustomerService {
    constructor(log) {
        this.log = log;
    }

    // GetAll
    async getAll(paginationParams) {
        const customerAttr = await db.Customer.rawAttributes;
        const customerFields = [];
        let query;

        for (const fieldKey in customerAttr) {
            const fieldName = `"Customer"."${customerAttr[fieldKey].field}"`;
            customerFields.push(fieldName);
        }

        query = `SELECT ${customerFields} FROM "Customer" AS "Customer"`;

        if (paginationParams.Search) {
            const searchString = paginationParams.Search.toLowerCase();

            query += ` WHERE "Customer"."Name" LIKE '%${searchString}%'`;
        }

        // Add ORDER BY, LIMIT and OFFSET params to query
        query += await pagination.orderByParams('customer', paginationParams.OrderBy, paginationParams.Direction);
        query += await pagination.pageByPagingParams(paginationParams.Take, paginationParams.Skip);

        const runQuery = await db.sequelize.query(
            query, { type: db.sequelize.QueryTypes.SELECT },
        );

        return runQuery;
    }

    // SearchByName
    async getAllByName(searchString) {
        const customers = await db.Customer.findAll({
            where: {
                // NOTE: no need to convert searchString to lowercase as RefName values usually
                // starts with an uppercase letter
                [Op.or]: [
                    { Name: { [Op.substring]: searchString } },
                    { RefName: { [Op.substring]: searchString } },
                ],
            },
        });

        return customers;
    }

    // GetById
    async getById(id) {
        const customer = await db.Customer.findByPk(id);

        return customer;
    }

    // GetForWeeklyEmail, used in cronjob
    async getForWeeklyEmail(skip = 0) {
        const customer = await db.Customer.findOne({
            offset: skip,
            // Complex where clauses at the top-level
            where: {
                '$Project.ProjectStatusId$': { [Op.not]: 5 }, // NOT EQUAL TO Archived
            },
            include: { model: await db.Project },
            order: [['Id', 'ASC']],
        });

        return customer;
    }

    async createCustomer(body) {
        const values = {
            Id: uuid(),
            TenantId: await userResolver.getTenantId(),
            Name: body.Name,
            RefName: body.RefName,
            RefId: body.RefId,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
        };
        const newCustomer = await db.Customer.create(values);

        return newCustomer;
    }

    async bulkCreateCustomer(valuesArray) {
        const newValuesArray = [];
        let valuesObj = {};
        let newValuesObj = {};

        for (let i = 0; i < valuesArray.length; i++) {
            valuesObj = {
                ...valuesArray[i],
                CreatedAt: new Date(),
                ModifiedAt: new Date(),
            };
            newValuesArray.push(valuesObj);
        }
        newValuesObj = newValuesArray;

        const newCustomers = await db.Customer.bulkCreate(newValuesObj, {
            validate: true,
            returning: true,
        });

        return newCustomers;
    }

    async updateCustomer(id, body) {
        const customer = await db.Customer.findByPk(id);

        const values = {
            TenantId: customer.TenantId,
            Name: body.Name ? body.Name : customer.Name,
            RefName: body.RefName ? body.RefName : customer.RefName,
            RefId: body.RefId ? body.RefId : customer.RefId,
            CreatedAt: customer.CreatedAt,
            ModifiedAt: new Date(),
        };
        const updateCustomer = await db.Customer.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateCustomer[1].dataValues;
    }

    async deleteCustomer(id) {
        await db.Customer.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM
    // GetByHubspotIds - modified so that it checks for individual company ids instead of checking
    // it individually in the array
    async getByRefId(refId) {
        const customer = await db.Customer.findOne({
            where: { RefId: refId },
        });

        return customer;
    }
}

module.exports = CustomerService;
