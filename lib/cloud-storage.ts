import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { StorageResult } from "./storage-utils";

class CloudStorageService {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
    this.bucket = process.env.AWS_BUCKET_NAME || "";
  }

  /**
   * Uploads a file to cloud storage
   */
  async uploadFile(
    file: Buffer,
    key: string,
    contentType: string
  ): Promise<StorageResult> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    try {
      await this.s3Client.send(command);
      const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 }); // 1 hour expiry

      return {
        url,
        key,
        size: file.length,
      };
    } catch (error) {
      console.error("Error uploading to cloud storage:", error);
      throw new Error("Failed to upload file to cloud storage");
    }
  }

  /**
   * Validates that the file exists in the bucket
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes a file from cloud storage
   */
  async deleteFile(key: string): Promise<void> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
    } catch (error) {
      console.error("Error deleting from cloud storage:", error);
      throw new Error("Failed to delete file from cloud storage");
    }
  }
}

// Create singleton instance
const cloudStorageService = new CloudStorageService();

export { cloudStorageService };
