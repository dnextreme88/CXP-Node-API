const uuid = require('uuid').v4;
const { Op } = require('sequelize');
const db = require('../models');

class NotificationService {
    constructor(log) {
        this.log = log;
    }

    // GetById
    async getById(id) {
        const notification = await db.Notification.findByPk(id);

        return notification;
    }

    // GetByNotificationGuid && GetUserByNotificationGuid (from DalUser.cs)
    async getByNotificationGuid(notificationGuid) {
        const notification = await db.Notification.findOne({
            where: {
                NotificationGuid: notificationGuid,
                ValidTill: { [Op.gte]: new Date() },
            },
            include: { model: await db.User },
        });

        return notification;
    }

    // GetByUserAndTemplate
    async getByTemplateTypeIdAndUserId(templateTypeId, userId) {
        const notification = await db.Notification.findOne({
            where: {
                TemplateTypeId: templateTypeId,
                UserId: userId,
            },
        });

        return notification;
    }

    async createNotification(body) {
        const values = {
            Id: uuid(),
            Subject: body.Subject,
            From: body.From,
            To: body.To,
            Message: body.Message,
            NotificationGuid: uuid(),
            ValidTill: body.ValidTill,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CreatedById: body.CreatedById ? body.CreatedById : null,
            ModifiedById: body.ModifiedById ? body.ModifiedById : null,
            TemplateTypeId: body.TemplateTypeId,
            TemplateId: body.TemplateId,
            UserId: body.UserId ? body.UserId : null,
        };
        const newNotification = await db.Notification.create(values);

        return newNotification;
    }

    async updateNotification(id, body) {
        const notification = await db.Notification.findByPk(id);
        let templateTypeId;
        let templateId;
        let userId;

        if (body.TemplateTypeId) {
            templateTypeId = body.TemplateTypeId;
        }
        if (body.TemplateId) {
            templateId = body.TemplateId;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Subject: body.Subject ? body.Subject : notification.Subject,
            From: body.From ? body.From : notification.From,
            To: body.To ? body.To : notification.To,
            Message: body.Message ? body.Message : notification.Message,
            NotificationGuid: notification.notificationGuid,
            ValidTill: body.ValidTill ? body.ValidTill : notification.ValidTill,
            CreatedAt: notification.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: notification.CreatedById,
            ModifiedById: userId,
            TemplateTypeId: templateTypeId,
            TemplateId: templateId,
            UserId: userId,
        };
        const updateNotification = await db.Notification.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateNotification[1].dataValues;
    }

    async deleteNotification(id) {
        await db.Notification.destroy({
            where: { Id: id },
        });

        return 'Success';
    }

    // CUSTOM, used in cronjob
    async formatNotification(date, title, description, imageLocation) {
        const notif = `<div style=""background-color:transparent;"">
            <div class=""block-grid"" style=""min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"">
            <div style=""border-collapse: collapse;display: table;width: 100%;background-color:transparent;"">
            <!--[if (mso)|(IE)]><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background-color:transparent;""><tr><td align=""center""><table cellpadding=""0"" cellspacing=""0"" border=""0"" style=""width:500px""><tr class=""layout-full-width"" style=""background-color:transparent""><![endif]-->
            <!--[if (mso)|(IE)]><td align=""center"" width=""500"" style=""background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"" valign=""top""><table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0""><tr><td style=""padding-right: 0px; padding-left: 10px; padding-top:5px; padding-bottom:5px;""><![endif]-->
            <div class=""col num12"" style=""min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"">
            <div class=""col_cont"" style=""width:100% !important;"">
            <!--[if (!mso)&(!IE)]><!-->
            <div style=""border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 10px;"">
            <!--<![endif]-->
            <div style=""font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif"">
            <div class=""comment-wrapper"" style=""border: 1px solid #F0F0ED;border-radius: 8px; line-height: 185%;"">
            <table style=""width: 100%; margin-top: 15px; margin-bottom: 15px;"">
            <tr>
            <td rowspan=""3"" style=""width: 3em; padding-left: 15px;"">
            <div class=""image-crop"" style=""width: 3em; height: 3em; position: relative; overflow: hidden; border-radius: 50%"">
                <img alt=""Victorious"" src=""{imageSource}"" style=""display: inline; margin: 0 auto; height: 100%; width: auto;""/>
            </div>
            </td>
            <td style=""text-align: left; color: #BCBCBC; padding-left: 15px;"">{date}</td>
            </tr>
            <tr>
            <td style=""text-align: left; padding-left: 15px;""><b>{title}</b></td>
            </tr>
            <tr>
            <td style=""text-align: left; padding-left: 15px;"">{description}</td>
            </tr>
            </table>
            </div>
            </div>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>`;

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dddd = daysOfWeek[date.getDay()]; // Name of day of the week based on array above
        const dd = date.getDate(); // 0 - 31, dates of a month

        return notif
            .replaceAll('{date}', `${dddd} ${dd}`)
            .replaceAll('{title}', title)
            .replaceAll('{imageSource}', imageLocation)
            .replaceAll('{description}', description);
    }

    // TODO: UpdateAsync not implemented, may just have to call updateNotification function to
    // set the ValidTill field.
}

module.exports = NotificationService;
