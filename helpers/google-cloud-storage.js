const GoogleCloudStorage = require('@google-cloud/storage')

//const GOOGLE_CLOUD_PROJECT_ID = 'gcs-demo-123456' // Replace with your project ID
//const GOOGLE_CLOUD_KEYFILE = 'path-to-the-private-key' // Replace with the path to the downloaded private key
const {
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_CLOUD_KEYFILE
} = require('../secrets/google-cloud-storage-keys')

const storage = GoogleCloudStorage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE
})
