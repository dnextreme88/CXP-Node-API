/* eslint-disable global-require */
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const compression = require('compression');
const createError = require('http-errors');
const routes = require('./routes');

// Modules (files) are cached in node: so any subsequent require('./models') (like in the services)
// will just call the existing Class instantiated here
// const db = require('./models');
const ActionAreaService = require('./services/ActionAreaService');
const AsanaDeliverableTypeService = require('./services/AsanaDeliverableTypeService');
const CommentService = require('./services/CommentService');
const CommentTemplateService = require('./services/CommentTemplateService');
const CommentTemplateTemplateTypeService = require('./services/CommentTemplateTemplateTypeService');
const CommentTemplateTypeService = require('./services/CommentTemplateTypeService');
const CommentTypeService = require('./services/CommentTypeService');
const CustomerService = require('./services/CustomerService');
const DeliverableService = require('./services/DeliverableService');
const DeliverableTypeService = require('./services/DeliverableTypeService');
const DsTypeService = require('./services/DsTypeService');
const ExceptionLogService = require('./services/ExceptionLogService');
const GoalService = require('./services/GoalService');
const GoalTypeService = require('./services/GoalTypeService');
const GoogleAnalyticPagePathService = require('./services/GoogleAnalyticPagePathService');
const GoogleAnalyticTypeService = require('./services/GoogleAnalyticTypeService');
const GoogleAnalyticValueService = require('./services/GoogleAnalyticValueService');
const ModuleTypeService = require('./services/ModuleTypeService');
const NotificationService = require('./services/NotificationService');
const NotificationAppService = require('./services/NotificationAppService');
const NotificationAppTypeService = require('./services/NotificationAppTypeService');
const NotificationAppUserReadService = require('./services/NotificationAppUserReadService');
const PodService = require('./services/PodService');
const PodProjectService = require('./services/PodProjectService');
const PodUserService = require('./services/PodUserService');
const ProjectService = require('./services/ProjectService');
const ProjectStatusService = require('./services/ProjectStatusService');
const RequestLogService = require('./services/RequestLogService');
const RoleService = require('./services/RoleService');
const TargetKeywordService = require('./services/TargetKeywordService');
const TargetKeywordPositioningService = require('./services/TargetKeywordPositioningService');
const TargetPageService = require('./services/TargetPageService');
const TaskService = require('./services/TaskService');
const TaskCommentService = require('./services/TaskCommentService');
const TemplateService = require('./services/TemplateService');
const TemplateTypeService = require('./services/TemplateTypeService');
const TenantService = require('./services/TenantService');
const TenantModuleService = require('./services/TenantModuleService');
const TenantSettingsService = require('./services/TenantSettingsService');
const TotalKeywordsRankedService = require('./services/TotalKeywordsRankedService');
const UserService = require('./services/UserService');
const UserEmailSettingsService = require('./services/UserEmailSettingsService');
const UserEmailSettingsTypeService = require('./services/UserEmailSettingsTypeService');
const UserPicService = require('./services/UserPicService');
const UserRoleService = require('./services/UserRoleService');
const UserTypeService = require('./services/UserTypeService');

