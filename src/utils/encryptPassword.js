var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

var CryptoJS = require("crypto-js");

function encrypt(data) {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
  return (ciphertext.toString());
}

function decrypt(data) {
  var bytes = CryptoJS.AES.decrypt(data.toString(), 'secret key 123');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return (decryptedData)
}


module.exports = {
  decrypt,
  encrypt
}
