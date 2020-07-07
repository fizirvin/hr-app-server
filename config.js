import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    api: {
        port: process.env.PORT || 3001
    },
    database: {
        url: process.env.DATABASE_URL
    },
    awsconfig: {
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY_ID,
        region: process.env.REGION,
        bucket: process.env.BUCKET
    }
}