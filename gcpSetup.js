const fs = require('fs')

const googleCloudKeyfilePath =
  process.env.NODE_ENV.trim() === 'development'
    ? require('./secrets/google-cloud-storage-keys').GOOGLE_CLOUD_KEYFILE
    : process.env.GOOGLE_CLOUD_KEYFILE

const gcpCredPath =
  process.env.NODE_ENV.trim() === 'development'
    ? require('./secrets/google-key-json-file-content').GCP_CRED
    : process.env.GCP_CRED

fs.writeFile(googleCloudKeyfilePath, gcpCredPath, err => {})
