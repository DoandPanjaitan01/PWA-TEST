const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'src/public/images/heros/build');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(source).forEach((image) => {
  const imagePath = path.resolve(source, image);

  // Check if the file is an image (you can adjust the list of supported formats)
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  const isImage = supportedFormats.some((format) => imagePath.toLowerCase().endsWith(format));

  if (isImage) {
    // Process the image
    sharp(imagePath)
      .resize(800)
      .toFile(path.resolve(destination, `${path.parse(image).name}-large.jpg`), (err) => {
        if (err) {
          console.error(`Error processing image ${image}:`, err.message);
        } else {
          console.log(`Image ${image} processed successfully.`);
        }
      });

    sharp(imagePath)
      .resize(480)
      .toFile(path.resolve(destination, `${path.parse(image).name}-small.jpg`), (err) => {
        if (err) {
          console.error(`Error processing image ${image}:`, err.message);
        } else {
          console.log(`Image ${image} processed successfully.`);
        }
      });
  } else {
    console.warn(`Skipping non-image file: ${image}`);
  }
});
