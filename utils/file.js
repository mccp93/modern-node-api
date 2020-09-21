const multer = require('multer');
const path = require('path');
const fs = require('fs');

multer({ dest: 'uploads/' });

module.exports = (folder) => {
  const fileDestination = `uploads/${folder}`;

  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      try {
        fs.statSync(fileDestination);
      } catch (error) {
        fs.mkdirSync(fileDestination);
      }
      callback(null, fileDestination);
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};
