import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'D:/sofra/sofra/uploads/images');
  },
  filename: function (req: any, file: any, cb: any) {
    const extname = path.extname(file.originalname);
    const filename = Date.now() + extname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req: any, file: any, cb: any) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

export default upload;
