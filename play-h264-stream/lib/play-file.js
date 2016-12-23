'use strict';

const fs = require('fs');
const path = require('path');

const Splitter = require('stream-split');


function getFileListSync(dir, fileList) {
  const files = fs.readdirSync(dir);
  fileList = fileList || [];
  files.forEach(function (file) {
    const nestedPath = path.join(dir, file);
    if (fs.statSync(nestedPath).isDirectory()) {
      fileList = getFileListSync(nestedPath, fileList);
    } else {
      fileList.push({ name: file, path: nestedPath });
    }
  });
  return fileList;
}

function getFileStream(filename) {
  const fileStream = fs.createReadStream(filename).pipe(new Splitter(new Buffer.from([0, 0, 0, 1])));
  return fileStream;
}

module.exports = {
  getFileListSync: getFileListSync,
  getFileStream: getFileStream,
}
