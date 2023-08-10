/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const Helpers = require('../../lib/Helpers');
const ApiResponse = require('../../lib/ApiResponse');
const AmazonS3Service = require('../../lib/AmazonS3Service');
const AsanaService = require('../../lib/AsanaService');
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
        projects, customers, users, pods, podProjects, goals, comments, deliverables,
    } = params;
    const helpers = new Helpers();
    const api = new ApiResponse();
    const amazonS3 = new AmazonS3Service();
    const asana = new AsanaService(asanaAccessToken);
    const constants = new ConstantsService();
    const userResolver = new UserResolverService();

    router.get('/', async (request, response, next) => {
        try {
            const {
                Search, OrderBy, Direction, Take, Skip, Active,
            } = request.query;
            const paginationParams = {
                Search, OrderBy, Direction, Take, Skip, Active,
            };

            const customerId = await userResolver.getCustomerId();
            const podId = await userResolver.getPodId();
            const isVictoriousAdmin = await userResolver.isVictoriousAdmin();
            const allProjects = await projects.getPaged(
                paginationParams, isVictoriousAdmin, customerId, podId,
            );

            return response.json(api.success(allProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.post('/', upload.single('Logo'), async (request, response, next) => {
        let customer;

        try {
            if (request.body.CustomerId) {
                customer = await customers.getById(request.body.CustomerId);
            } else { // Create new customer if CustomerId is not passed
                const hubspotCustomer = {
                    Name: request.body.CustomerName,
                    RefName: request.body.HubSpotCustomerName,
                    RefId: request.body.HubSpotCustomerId,
                    TenantId: await userResolver.getTenantId(),
                };
                customer = await customers.createCustomer(hubspotCustomer);
            }
            customer.Name = request.body.CustomerName;
            const hasLogo = request.file ? true : null;
            const logoKey = hasLogo ? request.file.path : null;

            const projectValues = {
                TenantId: await userResolver.getTenantId(),
                CustomerId: customer.Id,
                Name: request.body.ProjectName,
                LogoLocation: logoKey,
                ProjectStatusId: 1, // Setup required
            };

            const newProject = await projects.createProject(projectValues);

            if (hasLogo) {
                await amazonS3.uploadFileToS3(request.file, logoKey, await constants.getImageBucket(), 'public-read');
            }

            const customerObj = {
                Id: customer.Id,
                Name: customer.Name,
                RefName: customer.RefName,
                RefId: customer.RefId,
            };
            const projectWithCustomer = { ...newProject.dataValues, Customer: customerObj };

            return response.status(201).json(api.success(projectWithCustomer));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/getForCustomer', async (request, response, next) => {
        try {
            const { customerId } = request.query;
            const allProjects = await projects.getAllByCustomerId(customerId);

            return response.json(api.success(allProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/gDrive', async (request, response, next) => {
        try {
            const { folder } = request.query;
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            project.GoogleDriveFolderId = folder;
            await project.save();

            return response.status(201).json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/contract', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const projectContract = await projects.getContract(request.params.id);

            return response.json(api.success(projectContract));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/contract', upload.single('File'), async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const uploadedContract = await projects.uploadContract(request.params.id, request.file);

            return response.json(api.success(uploadedContract));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id/contract', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const deletedContract = await projects.deleteContract(request.params.id);

            return response.json(api.success(deletedContract));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/podAndContact', upload.single('Contract'), async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const pod = await pods.getById(request.body.PodId);

            if (request.body.MainContactId) {
                const user = await users.getById(request.body.MainContactId);
                project.MainContactId = user.Id;
            }

            if (project.PodProject) {
                project.PodProjects = pod;
            } else {
                const podProjectValues = { PodId: pod.Id, ProjectId: project.Id };
                await podProjects.createPodProject(podProjectValues);
            }

            await project.save();

            if (request.file !== null) {
                await projects.uploadContract(request.params.id, request.file);
            }

            await projects.updateProjectStatus(project.Id, 1); // 1 = Setup required

            const contractUrl = await projects.getContract(request.params.id);
            const projectValues = { ContractLocation: contractUrl };

            const updatedProject = await projects.updateProject(request.params.id, projectValues);

            return response.json(api.success(updatedProject));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/logo', upload.single('Logo'), async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const uploadedLogo = await projects.uploadLogo(request.params.id, request.file);

            return response.status(201).json(api.success(uploadedLogo));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id/logo', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const deletedLogo = await projects.deleteLogo(request.params.id);

            return response.json(api.success(deletedLogo));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/asana', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const isAsanaIdInvalid = await projects.checkIfAsanaProjectIdIsInvalid(
                request.params.id, request.body.AsanaProjectId,
            );
            if (!isAsanaIdInvalid) {
                return response.status(400).json(api.error(
                    'Project with the same Asana id already exists', 400,
                ));
            }

            await projects.updateProjectStatus(project.Id, 2); // 2 = GA Setup required

            const projectValues = {
                AsanaProjectId: request.body.AsanaProjectId,
                AsanaRefName: request.body.AsanaRefName,
                AsanaOwnerName: request.body.AsanaOwnerName,
                AsanaTeamName: request.body.AsanaTeamName,
                AsanaCreatedAt: request.body.AsanaCreatedAt,
            };
            const updatedProject = await projects.updateProject(project.Id, projectValues);

            return response.json(api.success(updatedProject));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/asana/:gid', async (request, response, next) => {
        try {
            const isAsanaProject = await projects.checkIfAsanaProjectIdExists(request.params.gid);
            if (isAsanaProject === true) {
                return response.status(400).json(api.error(
                    'Project with the same Asana id already exists', 400,
                ));
            }

            // Execute Asana API request
            const asanaResponse = await asana.getProjectById(request.params.gid);
            if (asanaResponse.error) {
                return response.status(asanaResponse.statusCode).json(api.error(
                    asanaResponse.message, asanaResponse.statusCode,
                ));
            }

            return response.json(api.success(asanaResponse));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id/ga', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            await projects.updateProjectStatus(project.Id, 3); // 3 = Goal Setup required

            const projectValues = {
                GoogleAnalyticsPropertyId: request.body.GoogleAnalyticsPropertyId,
                GoogleAnalyticsViewId: request.body.GoogleAnalyticsViewId,
                Domain: request.body.Domain,
                GoogleDriveFolderId: request.body.GoogleDriveFolderId,
            };
            const updatedProject = await projects.updateProject(project.Id, projectValues);

            return response.json(api.success(updatedProject));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/ga/validate', async (request, response, next) => {
        try {
            const { property, view } = request.query;
            // Returns true if any of the attributes exist in the database
            const isGaPropertyIdExist = await projects.checkIfGoogleAnalyticsPropertyIdExists(property);
            const isGaViewIdExist = await projects.checkIfGoogleAnalyticsViewIdExists(view);

            const gaPropertyAndViewValidation = {
                PropertyValid: isGaPropertyIdExist,
                ViewValid: isGaViewIdExist,
            };

            return response.json(api.success(gaPropertyAndViewValidation));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/goals', async (request, response, next) => {
        try {
            const isAuthorized = await userResolver.isVictoriousAndProjectOwner(request.params.id);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const allGoals = await goals.getAllActiveForProject(request.params.id);

            return response.json(api.success(allGoals));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/goals/latest', async (request, response, next) => {
        try {
            const isAuthorized = await userResolver.isVictoriousAndProjectOwner(request.params.id);
            if (!isAuthorized) {
                return response.status(401).json(api.error('Unauthorized', 401));
            }

            const allGoals = await goals.getAllLatestForProject(request.params.id);

            return response.json(api.success(allGoals));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/comments', async (request, response, next) => {
        try {
            const {
                Search, OrderBy, Direction, Take, Skip, Active,
            } = request.query;
            const paginationParams = {
                Search, OrderBy, Direction, Take, Skip, Active,
            };

            const goalsArray = [];
            const allGoals = await goals.getAllLatestForProject(request.params.id);
            allGoals.forEach((goal) => goalsArray.push(goal.Id));

            const allComments = await comments.getAllLatestCommentsByGoalIdWithHome(
                goalsArray, request.params.id, paginationParams,
            );

            return response.json(api.success(allComments));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/deliverables', async (request, response, next) => {
        try {
            const allDeliverables = await deliverables.getAllByProjectId(request.params.id);

            return response.json(api.success(allDeliverables));
        } catch (event) {
            return next(event);
        }
    });

    router.put('/:id', upload.single('Logo'), async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            project.Name = request.body.ProjectName;

            // Check if there is an upload or if DeleteLogo key is present in req.body
            if (request.file !== null || request.body.DeleteLogo) {
                const oldLogo = project.LogoLocation;

                if (!oldLogo) {
                    await amazonS3.deleteFileS3(oldLogo, await constants.getImageBucket());
                    project.LogoLocation = null;
                }
            }

            if (request.file !== null) {
                const logoLocation = `${uuid()}-${request.file.filename}`;
                project.LogoLocation = logoLocation;

                await amazonS3.uploadFileToS3(request.file, logoLocation, await constants.getImageBucket(), 'public-read');
            }

            await project.save();

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const contractUrl = await projects.getContract(request.params.id);
            project.ContractLocation = contractUrl;

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.delete('/:id', async (request, response, next) => {
        try {
            const project = await projects.getById(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            const deleteProject = await projects.deleteProject(request.params.id);

            return response.json(api.success(deleteProject));
        } catch (event) {
            return next(event);
        }
    });

    // CUSTOM ROUTES BELOW IMPLEMENTED FROM DAL IN .NET REPO
    router.get('/mainContacts/:userId', async (request, response, next) => {
        try {
            const user = await users.getByIdWithPods(request.params.userId);
            if (!user) {
                const userNotFound = helpers.addErrorMessages('UserId');
                return response.status(404).json(api.error(userNotFound, 404));
            }

            const allProjects = await projects.getAllByMainContactId(request.params.userId);

            return response.json(api.success(allProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/projectStatus/:projectStatusId', async (request, response, next) => {
        try {
            const allProjects = await projects.getAllByProjectStatusId(request.params.projectStatusId);

            return response.json(api.success(allProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/ga/status/notArchived', async (request, response, next) => {
        try {
            const allProjects = await projects.getAllGaJob();

            return response.json(api.success(allProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/list', async (request, response, next) => {
        try {
            const allProjects = await projects.getByIdList(request.params.id);

            return response.json(api.success(allProjects));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/:id/pods', async (request, response, next) => {
        try {
            const project = await projects.getByIdWithPods(request.params.id);
            if (!project) {
                return response.status(404).json(api.error('', 404));
            }

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/customers/:customerId/project', async (request, response, next) => {
        try {
            const isProject = await projects.checkIfProjectExistsForCustomer(request.params.customerId);

            return response.json(api.success(isProject));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/sync/asana', async (request, response, next) => {
        try {
            const { Skip } = request.query;
            const project = await projects.getByOffsetForAsanaSync(Skip);
            if (!project) {
                return response.status(404).json(api.error('Nothing to sync to Asana', 404));
            }

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/sync/targetKeywordPositioning', async (request, response, next) => {
        try {
            const { Skip } = request.query;
            const project = await projects.getByOffsetForTargetKeywordPositioningSync(Skip);
            if (!project) {
                return response.status(404).json(api.error('Nothing to sync', 404));
            }

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/sync/targetPagesAndKeyword', async (request, response, next) => {
        try {
            const { Skip } = request.query;
            const project = await projects.getByOffsetForTargetPagesAndKeywordSync(Skip);
            if (!project) {
                return response.status(404).json(api.error('Nothing to sync', 404));
            }

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    router.get('/sync/totalKeywordsRanked', async (request, response, next) => {
        try {
            const { Skip } = request.query;
            const project = await projects.getByOffsetForTotalKeywordsRanked(Skip);
            if (!project) {
                return response.status(404).json(api.error('Nothing to sync', 404));
            }

            return response.json(api.success(project));
        } catch (event) {
            return next(event);
        }
    });

    return router;
};
