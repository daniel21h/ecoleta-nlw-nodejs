import multer from 'multer';
import path from 'path';
import crypto from 'crypto'; // Native Node.js

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file, callback) {

      // Generating hash and passing the amount of bytes / amount of random hash characters
      const hash = crypto.randomBytes(6).toString('hex');

      const filename = `${hash}-${file.originalname}`;

      callback(null, filename);
    }
  }),
};