const { Op } = require('sequelize');
const uuid = require('uuid').v4;
const db = require('../models');

class UserPicService {
    constructor(log) {
        this.log = log;
    }

    // GetForUser
    async getAllByUserId(userId) {
        const userPics = await db.UserPic.findAll({
            where: {
                UserId: userId,
                [Op.not]: { IsNotifPic: true },
            },
            order: [['OrderNumber', 'ASC']],
        });

        return userPics;
    }

    // GetPictureCountForUser
    async getAllPictureCountByUserId(userId) {
        const userPics = await db.UserPic.findAndCountAll({
            where: {
                UserId: userId,
                [Op.not]: { IsNotifPic: true },
            },
        });

        return userPics.count;
    }

    // GetById
    async getById(id) {
        const userPic = await db.UserPic.findByPk(id);

        return userPic;
    }

    // GetCxpPhotoById
    async getCxpPhotoById(id) {
        const userPic = await db.UserPic.findOne({
            where: {
                Id: id,
                [Op.not]: { IsNotifPic: true },
            },
        });

        return userPic;
    }

    async createUserPic(body) {
        const values = {
            Id: uuid(),
            Location: body.Location,
            IsNotifPic: body.IsNotifPic,
            BackColor: body.BackColor,
            OrderNumber: body.OrderNumber,
            CreatedAt: new Date(),
            ModifiedAt: new Date(),
            CreatedById: body.UserId,
            ModifiedById: body.UserId,
            UserId: body.UserId,
        };
        const newUserPic = await db.UserPic.create(values);

        return newUserPic;
    }

    async updateUserPic(id, body) {
        const userPic = await db.UserPic.findByPk(id);
        let isNotifPic;
        let userId;

        if (body.IsNotifPic || body.IsNotifPic === false) {
            isNotifPic = body.IsNotifPic;
        }
        if (body.UserId) {
            userId = body.UserId;
        }

        const values = {
            Location: body.Location ? body.Location : userPic.Location,
            IsNotifPic: isNotifPic,
            BackColor: body.BackColor ? body.BackColor : userPic.BackColor,
            OrderNumber: body.OrderNumber ? body.OrderNumber : userPic.OrderNumber,
            CreatedAt: userPic.CreatedAt,
            ModifiedAt: new Date(),
            CreatedById: userPic.CreatedById,
            ModifiedById: userId,
            UserId: userId,
        };
        const updateUserPic = await db.UserPic.update(values, {
            where: { Id: id },
            returning: true,
            plain: true,
        });

        return updateUserPic[1].dataValues;
    }

    async deleteUserPic(id) {
        await db.UserPic.destroy({
            where: { Id: id },
        });

        return 'Success';
    }
}

module.exports = UserPicService;
