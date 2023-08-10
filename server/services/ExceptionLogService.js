const db = require('../models');

class ExceptionLogService {
    constructor(log) {
        this.log = log;
    }

    async createExceptionLog(body) {
        const values = {
            RequestTime: new Date(),
            RequestId: body.RequestId,
            AppName: body.AppName,
            Exception: body.Exception,
        };
        const newExceptionLog = await db.ExceptionLog.create(values);

        return newExceptionLog;
    }
}

module.exports = ExceptionLogService;
