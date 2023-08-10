const express = require('express');

const router = express.Router();

// Require the index file
const actionAreaRoutes = require('./actionareas');
const asanaDeliverableTypeRoutes = require('./asanadeliverabletypes');
// Comments
const commentRoutes = require('./comments');
const commentTemplateRoutes = require('./comments/commenttemplates');
const commentTemplateTemplateTypeRoutes = require('./comments/commenttemplatetemplatetypes');
const commentTemplateTypeRoutes = require('./comments/commenttemplatetypes');
const commentTypeRoutes = require('./comments/commenttypes');
const customerRoutes = require('./customers');
// Deliverables
const deliverableRoutes = require('./deliverables');
const deliverableTypeRoutes = require('./deliverables/deliverabletypes');
const dsTypeRoutes = require('./dstypes');
// Goals
const goalRoutes = require('./goals');
const goalTypeRoutes = require('./goals/goaltypes');
const googleAnalyticPagePathRoutes = require('./googleanalyticpagepaths');
const googleAnalyticTypeRoutes = require('./googleanalytictypes');
const googleAnalyticValueRoutes = require('./googleanalyticvalues');
const moduleTypeRoutes = require('./moduletypes');
// Notifications
const notificationRoutes = require('./notifications');
const notificationAppRoutes = require('./notifications/notificationapps');
const notificationAppTypeRoutes = require('./notifications/notificationapptypes');
const notificationAppUserReadRoutes = require('./notifications/notificationappuserread');
// Pods
const podRoutes = require('./pods');
const podProjectRoutes = require('./pods/podprojects');
const podUserRoutes = require('./pods/podusers');
// Projects
const projectRoutes = require('./projects');
const projectStatusRoutes = require('./projects/projectstatus');
const roleRoutes = require('./roles');
// Tasks
const taskRoutes = require('./tasks');
const taskCommentRoutes = require('./tasks/taskcomments');
// Templates
const templateRoutes = require('./templates');
const templateTypeRoutes = require('./templates/templatetypes');
// Tenants
const tenantRoutes = require('./tenants');
const tenantModuleRoutes = require('./tenants/tenantmodules');
const tenantSettingsRoutes = require('./tenants/tenantsettings');
// Users
const userRoutes = require('./users');
const userEmailSettingsRoutes = require('./users/useremailsettings');
const userEmailSettingsTypeRoutes = require('./users/useremailsettingstypes');
const userPicRoutes = require('./users/userpics');
const userRoleRoutes = require('./users/userroles');
const userTypeRoutes = require('./users/usertypes');

// Log models
const exceptionLogRoutes = require('./log/exceptionlogs');
const requestLogRoutes = require('./log/requestlogs');
// Metric models
const metricRoutes = require('./metrics');
const targetKeywordRoutes = require('./metrics/custom/TargetKeyword');
const targetKeywordPositioningRoutes = require('./metrics/custom/TargetKeywordPositioning');
const targetPageRoutes = require('./metrics/custom/TargetPage');
const totalKeywordsRankedRoutes = require('./metrics/custom/TotalKeywordsRanked');

// Cronjob routes
const asanaCommentSyncJobRoutes = require('./asanaCommentSync');
const gaBackfillJobRoutes = require('./gaBackfillJob');
const gaTypeJobRoutes = require('./gaSyncJob');
const hubspotCustomerSyncJobRoutes = require('./hubspotCustomerSyncJob');
const targetKeywordPositioningBackfillJobRoutes = require('./targetKeywordPositioningBackfillJob');
const targetKeywordPositioningJobRoutes = require('./targetKeywordPositioningJob');
const targetPagesAndKeywordsJobRoutes = require('./targetPagesAndKeywordsJob');
const totalKeywordsRankedBackfillJobRoutes = require('./totalKeywordsRankedBackfillJob');
const totalKeywordsRankedJobRoutes = require('./totalKeywordsRankedJob');
const weeklyEmailJobRoutes = require('./weeklyEmailJob');

