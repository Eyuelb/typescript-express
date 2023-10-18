import * as dotenv from 'dotenv';
import * as Minio from 'minio';

dotenv.config();


const minioClient = new Minio.Client({
  accessKey: process.env.MINIO_ROOT_USER || '',
  secretKey: process.env.MINIO_ROOT_PASSWORD || '',
  endPoint: process.env.MINIO_ENDPOINT || '', 
  useSSL: false,
  port: 1 * Number(process.env.MINIO_PORT || ''),
});

const bucketName: string = 'testbucket';

async function createBucket(): Promise<void> {
  try {
    console.log(`Creating Bucket: ${bucketName}`);
    await minioClient.makeBucket(bucketName, 'us-east-1').catch((e) => {
      console.log(`Error creating the '${bucketName}' bucket: ${e.message}`);
    });

    // Listing buckets
    const bucketsList = await minioClient.listBuckets();
    console.table(
      `List of Buckets: ${bucketsList
        .map((bucket) => bucket.name)
        .join(',\t')}`
    );
  } catch (error:any) {
    console.log('An error occurred while creating a bucket', error.message);
  }
}

export { createBucket, minioClient, bucketName };
