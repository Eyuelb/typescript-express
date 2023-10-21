import * as Minio from 'minio';
const bucketName: string = 'testbucket';

const endPointUrl = `http://${process.env['MINIO_ENDPOINT'] || ''}:${parseInt((process.env['MINIO_PORT']) ? process.env['MINIO_PORT'] : "9000")}`

const minioStoreConfig = {
  partSize: 8 * 1024 * 1024, // Each uploaded part will have ~8MB,
  bucket: bucketName,
  accessKeyId: process.env['MINIO_ROOT_USER'] || '',
  secretAccessKey: process.env['MINIO_ROOT_PASSWORD'] || '',
  endpoint: endPointUrl,
  s3ForcePathStyle: true,
  // signatureVersion: 'v2',
};

const minioClient = new Minio.Client({
  accessKey: process.env['MINIO_ROOT_USER'] || '',
  secretKey: process.env['MINIO_ROOT_PASSWORD'] || '',
  endPoint: process.env['MINIO_ENDPOINT'] || '', 
  useSSL: false,
  port: parseInt((process.env['MINIO_PORT']) ? process.env['MINIO_PORT'] : "9000"),
});


async function createBucket(): Promise<void> {
  try {
    console.log("================================================");
    console.log(`MinioLog: Creating Bucket: ${bucketName}`);
    console.log("================================================");
    await minioClient.makeBucket(bucketName, '').catch((e) => {
      console.log(`MinioLog: '${bucketName}': ${e.message}`);
    });

    // Listing buckets
    const bucketsList = await minioClient.listBuckets();
    console.log("================================================");
    console.table(
      `List of Buckets: ${bucketsList
        .map((bucket) => bucket.name)
        .join(',\t')}`
    );
  } catch (error:any) {
    console.log("================================================");
    console.log("MinioLog: "+error.message);
  }
}

async function configureBucketNotifications(): Promise<void> {
  try {
    // Create a new NotificationConfig object
    const notificationConfig = new Minio.NotificationConfig();

    // Create a QueueConfig with the SQS ARN
    const queueConfig = new Minio.QueueConfig('arn:minio:sqs::MinioToPostgreSQLEventDestination:postgresql');

    // Set the Id for the QueueConfig
    queueConfig.setId('unique-queue-id');

    // Add an event to the QueueConfig
    queueConfig.addEvent('s3:ObjectCreated:*');

    // Add the QueueConfig to the NotificationConfig
    notificationConfig.add(queueConfig);

    // Set the notification configuration for the bucket
    await minioClient.setBucketNotification(bucketName, notificationConfig);

    console.log("================================================");
    console.log('MinioLog: Bucket notifications configured successfully.');

  } catch (error: any) {
    console.error('Error configuring bucket notifications:', error.message);
  }
}

// Call the function to configure bucket notifications
// configureBucketNotifications();






export { createBucket,configureBucketNotifications, minioClient, bucketName,minioStoreConfig };
