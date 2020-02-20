const { Storage } = require('@google-cloud/storage')

const GOOGLE_CLOUD_PROJECT_ID =
  process.env.NODE_ENV.trim() === 'development'
    ? require('../secrets/google-cloud-storage-keys').GOOGLE_CLOUD_PROJECT_ID
    : process.env.GOOGLE_CLOUD_PROJECT_ID

const GOOGLE_CLOUD_KEYFILE =
  process.env.NODE_ENV.trim() === 'development'
    ? require('../secrets/google-cloud-storage-keys').GOOGLE_CLOUD_KEYFILE
    : process.env.GOOGLE_CLOUD_KEYFILE

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE
})

//  * Get public URL of a file. The file must have public access
//  * @param {string} bucketName
//  * @param {string} fileName
//  * @return {string}

exports.getPublicUrl = (bucketName, fileName) =>
  `https://storage.googleapis.com/${bucketName}/${fileName}`

exports.storage = storage
