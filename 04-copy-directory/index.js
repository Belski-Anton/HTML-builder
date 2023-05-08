
const fs = require('fs');
const path = require('path');


const copyDir = () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const original = path.join(path.join(__dirname, 'files'), file.name);
        const copy = path.join(path.join(__dirname, 'files-copy'), file.name);
        if (file.isDirectory()) {
          copyDir(original,copy);
        } else {
          fs.copyFile(original,copy, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
};

copyDir('./files', './files-copy');
