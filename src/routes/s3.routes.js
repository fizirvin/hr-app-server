import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { Router } from 'express'; 
import { awsconfig } from '../config.js';

const secretAccessKey = awsconfig.secretAccessKey
const accessKeyId = awsconfig.accessKeyId
const region = awsconfig.region
const bucket = aws.config.bucket

const router = new Router();
 
aws.config.update({
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region:region
});



const s3 = new aws.S3()

const storage = multerS3({
  s3: s3,
  bucket: bucket,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, {fieldName: 'testing'});
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString())
  }
})


export const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only png, jpg, jpeg') , false);
    }
};

 
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: fileFilter
}).single('image');


router.post('/image-upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        err.message = 'The file is so heavy for my service';
        return res.send(err);
    }
        console.log(req.file);
        return res.json({'imageUrl': req.file.location})
    });
});



 
module.exports = router;