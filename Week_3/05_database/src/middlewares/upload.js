import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  console.log(req.file.path);
  await sharp(req.file.path)
    .resize(150, 100)
    .toFile(`${req.file.path}${req.file.filename}_thumb`);
  next();
};

export default createThumbnail;
