import { randomBytes } from "crypto";
import { writeFile } from "fs/promises";
import mime from "mime";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No files found.",
    });
  }

  const file = files[0];
  const fileName = createRandomFileName(file.type!);

  try {
    await writeFile(`./public/${fileName}`, file.data);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Something went wrong while storing the file. Please try again.",
    });
  }

  const url = getRequestURL(event);
  return `${url.origin}/${fileName}`;
});

const createRandomFileName = (mimeType: string) => {
  const randomText = randomBytes(Math.ceil(10 / 2))
    .toString("hex")
    .slice(0, 10);

  const timestamp = Date.now();
  const fileExtension = getFileExtensionFromMimeType(mimeType);

  return `${randomText}_${timestamp}.${fileExtension}`;
};

const getFileExtensionFromMimeType = (mimeType: string) => {
  const extension = mime.getExtension(mimeType);
  return extension ? `.${extension}` : null;
};
