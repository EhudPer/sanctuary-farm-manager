const gcsHelpers = require('../helpers/google-cloud-storage')

const { storage } = gcsHelpers

const DEFAULT_BUCKET_NAME =
  process.env.NODE_ENV.trim() === 'development'
    ? require('../secrets/google-cloud-storage-keys').DEFAULT_BUCKET_NAME
    : process.env.DEFAULT_BUCKET_NAME

//  * Middleware for uploading file to GCS.
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  * @return {*}

exports.sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME
  const bucket = storage.bucket(bucketName)
  const gcsFileName = `${Date.now()}-${req.file.originalname}`
  const file = bucket.file(gcsFileName)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', err => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName

    return file.makePublic().then(() => {
      req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName)
      next()
    })
  })

  stream.end(req.file.buffer)
}

exports.deleteImgFromGCP = (req, res, next) => {
  if (!req.body.fileName) {
    return next()
  }

  const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME
  const bucket = storage.bucket(bucketName)
  const gcsFileName = req.body.fileName
  const file = bucket.file(gcsFileName)

  file.delete(function(err, apiResponse) {
    if (!err) {
      req.isSuccess = true
    }
    return next()
  })
}
