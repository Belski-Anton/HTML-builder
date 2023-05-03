const fs = require('fs');
let path = require('path');
let readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readStream.on('data',(chunk)=>{
   console.log(chunk.toString())
})


