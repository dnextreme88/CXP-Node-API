/* eslint-disable object-shorthand */
/* eslint-disable arrow-parens */
/* eslint-disable no-await-in-loop */
const asana = require('asana');

class AsanaService {
    constructor(token) {
        this.token = token;
    }

    async createClient() {
        // Remove Asana warning for deprecated functions, such as the Asana api route under
        // addSubtask function
        const client = asana.Client.create({
            defaultHeaders: { 'asana-enable': 'new_user_task_lists' },
        }).useAccessToken(this.token);

        return client;
    }

    async getUsersByEmail(email, workspaceGid) { // GET /workspaces/{workspace_gid}/typeahead
        // ASANA_WORKSPACE_GID = '117246870784855';
        const client = await this.createClient();
        const asanaResponse = client.workspaces.typeahead(workspaceGid, {
            resource_type: 'user',
            query: email,
            opt_fields: 'email,role,photo,about_me',
        })
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    statusCode: e.status,
                    error: true,
                };
            });

        return asanaResponse;
    }

    async getProjectById(projectGid) { // GET /projects/{project_gid}
        const optFields = 'name,sections,sections.name,team.name,owner.name,created_at,archived';

        const client = await this.createClient();
        const asanaResponse = client.projects.findById(projectGid, { opt_fields: optFields })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    async markTaskCompleted(task) { // PUT /tasks/{task_gid}
        const client = await this.createClient();
        const asanaResponse = client.tasks.update(task, { completed: true })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    async moveTaskToSection(section, task) { // POST /sections/{section_gid}/addTask
        const client = await this.createClient();
        const asanaResponse = client.sections.addTask(section, { task: task })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    async addSubtask(task, name, assignee) { // POST /tasks/{task_gid}/subtasks
        const client = await this.createClient();
        const asanaResponse = client.tasks.createSubtaskForTask(task, {
            name: name,
            assignee: assignee,
        })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    async approveTask(task, needsApprovalField) { // PUT /tasks/{task_gid}
        const customFieldsObj = {};
        // eg. { '1199951165136342': null } where 1199951165136342 is the custom field GID
        customFieldsObj[needsApprovalField] = null;

        const client = await this.createClient();
        const asanaResponse = client.tasks.update(task, {
            completed: true,
            custom_fields: customFieldsObj,
        })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    async taskFeedbackSent(task, needsApprovalField) { // PUT /tasks/{task_gid}
        const customFieldsObj = {};
        // eg. { '1199951165136342': null } where 1199951165136342 is the custom field GID
        customFieldsObj[needsApprovalField] = null;

        const client = await this.createClient();
        const asanaResponse = client.tasks.update(task, { custom_fields: customFieldsObj })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    // Used for cronjob
    async getStoriesForTask(task) { // GET /tasks/{task_gid}/stories
        const optFields = 'name,text,resource_subtype,created_by.email,created_at';

        const client = await this.createClient();
        const asanaResponse = client.tasks.stories(task, { opt_fields: optFields })
            .then(res => {
                // console.log(res);
                return res;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }

    // CUSTOM
    async getTasksBySection(sectionGid) { // GET /sections/{section_gid}/tasks
        const optFields = 'completed,attachments.created_by.email,assignee.email,attachments.download_url,attachments.created_at,attachments.view_url,attachments.name,attachments.permanent_url,attachments.host,name,due_on,memberships.project,memberships.section.name,custom_fields,custom_fields.text_value,custom_fields.enum_value';

        const client = await this.createClient();
        const asanaResponse = client.tasks.findBySection(sectionGid, { opt_fields: optFields })
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(e => {
                console.log('ASANA ERROR:', e);

                return {
                    message: e.value.errors[0].message,
                    error: true,
                    statusCode: e.status,
                };
            });

        return asanaResponse;
    }
}

module.exports = AsanaService;
