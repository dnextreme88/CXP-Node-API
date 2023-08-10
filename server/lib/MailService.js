const nodemailer = require('nodemailer');
const config = require('../config/index')[process.env.NODE_ENV || 'development'];
const TenantSettingsService = require('../services/TenantSettingsService');

const log = config.log();
const tenantSettings = new TenantSettingsService(log);

class MailService {
    async sendMail(fromShortname, to, body, subject) {
        const allEmailSettings = await tenantSettings.getAllSmtpSettings();
        const emailSettings = {};

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

        let isSecure; // true for 465, false for other ports

        if (emailSettings.Port === 465) {
            isSecure = true;
        } else {
            isSecure = false;
        }

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // const testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        const transporter = await nodemailer.createTransport({
            host: emailSettings.Host,
            port: emailSettings.Port,
            secure: isSecure,
            auth: {
                user: emailSettings.Username, // use testAccount.user for testing
                pass: emailSettings.Password, // use testAccount.pass for testing
            },
        });

        // TODO: logic for attachments with require('fs')

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"${fromShortname}" <${emailSettings.Username}>`, // Sender address
            to, // List of receivers
            subject, // Subject line
            text: body, // Plain text body
            html: `<b>${body}</b>`, // HTML body
        });
        log.info('Message sent: %s', info.messageId);

        // Preview only available when sending through an Ethereal account
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // log.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return 'Email sent to recipient';
    }
}

module.exports = MailService;
