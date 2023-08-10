require('dotenv').config(); // .env

// AWS
const imageBucket = process.env.AWS_S3_BUCKET_IMAGES;
const contractBucket = process.env.AWS_S3_BUCKET_CONTRACTS;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;

const webBaseUrl = process.env.WEB_BASE_URL;

class ConstantsService {
    async getBaseUrlPlaceholder() {
        return '{baseUrl}';
    }

    async getUserNamePlaceholder() {
        return '{userName}';
    }

    async getTaskNamePlaceholder() {
        return '{TASK_NAME}';
    }

    async getAssigneePlaceholder() {
        return '{ASSIGNEE}';
    }

    async getContentPlaceholder() {
        return '{content}';
    }

    async getProjectIdPlaceholder() {
        return '{projectId}';
    }

    async getLandingPage() {
        return '{landingPage}';
    }

    async getLogoLocation() {
        const baseUrlPlaceholder = this.getBaseUrlPlaceholder();
        const logoLocation = `${baseUrlPlaceholder}/avatar-placeholder.png`;

        return logoLocation;
    }

    // CUSTOM
    async getNotificationGuidPlaceholder() {
        return '{notificationGuid}';
    }

    async getUserEmailPlaceholder() {
        return '{userEmail}';
    }

    // .env variables
    // -- AWS
    async getImageBucket() {
        return imageBucket;
    }

    async getContractBucket() {
        return contractBucket;
    }

    async getAwsAccessKeyId() {
        return awsAccessKeyId;
    }

    async getAwsSecretAccessKey() {
        return awsSecretAccessKey;
    }

    async getAwsRegion() {
        return awsRegion;
    }

    // -- MISC
    async getWebBaseUrl() {
        return webBaseUrl;
    }
}

module.exports = ConstantsService;
