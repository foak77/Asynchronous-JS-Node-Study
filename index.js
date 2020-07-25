const fs = require("fs");
const superagent = require("superagent");
const { rejects } = require("assert");
const { isBuffer } = require("util");
const { resolve } = require("path");
// const http = require("http")
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("could not write file");
      resolve("success");
    });
  });
};

readFilePro("./dog.txt")
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
    // fs.writeFile("dog-img.txt", res.body.message, (err) => {
    //   if (err) return console.log(err.message);
    //   console.log("random img to file");
    // });
  })
  .then(() => {
    console.log("random img to file");
  })
  .catch((err) => {
    console.log(err.message);
  });
