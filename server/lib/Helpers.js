class Helpers {
    isValidPositiveInteger(stringValue) {
        // Parse the passed string value as int
        const parsedInt = parseInt(stringValue, 10);
        const convertToString = parsedInt.toString();

        // Check if the parsed int converted to string is equal to its original string
        const isParsedStringEqualToOriginal = convertToString === stringValue;

        if (isParsedStringEqualToOriginal === true && parsedInt > 0) return true;

        return false;
    }

    addErrorMessages(field) {
        const suffix = 'not found';
        let errorMessage;

        // AssigneeId (Task model) and MainContactId (Project model) = UserId
        if (field === 'AsanaDeliverableTypeId') {
            errorMessage = `Asana deliverable type id ${suffix}`;
        } else if (field === 'CommentId') {
            errorMessage = `Comment id ${suffix}`;
        } else if (field === 'CommentTemplateId') {
            errorMessage = `Comment template id ${suffix}`;
        } else if (field === 'CommentTemplateTypeId') {
            errorMessage = `Comment template type id ${suffix}`;
        } else if (field === 'CommentTypeId') {
            errorMessage = `Comment type id ${suffix}`;
        } else if (field === 'CustomerId') {
            errorMessage = `Customer id ${suffix}`;
        } else if (field === 'DeliverableTypeId') {
            errorMessage = `Deliverable type id ${suffix}`;
        } else if (field === 'DsTypeId') {
            errorMessage = `Ds type id ${suffix}`;
        } else if (field === 'GoalId') {
            errorMessage = `Goal id ${suffix}`;
        } else if (field === 'GoalTypeId') {
            errorMessage = `Goal type id ${suffix}`;
        } else if (field === 'GoogleAnalyticTypeId') {
            errorMessage = `Google analytic type id ${suffix}`;
        } else if (field === 'ModuleTypeId') {
            errorMessage = `Module type id ${suffix}`;
        } else if (field === 'NotificationAppId') {
            errorMessage = `Notification app id ${suffix}`;
        } else if (field === 'NotificationAppTypeId') {
            errorMessage = `Notification app type id ${suffix}`;
        } else if (field === 'ProjectId') {
            errorMessage = `Project id ${suffix}`;
        } else if (field === 'ProjectStatusId') {
            errorMessage = `Project status id ${suffix}`;
        } else if (field === 'PodId') {
            errorMessage = `Pod id ${suffix}`;
        } else if (field === 'RoleId') {
            errorMessage = `Role id ${suffix}`;
        } else if (field === 'TargetKeywordId') {
            errorMessage = `Target keyword id ${suffix}`;
        } else if (field === 'TargetPageId') {
            errorMessage = `Target page id ${suffix}`;
        } else if (field === 'TaskId') {
            errorMessage = `Task id ${suffix}`;
        } else if (field === 'TemplateId') {
            errorMessage = `Template id ${suffix}`;
        } else if (field === 'TemplateTypeId') {
            errorMessage = `Template type id ${suffix}`;
        } else if (field === 'TenantId') {
            errorMessage = `Tenant id ${suffix}`;
        } else if (field === 'UserId') {
            errorMessage = `User id ${suffix}`;
        } else if (field === 'UserEmailSettingsTypeId') {
            errorMessage = `User email settings type id ${suffix}`;
        } else if (field === 'UserTypeId') {
            errorMessage = `User type id ${suffix}`;
        }

        return errorMessage;
    }

    parseToDateStringYYYYMMDD(dateStringWithTimezone) {
        // REF: https://stackoverflow.com/a/35413963
        const dateString = dateStringWithTimezone.split('T')[0]; // eg. 2021-12-08
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false; // Invalid date format YYYY-MM-DD

        const d = new Date(dateString);
        const dNum = d.getTime(); // Epoch eg. 1638921600000
        if (!dNum && dNum !== 0) return false;

        return d.toISOString().split('T')[0]; // or d.toISOString().slice(0, 10)
    }

    dateLessFromToday(numberOfDaysToDeduct, withTimezone = false) {
        const today = new Date();
        const epoch = today.setDate(today.getDate() - numberOfDaysToDeduct);
        // eg. 2021-12-02
        let dateLessFromCurrentDate = new Date(epoch).toISOString().split('T')[0];

        // eg. 2021-12-02T06:27:31.950Z
        if (withTimezone) dateLessFromCurrentDate = new Date(epoch).toISOString();

        return dateLessFromCurrentDate;
    }

    dateGreaterFromToday(numberOfDaysToAdd, withTimezone = false) {
        const today = new Date();
        const epoch = today.setDate(today.getDate() + numberOfDaysToAdd);
        // eg. 2021-12-02
        let dateLessFromCurrentDate = new Date(epoch).toISOString().split('T')[0];

        // eg. 2021-12-02T06:27:31.950Z
        if (withTimezone) dateLessFromCurrentDate = new Date(epoch).toISOString();

        return dateLessFromCurrentDate;
    }
}

module.exports = Helpers;
