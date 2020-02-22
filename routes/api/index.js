const gcsMiddlewares = require('../../middlewares/google-cloud-storage-middleware')
const router = require('express').Router()
const Multer = require('multer')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size is 10MB
  }
})

router.post(
  '/upload',
  multer.single('image'),
  gcsMiddlewares.sendUploadToGCS,
  (req, res, next) => {
    console.log('req file', req.file)

    if (req.file && req.file.gcsUrl) {
      return res.send(req.file.gcsUrl)
    }

    return res.status(500).send('Unable to upload')
  }
)

router.delete(
  '/delete-gcp-img',
  gcsMiddlewares.deleteImgFromGCP,
  (req, res, next) => {
    if (req.body.fileName && req.isSuccess) {
      return res.status(200).send('animals img deleted successfully')
    }

    return res.status(500).send('Unable to delete animal image from gcp')
  }
)

module.exports = router
