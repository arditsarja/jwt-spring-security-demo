var iterationCount = 1000;
var keySize = 128;
var passphrase = "anjezacelsoaliaj1";
// var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
// var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
var salt = "b3cd993d2e257ae19bc07cfc4063f5e4";

var iv = "6644750b3750f39082784a6a98a47766";

var aesUtil = new AesUtil(keySize, iterationCount);