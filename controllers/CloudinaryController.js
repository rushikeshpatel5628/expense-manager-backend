const cloudinary = require("cloudinary").v2;

const uploadImage = async (file) => {
  cloudinary.config({
    cloud_name: "dkwrhfiuw",
    api_key: "458297586322389",
    api_secret: "5Nr3M6QoyEOk9E5rPBoxKLWKoh0",
  });

  const result = await cloudinary.uploader.upload(file);
  return result;
};

module.exports = {
    uploadImage
};