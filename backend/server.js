const express = require("express");
const app = express();
const port = 8080;
const logger = require("morgan");
var cors = require("cors");
var router = express.Router();
var CryptoJS = require("crypto-js");
const SECRET = "I am batman";
app.use(cors());
app.use(logger("dev"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/aes/:id", function (req, res, next) {
  var reb64 = CryptoJS.enc.Hex.parse(req.params.id);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);

  res.send(plain);
});

app.get("/des/:id", function (req, res, next) {
  var reb64 = CryptoJS.enc.Hex.parse(req.params.id);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.TripleDES.decrypt(bytes, SECRET);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);

  res.send(plain);
});

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});

module.exports = router;
