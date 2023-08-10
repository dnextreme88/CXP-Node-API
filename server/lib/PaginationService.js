class PaginationService {
    async toPagedList(list, pageNumber, startIndex, endIndex, limit, totalCount) {
        const page = parseInt(pageNumber, 10);
        const perPage = parseInt(limit, 10);
        let previousPage;
        let nextPage;

        // Check if there's a previous page
        if (startIndex > 0) previousPage = page - 1;
        // Check if there's a next page
        if (endIndex < totalCount) nextPage = page + 1;

        return {
            currentPage: page,
            previousPage,
            nextPage,
            limit: perPage,
            total: totalCount,
            results: list,
        };
    }

    async orderByParams(modelName, orderBy, direction = 'DESC') {
        let orderByQuery;

        if (modelName === 'customer') {
            switch (orderBy) {
                case 'Id':
                    orderByQuery = ` ORDER BY "Id" ${direction}`;
                    break;
                default:
                    orderByQuery = ` ORDER BY "CreatedAt" ${direction}`;
                    break;
            }
        } else if (modelName === 'comment') {
            switch (orderBy) {
                case 'Position':
                    orderByQuery = ` ORDER BY "CommentType"."Name" ${direction}`;
                    break;
                case 'PublishedBy':
                    orderByQuery = ` ORDER BY "User"."LastName" ${direction}`;
                    break;
                case 'Title':
                    orderByQuery = ` ORDER BY "Title" ${direction}`;
                    break;
                case 'Date':
                    orderByQuery = ` ORDER BY "ModifiedAt" ${direction}`;
                    break;
                default:
                    orderByQuery = ` ORDER BY "Id" ${direction}`;
                    break;
            }
        } else if (modelName === 'project') {
            switch (orderBy) {
                case 'Status':
                    orderByQuery = ` ORDER BY "ProjectStatusId" ${direction}`;
                    break;
                case 'LastReview':
                    orderByQuery = ` ORDER BY "ModifiedAt" ${direction}`;
                    break;
                case 'MainContact':
                    orderByQuery = ` ORDER BY "User"."LastName" ${direction}`;
                    break;
                case 'Name':
                    orderByQuery = ` ORDER BY "Name" ${direction}`;
                    break;
                case 'CustomerName':
                    orderByQuery = ` ORDER BY "Customer"."Name" ${direction}`;
                    break;
                default:
                    orderByQuery = ` ORDER BY "Id" ${direction}`;
                    break;
            }
        }

        return orderByQuery;
    }

    async pageByPagingParams(take, skip) {
        const limitOffsetQuery = ` LIMIT ${take} OFFSET ${skip}`;

        return limitOffsetQuery;
    }
}

module.exports = PaginationService;
