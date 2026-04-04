const fileFilter = (req, file, cb) => {
  if (
    (file.size < 1024 ** 2 * 10 && file.mimetype === 'image/png') ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('invalid file type, only PNG and JPEG is allowed!'), false);
  }
};

export default fileFilter;
