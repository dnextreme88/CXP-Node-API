require('dotenv').config(); // .env
const fs = require('fs');
const aws = require('aws-sdk');
const config = require('../config/index')[process.env.NODE_ENV || 'development'];

const log = config.log();
const awsRegion = process.env.AWS_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Set config
aws.config.update({
    region: awsRegion,
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
});

const s3 = new aws.S3({ apiVersion: '2006-03-01' }); // Create S3 service object

class AmazonS3Service {
    async uploadFileToS3(file, fileNameS3, bucketName, S3CannedACLaccess) {
        // NOTE: S3CannedACLaccess could be: (can only use one)
        // private, public-read, public-read-write, aws-exec-read, authenticated-read,
        // bucket-owner-read, bucket-owner-full-control, log-delivery-write
        // Configure the file stream and obtain the upload parameters
        const fileStream = fs.createReadStream(file.path);
        fileStream.on('error', (err) => {
            log.error('File error', err);
        });

        // Create upload parameters for S3.upload
        const uploadParams = {
            Bucket: bucketName,
            Key: fileNameS3,
            Body: fileStream,
            ACL: S3CannedACLaccess,
        };

        // Call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                log.error('Error', err);
            }

            if (data) {
                log.info('File uploaded successfully', data.Location);
            }
        });
    }

    async deleteFileS3(key, bucketName) {
        // Create params for S3.deleteBucket
        const deleteParams = { Bucket: bucketName, Key: key };

        // Call S3 to delete the bucket
        s3.deleteBucket(deleteParams, (err, data) => {
            if (err) {
                log.error('Error', err);
            } else {
                log.info('File deleted successfully', data);
            }
        });
    }

    async getPresignedUrlRequest(bucketName, key) {
        const today = new Date();

        const url = s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: key,
            Expires: today.setHours(today.getHours() + 1),
        });

        return url;
    }
}

module.exports = AmazonS3Service;
