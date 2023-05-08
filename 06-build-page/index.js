const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');
const pathCopy = path.join(__dirname, 'project-dist');
const bundle = path.join(__dirname, 'project-dist', 'style.css');
let pathAssetsCopy = path.join(__dirname, 'project-dist', 'assets');
let pathAssets = path.join(__dirname, 'assets');
let folderPath = path.join(__dirname, 'components');





fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Folder created successfully.');
  }
});






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
    
 
 function fileCopies(dir, exit) {
  fs.readdir(dir, {withFileTypes: true}, function (error, files) {
    if (error) throw error;
    files.forEach(function(file) {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), function(error) {
          if (error) {
            fs.mkdir(path.join(exit, file.name), function(error) {
              if (error) {
                return console.error(error);
              }
                          });
            fileCopies(`${dir}\\${file.name}`, path.join(exit, file.name));
          } else {
            fileCopies(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(`${dir}\\${file.name}`, `${exit}\\${file.name}`, function(error){
          if (error) throw error;
        });
      }
    });
  });
}
fs.stat (pathCopy, function (error) {
  if (error) {
    fs.mkdir(pathCopy, function (error) {
      if (error) {
        return console.error(error);
      }
      });
    createTemplate();
  } else {  fs.readdir(pathCopy, function (error)  {
    if (error)
      console.log(error);
    else {

      createTemplate();
    }
  });
  }
});

fs.stat (pathAssetsCopy, function (error) {
  if (error) {
    fs.mkdir(pathAssetsCopy, function(error) {
      if (error) {
        return console.error(error);
      }

    });
    fileCopies(pathAssets, pathAssetsCopy);
  } else {
    fileCopies(pathAssets, pathAssetsCopy);
  }
});

function createTemplate() {
  fs.copyFile(`${__dirname}\\template.html`, `${pathCopy}\\index.html`, function (error) {
    if (error) throw error;
    fs.readFile(`${pathCopy}\\index.html`, 'utf8', function(error, data) {
      if(error) throw error;
      fs.readdir(folderPath, {withFileTypes: true}, function (error, files) {
        if (error) throw error;

        files.forEach(function(file) {
          fs.readFile(`${folderPath}\\${file.name}`, 'utf8', function(error, dataFile) {
            if(error) throw error;
            let tagName = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(`${pathCopy}\\index.html`, data, function (error) {
              if(error)
                console.log(error);});
          });
          
        });
        
      });
      
    });
    
  });
  
}

 



 



  



