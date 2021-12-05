const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3({
    accessKeyId: process.env.S3_KEYID, // keyID 입력
    secretAccessKey: process.env.S3_PRIVATE_KEY, // 시크릿 키 입력
    region: process.env.REGION, // 버킷 생성 리전 입력
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'bucket-owner-full-control',
        key: (req, file, cb) => {
            cb(null, `test/${Date.now()}_${file.originalname}`);
        },
    }),
});

module.exports = upload;
