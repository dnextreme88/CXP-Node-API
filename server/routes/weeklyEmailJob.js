/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
const express = require('express');
require('dotenv').config();
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const ApiResponse = require('../lib/ApiResponse');
const ConstantsService = require('../lib/ConstantsService');
const MailService = require('../lib/MailService');

const formatOut = bformat({ outputMode: 'short' });
const logger = bunyan.createLogger({ name: 'weeklyEmailJob', stream: formatOut, level: 'info' });

const router = express.Router();

module.exports = (params) => {
    const { customers, notifications, notificationApps, templates, tenantSettings, users } = params;
    const api = new ApiResponse();
    const constants = new ConstantsService();
    const mail = new MailService();

    router.post('/doIt', async (request, response, next) => {
        try {
            const emailSettings = {};
            const allEmailSettings = await tenantSettings.getAllSmtpSettings();
            for (let i = 0; i < allEmailSettings.length; i++) {
                if (allEmailSettings[i].Name === 'SMTP_USERNAME') {
                    emailSettings.Username = allEmailSettings[i].Val1;
                }
                if (allEmailSettings[i].Name === 'SMTP_PASSWORD') {
                    emailSettings.Password = allEmailSettings[i].Val1;
                }
                if (allEmailSettings[i].Name === 'SMTP_HOST') {
                    emailSettings.Host = allEmailSettings[i].Val1;
                }
                if (allEmailSettings[i].Name === 'SMTP_PORT') {
                    emailSettings.Port = allEmailSettings[i].Val1;
                }
            }

            const fromShortname = 'Victorious App';

            // TemplateTypeId: 10 = Monday update
            const template = await templates.getByTemplateTypeId(10);

            let skip = 0;
            while (true) {
                const customer = await customers.getForWeeklyEmail(skip);
                if (customer === null) break;

                skip++;

                const allUsers = await users.getAllForWeeklyEmail(customer.Id);
                const allNotifications = await notificationApps.getAllForWeek(customer.Id);

                if (!allUsers.length > 0 && !allNotifications.length > 0) continue;

                logger.info('Processing format notifications...');
                let imageLocation = '';
                let formatNotification = '';
                for (let i = 0; i < allNotifications.length; i++) {
                    const { CreatedAt, Title, Description } = allNotifications[i];
                    imageLocation = await constants.getWebBaseUrl();
                    formatNotification = await notifications.formatNotification(
                        CreatedAt, Title, Description, imageLocation,
                    );
                }

                logger.info('Concatenating...');
                const content = formatNotification.concat('');
                const bodyHtml = template.Template
                    .replaceAll(await constants.getContentPlaceholder(), content)
                    .replaceAll(await constants.getBaseUrlPlaceholder(), imageLocation);

                for (let j = 0; j < allUsers.length; j++) {
                    try {
                        const body = bodyHtml
                            .replaceAll(await constants.getUserNamePlaceholder(), allUsers[j].FirstName)
                            .replaceAll(await constants.getUserEmailPlaceholder(), allUsers[j].Email);
                        await mail.sendMail(fromShortname, allUsers[j].Email, body, 'Your Weekly Update');
                    } catch (e) {
                        logger.info('An exception was caught...');
                        logger.fatal(e);
                        return next(e);
                    }
                }
            }
            return response.json(api.success(null, 'Weekly monday email update'));
        } catch (e) {
            logger.info('An exception was caught...');
            logger.fatal(e);
            return next(e);
        }
    });

    return router;
};
