const express = require('express');
const { ValidationError } = require('sequelize');
const ApiResponse = require('../../lib/ApiResponse');

const router = express.Router();

module.exports = (params) => {
    const { customers } = params;
    const api = new ApiResponse();

    router.get('/', async (request, response, next) => {
        try {
            const {
                Search, OrderBy, Direction, Take, Skip,
            } = request.query;
            const paginationParams = {
                Search, OrderBy, Direction, Take, Skip,
            };
            const allCustomers = await customers.getAll(paginationParams);

            return response.json(api.success(allCustomers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/hubspot/:searchString', async (request, response, next) => {
        try {
            const allCustomers = await customers.getAllByName(request.params.searchString);

            const hubspotCustomers = [];
            allCustomers.forEach((customer) => {
                const hubspotCustomer = {
                    Id: customer.Id,
                    Name: customer.Name,
                    HubSpotCustomerName: customer.RefName,
                    HubSpotCustomerId: customer.RefId,
                };

                hubspotCustomers.push(hubspotCustomer);
            });

            return response.json(api.success(hubspotCustomers));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const customer = await customers.getById(request.params.id);
            if (!customer) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(customer));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.post('/', async (request, response, next) => {
        const errorList = {};

        try {
            const newCustomer = await customers.createCustomer(request.body);

            return response.status(201).json(api.success(newCustomer));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });

                response.status(500).json({ errors: errorList, statusCode: 500 });
            }

            return next(event);
        }
    });

    router.post('/bulkCreate', async (request, response, next) => {
        const errorList = {};

        try {
            const newCustomers = await customers.bulkCreateCustomer(request.body);

            return response.status(201).json(api.success(newCustomers));
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
            const customer = await customers.getById(request.params.id);
            if (!customer) {
                return response.status(404).json(api.error('', 404));
            }

            const updatedCustomer = await customers.updateCustomer(request.params.id, request.body);

            return response.json(api.success(updatedCustomer));
        } catch (event) {
            if (event instanceof ValidationError) {
                event.errors.forEach((error) => {
                    errorList[error.path] = error.message;
                });

                response.status(500).json({ errors: errorList, statusCode: 500 });
            }

            return next(event);
        }
    });

    // DELETE
    router.post('/:id/delete', async (request, response, next) => {
        try {
            const customer = await customers.getById(request.params.id);
            if (!customer) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteCustomer = await customers.deleteCustomer(request.params.id);

            return response.json(api.success(deleteCustomer));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
