const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),{withFileTypes: true},(err,file) => {
   file.forEach(file =>{
      let infoFile = [];
      if(file.isFile()){
      fs.stat(path.join(__dirname, 'secret-folder', file.name),(err, stats)=> {
         if (err) {
            return console.error(err)
         }
         infoFile.push(file.name.split('.').slice(0, -1).join('.'));
         infoFile.push(path.extname(file.name).slice(1));
         infoFile.push((Math.round(stats.size/1024)) + 'Kb');
         console.log(infoFile.join(' - ')); 
          
       }) 
      }
   })
}) 
     


   
  
