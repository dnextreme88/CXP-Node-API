const db = require('../models');

class RequestLogService {
    constructor(log) {
        this.log = log;
    }

    async createRequestLog(body) {
        const values = {
            RequestTime: new Date(),
            RequestId: body.RequestId,
            AppName: body.AppName,
            JsonRequest: body.JsonRequest,
        };
        const newRequestLog = await db.RequestLog.create(values);

        return newRequestLog;
    }
}

module.exports = RequestLogService;
