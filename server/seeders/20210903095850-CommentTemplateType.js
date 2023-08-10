module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('CommentTemplateType', [
            { Id: 1, Name: 'Performance change' },
            { Id: 2, Name: 'Goal updates' },
            { Id: 3, Name: 'Task updates' },
        ], {});
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('CommentTemplateType', null, {});
    },
};
