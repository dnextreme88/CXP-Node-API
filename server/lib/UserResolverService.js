const db = require('../models');
const config = require('../config')[process.env.NODE_ENV || 'development'];
const ProjectService = require('../services/ProjectService');

const projects = new ProjectService(config.log());

class UserResolverService {
    async getUser() {
        const user = await db.User.findByPk('762f9267-0c4a-4745-9673-7272407a32d6');

        return user;
    }

    async getTenantId() {
        const user = await this.getUser();
        const tenant = await db.Tenant.findOne({
            where: { CreatedById: user.Id },
        });

        return tenant.Id;
    }

    async getRole() {
        const user = await this.getUser();
        const userRole = await db.UserRole.findOne({
            where: { UserId: user.Id },
            include: { model: await db.Role },
        });

        return userRole.Role.dataValues;
    }

    async getPodId() {
        const user = await this.getUser();
        const podUser = await db.PodUser.findOne({
            where: { UserId: user.Id },
            include: { model: await db.Pod },
        });

        if (podUser) return podUser.Pod.dataValues.Id;

        return null;
    }

    async getCustomerId() {
        const user = await this.getUser();
        const customer = await db.Customer.findByPk(user.CustomerId);

        return customer.Id;
    }

    async isVictoriousAdmin() {
        const role = await this.getRole();
        if (role.RoleName === 'VictoriousAdmin') return true;

        return false;
    }

    async isVictorious() {
        const role = await this.getRole();
        if (role.RoleName.startsWith('Victorious')) return true;

        return false;
    }

    async isCustomerAdmin() {
        const role = await this.getRole();
        if (role.Name === 'AccountOwner') return true;

        return false;
    }

    async getUserId() {
        const user = await db.User.findByPk('762f9267-0c4a-4745-9673-7272407a32d6');

        return user.Id;
    }

    // CUSTOM
    async userInfo() {
        const user = await this.getUser();
        const userInfo = `${user.FirstName} ${user.LastName} (${user.Email})`;

        return userInfo;
    }

    async isVictoriousAndProjectOwner(projectId) {
        const customerId = await this.getCustomerId();
        const userHasAccess = await projects.checkIfUserHasAccess(projectId, customerId);
        const isVictorious = await this.isVictorious();
        if (isVictorious === false && userHasAccess === false) return false;

        return true;
    }

    async isVictoriousAndProjectCustomer(projectCustomerId) {
        const customerId = await this.getCustomerId();
        const isVictorious = await this.isVictorious();
        if (isVictorious === false && projectCustomerId !== customerId) return false;

        return true;
    }

    async isCustomerAdminOrVictoriousAdmin(userId) {
        const isVictoriousAdmin = await this.isVictoriousAdmin();
        const isCustomerAdmin = await this.isCustomerAdmin();
        const defaultUserId = await this.getUserId();
        if (!(isVictoriousAdmin || isCustomerAdmin) && defaultUserId !== userId) return false;

        return true;
    }
}

module.exports = UserResolverService;