module.exports = (params) => {
    // The health-check route
    router.get('/Health', async (req, res) => res.sendStatus(200));

    // Mount comments and notifications routes on their respective paths.
    // Routes start with api/, which is defined under server/index.js
    router.use('/actionArea', actionAreaRoutes(params));
    router.use('/asanaDeliverableType', asanaDeliverableTypeRoutes(params));
    router.use('/comment', commentRoutes(params)); // Original
    router.use('/commentTemplate', commentTemplateRoutes(params));
    router.use('/commentTemplateTemplateType', commentTemplateTemplateTypeRoutes(params));
    router.use('/commentTemplateType', commentTemplateTypeRoutes(params));
    router.use('/commentType', commentTypeRoutes(params));
    router.use('/customer', customerRoutes(params));
    router.use('/deliverableType', deliverableTypeRoutes(params));
    router.use('/deliverable', deliverableRoutes(params));
    router.use('/dsType', dsTypeRoutes(params));
    router.use('/goal', goalRoutes(params));
    router.use('/goalType', goalTypeRoutes(params));
    router.use('/googleAnalyticPagePath', googleAnalyticPagePathRoutes(params));
    router.use('/googleAnalyticType', googleAnalyticTypeRoutes(params));
    router.use('/googleAnalyticValue', googleAnalyticValueRoutes(params));
    router.use('/moduleType', moduleTypeRoutes(params));
    router.use('/notification', notificationRoutes(params));
    router.use('/notificationApp', notificationAppRoutes(params)); // Original
    router.use('/notificationAppType', notificationAppTypeRoutes(params));
    router.use('/notificationAppUserRead', notificationAppUserReadRoutes(params));
    router.use('/pod', podRoutes(params));
    router.use('/podProject', podProjectRoutes(params));
    router.use('/podUser', podUserRoutes(params));
    router.use('/project', projectRoutes(params));
    router.use('/projectStatus', projectStatusRoutes(params));
    router.use('/role', roleRoutes(params));
    router.use('/task', taskRoutes(params));
    router.use('/taskComment', taskCommentRoutes(params));
    router.use('/template', templateRoutes(params));
    router.use('/templateType', templateTypeRoutes(params));
    router.use('/tenant', tenantRoutes(params));
    router.use('/tenantModule', tenantModuleRoutes(params));
    router.use('/tenantSetting', tenantSettingsRoutes(params));
    router.use('/user', userRoutes(params));
    router.use('/userEmailSetting', userEmailSettingsRoutes(params));
    router.use('/userEmailSettingsType', userEmailSettingsTypeRoutes(params));
    router.use('/userPic', userPicRoutes(params));
    router.use('/userRole', userRoleRoutes(params));
    router.use('/userType', userTypeRoutes(params));

    // Log routes - Create only
    router.use('/logs/exceptionLog', exceptionLogRoutes(params));
    router.use('/logs/requestLog', requestLogRoutes(params));

    // Metric routes - TargetKeyword, TargetKeywordPositioning, TargetPage, TotalKeywordsRanked
    router.use('/metrics', metricRoutes(params));
    router.use('/metrics/custom/targetKeyword', targetKeywordRoutes(params));
    router.use('/metrics/custom/targetKeywordPositioning', targetKeywordPositioningRoutes(params));
    router.use('/metrics/custom/targetPage', targetPageRoutes(params));
    router.use('/metrics/custom/totalKeywordsRanked', totalKeywordsRankedRoutes(params));

    // Cronjob routes
    router.use('/jobs/asanaCommentSync', asanaCommentSyncJobRoutes(params));
    router.use('/jobs/googleAnalyticType/backfill', gaBackfillJobRoutes(params));
    router.use('/jobs/googleAnalyticType', gaTypeJobRoutes(params));
    router.use('/jobs/hubspotCustomer', hubspotCustomerSyncJobRoutes(params));
    router.use('/jobs/targetPagesAndKeywords', targetPagesAndKeywordsJobRoutes(params));
    router.use('/jobs/targetKeywordPositioning/backfill', targetKeywordPositioningBackfillJobRoutes(params));
    router.use('/jobs/targetKeywordPositioning', targetKeywordPositioningJobRoutes(params));
    router.use('/jobs/totalKeywordsRanked/backfill', totalKeywordsRankedBackfillJobRoutes(params));
    router.use('/jobs/totalKeywordsRanked', totalKeywordsRankedJobRoutes(params));
    router.use('/jobs/weeklyEmailJob', weeklyEmailJobRoutes(params));

    // Return the router object
    return router;
};
