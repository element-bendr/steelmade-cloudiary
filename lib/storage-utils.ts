import path from "path";
import { promises as fsPromises } from "fs";

export interface StorageConfig {
  provider: "local" | "cloud";
  basePath?: string;
}

export interface StorageResult {
  url: string;
  key: string;
  size: number;
}

class LocalStorageService {
  private basePath: string;

  constructor() {
    this.basePath = path.join(process.cwd(), "public");
  }

  /**
   * Ensures the directory exists, creates it if it doesn't
   */
  private async ensureDirectory(dirPath: string) {
    try {
      await fsPromises.access(dirPath);
    } catch {
      await fsPromises.mkdir(dirPath, { recursive: true });
    }
  }

  /**
   * Generates a file path for local storage
   */
  private getFilePath(key: string): string {
    return path.join(this.basePath, key);
  }

  /**
   * Generates a URL for accessing the file
   */
  private getFileUrl(key: string): string {
    // Convert Windows path separators to URL format
    const urlPath = key.split(path.sep).join("/");
    return `/${urlPath}`;
  }

  /**
   * Uploads a file to local storage
   */
  async uploadFile(
    file: Buffer,
    key: string
  ): Promise<StorageResult> {
    const filePath = this.getFilePath(key);
    const dirPath = path.dirname(filePath);

    await this.ensureDirectory(dirPath);
    await fsPromises.writeFile(filePath, file);

    return {
      url: this.getFileUrl(key),
      key,
      size: file.length,
    };
  }

  /**
   * Validates that the file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      await fsPromises.access(this.getFilePath(key));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes a file from local storage
   */
  async deleteFile(key: string): Promise<void> {
    const filePath = this.getFilePath(key);
    try {
      await fsPromises.unlink(filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }
}

// Create singleton instance
const localStorageService = new LocalStorageService();

/**
 * Get the appropriate storage service based on environment
 */
export function getStorageService() {
  return process.env.NODE_ENV === "development"
    ? localStorageService
    : null; // Will be replaced with cloud storage in production
}

/**
 * Generate storage key for different image sizes
 */
export function generateStorageKey(
  category: string,
  filename: string,
  size: "original" | "thumbnail" | "medium" | "large"
): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return path.join(
    "images",
    category,
    size,
    `${sanitizedFilename}-${timestamp}.webp`
  );
}

/**
 * Validates file type and size
 */
export function validateFile(contentType: string, size: number): boolean {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];
  const maxSize = 10485760; // 10MB

  return allowedTypes.includes(contentType) && size <= maxSize;
}
