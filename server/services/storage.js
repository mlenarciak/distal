import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { join } from 'path';
import fs from 'fs/promises';

const LOCAL_STORAGE_PATH = join(process.cwd(), 'uploads');

// Initialize storage
const initStorage = async () => {
  // Ensure local storage directory exists
  await fs.mkdir(LOCAL_STORAGE_PATH, { recursive: true });
};

// Initialize S3 client if credentials are available
const s3Client = process.env.AWS_ACCESS_KEY_ID ? new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}) : null;

export const storeFile = async (file, jobId, deliverableId) => {
  await initStorage();
  const fileName = `${jobId}/${deliverableId}/${file.originalname}`;

  if (s3Client) {
    // Store in S3
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    }));

    return {
      storageType: 's3',
      storagePath: fileName
    };
  } else {
    // Store locally
    const localPath = join(LOCAL_STORAGE_PATH, fileName);
    await fs.mkdir(join(LOCAL_STORAGE_PATH, jobId, deliverableId), { recursive: true });
    await fs.writeFile(localPath, file.buffer);

    return {
      storageType: 'local',
      storagePath: fileName
    };
  }
};

export const getFileStream = async (storagePath, storageType) => {
  if (storageType === 's3' && s3Client) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: storagePath
    });
    const response = await s3Client.send(command);
    return response.Body;
  } else {
    const localPath = join(LOCAL_STORAGE_PATH, storagePath);
    return fs.createReadStream(localPath);
  }
};