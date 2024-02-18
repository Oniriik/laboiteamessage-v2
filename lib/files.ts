const B2 = require('backblaze-b2');

interface UploadResponse {
  fileId: string;
  fileName: string;
  url: string;
}

const upload = async (buffer: Buffer, fileName: string): Promise<UploadResponse> => {
  const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID || '',
    applicationKey: process.env.B2_APPLICATION_KEY || '',
  });

  try {
    await b2.authorize();

    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID || '',
    });

    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName,
      data: buffer,
      mime: 'image/png', // Adjust MIME type based on your image format
    });

    return {
      fileId: uploadResponse.data.fileId,
      fileName: uploadResponse.data.fileName,
      url: `https://loveletter-dev.s3.us-east-005.backblazeb2.com/${uploadResponse.data.fileName}`,

    };
  } catch (error) {
    console.error('Error during B2 upload:', error);
    throw new Error('Failed to upload image to B2.');
  }
};

export default {
  upload,
};
