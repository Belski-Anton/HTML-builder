const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');



fs.readdir(styles, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const cssFiles = files.filter((file) => path.extname(file) === '.css');

  fs.writeFile(bundle, '', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    cssFiles.forEach((cssFile) => {
      const cssFilePath = path.join(styles, cssFile);
      fs.readFile(cssFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        fs.appendFile(bundle, data, (err) => {
          if (err) {
            console.error(err);
            return;
          }
         });
       });
     });
   });
 });
          


