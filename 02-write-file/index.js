const fs = require('fs');
const path = require('path');
let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const readline = require('readline');

const rl = readline.createInterface({
   input:process.stdin,
   output:process.stdout,
   prompt:'Enter your message:\n'
})

rl.prompt()
rl.on('line',line =>{
   if(line === 'exit'){
      endFunc();
   } else{
   writeStream.write(`${line}\n`)
   }
})
rl.on('SIGINT', endFunc);
function endFunc() {
  console.log('Goodbye');
  rl.close();
}









