require('dotenv').config();
const throwError = (err) => {
  console.log(err)
  throw err
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function convertFilesToURL(filePath) {
  // Replace backslashes with forward slashes and remove the leading part of the path
  const urlPath = filePath.replace(/\\/g, '/').replace(/^public\//, '');
  // Concatenate with the base URL
  return `${process.env.BASE_URL}/${urlPath}`;
}


module.exports = {
  throwError,
  generateRandomString,
  convertFilesToURL
}