module.exports = (config) => {
    const app = express();
    app.use(helmet());
    app.use(compression());
    const log = config.log();
    // Services
    const actionAreas = new ActionAreaService(log);
    const asanaDeliverableTypes = new AsanaDeliverableTypeService(log);
    const comments = new CommentService(log); // Original
    const commentTemplates = new CommentTemplateService(log);
    const commentTemplateTemplateTypes = new CommentTemplateTemplateTypeService(log);
    const commentTemplateTypes = new CommentTemplateTypeService(log);
    const commentTypes = new CommentTypeService(log);
    const customers = new CustomerService(log);
    const deliverables = new DeliverableService(log);
    const deliverableTypes = new DeliverableTypeService(log);
    const dsTypes = new DsTypeService(log);
    const exceptionLogs = new ExceptionLogService(log);
    const goals = new GoalService(log);
    const goalTypes = new GoalTypeService(log);
    const googleAnalyticPagePaths = new GoogleAnalyticPagePathService(log);
    const googleAnalyticTypes = new GoogleAnalyticTypeService(log);
    const googleAnalyticValues = new GoogleAnalyticValueService(log);
    const moduleTypes = new ModuleTypeService(log);
    const notifications = new NotificationService(log);
    const notificationApps = new NotificationAppService(log); // Original
    const notificationAppTypes = new NotificationAppTypeService(log);
    const notificationAppUserRead = new NotificationAppUserReadService(log);
    const pods = new PodService(log);
    const podProjects = new PodProjectService(log);
    const podUsers = new PodUserService(log);
    const projects = new ProjectService(log);
    const projectStatuses = new ProjectStatusService(log);
    const requestLogs = new RequestLogService(log);
    const roles = new RoleService(log);
    const targetKeywords = new TargetKeywordService(log);
    const targetKeywordPositionings = new TargetKeywordPositioningService(log);
    const targetPages = new TargetPageService(log);
    const tasks = new TaskService(log);
    const taskComments = new TaskCommentService(log);
    const templates = new TemplateService(log);
    const templateTypes = new TemplateTypeService(log);
    const tenants = new TenantService(log);
    const tenantModules = new TenantModuleService(log);
    const tenantSettings = new TenantSettingsService(log);
    const totalKeywordsRankeds = new TotalKeywordsRankedService(log);
    const users = new UserService(log);
    const userEmailSettings = new UserEmailSettingsService(log);
    const userEmailSettingsTypes = new UserEmailSettingsTypeService(log);
    const userPics = new UserPicService(log);
    const userRoles = new UserRoleService(log);
    const userTypes = new UserTypeService(log);

    app.get('/favicon.ico', (req, res) => res.sendStatus(204));
    app.get('/', (request, response) => response.send('Hello world!'));

    if (app.get('env') === 'production') {
        /**
         * If true, the client's IP address is understood as the left-most entry in the
         * X-Forwarded-For header. Additionally, an IP address, subnet, or an array of IP addresses
         * and subnets that are trusted to be a reverse proxy are set. Loopback is the
         * pre-configured subnet name for: 127.0.0.1/8, ::1/128
         */
        app.set('trust proxy', 'loopback');
    }
    const authRoutesIndex = require('./routes/auth-routes-index');
    const db = require('./models');

    // Load passport strategies
    require('./config/passport')(passport, db.User);

    // Initialize Passport
    app.use(passport.initialize());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const authRoutes = require('./routes/auth-routes')(passport);

    // Load passport routes to be used for accessing API routes
    app.use('/api/', authRoutesIndex({ authRoutes }));

    // Protect routes and require a JWT token in the Authorization Header
    app.use('/api/', (req, res, next) => {
        passport.authenticate('jwt', (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                // Test JWTs: https://token.dev. If the payload info after the first dot (.) was
                // altered, return a different message saying it was malformed
                if (Object.keys(info).length < 1) {
                    info = { message: 'jwt malformed', name: 'SyntaxError' };
                }

                return res.status(401).json({
                    auth: false,
                    message: info,
                    error: true,
                    statusCode: 401,
                    data: null,
                });
            }

            return next();
        })(req, res, next);
    }, routes({
        actionAreas,
        asanaDeliverableTypes,
        comments,
        commentTemplates,
        commentTemplateTemplateTypes,
        commentTemplateTypes,
        commentTypes,
        customers,
        deliverables,
        deliverableTypes,
        dsTypes,
        exceptionLogs,
        goals,
        goalTypes,
        googleAnalyticPagePaths,
        googleAnalyticTypes,
        googleAnalyticValues,
        moduleTypes,
        notifications,
        notificationApps,
        notificationAppTypes,
        notificationAppUserRead,
        pods,
        podProjects,
        podUsers,
        projects,
        projectStatuses,
        requestLogs,
        roles,
        targetKeywords,
        targetKeywordPositionings,
        targetPages,
        tasks,
        taskComments,
        templates,
        templateTypes,
        tenants,
        tenantModules,
        tenantSettings,
        totalKeywordsRankeds,
        users,
        userEmailSettings,
        userEmailSettingsTypes,
        userPics,
        userRoles,
        userTypes,
    }));

    // Catch non-existing routes (404s) and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    // Custom error handler to extend default Express error handler
    app.use(async (err, req, res, next) => {
        // Enable last
        // If the error occurs after the response headers have been sent,
        // let the default Express error handler catch it
        // if (res.headersSent) {
        //     return next(err);
        // }
        if (req.xhr) {
            log.error(err);
            const status = err.status || 500;
            try {
                // await notifications.logError(err.message, err.stack);
                return res
                    .status(status)
                    .json({ msg: err.message || '', stack: err.stack || '' });
            } catch (e) {
                return next(e);
            }
        } else {
            log.error(err);
            const status = err.status || 500;
            res.locals.status = status;
            const errOptions = req.app.get('env') === 'development'
                ? { msg: err.message || '', stack: err.stack || '' }
                : {};
            try {
                // await notifications.logError(err.message, err.stack);
                return res.status(status).json(errOptions);
            } catch (e) {
                return next(e);
            }
        }
    });

    return app;
};
