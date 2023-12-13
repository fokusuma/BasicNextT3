import { GridFSBucket, MongoClient } from "mongodb";
import { Readable } from "stream";

// Create a MongoDB client
const client = new MongoClient(process.env.DATABASE_URL ?? "");

// Connect to the MongoDB client
await client.connect();

// Get the database
const db = client.db("bookstore");

export async function storeImageInGridFS(
  image: Buffer,
  bucketName: string,
): Promise<string> {
  // Get the GridFS bucket
  const bucket = new GridFSBucket(db, {
    bucketName,
  });

  // Generate a unique filename for the image
  const filename = `${Date.now()}-image`;

  // Create a GridFS upload stream
  const uploadStream = bucket.openUploadStream(filename);

  // Convert Buffer to Readable Stream
  const readableImageStream = new Readable();
  readableImageStream.push(image);
  readableImageStream.push(null);

  return new Promise<string>((resolve, reject) => {
    // Pipe the image stream into the upload stream
    readableImageStream.pipe(uploadStream);

    // Wait for the upload to finish
    uploadStream.on("finish", () => resolve(filename));
    uploadStream.on("error", reject);
  });
}
