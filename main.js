const express = require('express')
const app = express()
const port = 8912

const fs = require('fs');
const path = require('path');

app.use(express.static('icons'));

app.use(express.static('website'));


app.listen(port, () => {
  console.log(`Example app listening on port ${8912}`)
})



// Replace 'images' with your actual directory path


async function getImagesAndDirectories(directoryPath) {
  //const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
  
  try {
    const files = fs.readdirSync(directoryPath, (err, files) => {console.log(err, files)});
    console.log(files);
    
    
    return files;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}







app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/available_files/*', (req, res) => {
  console.log(req.params[0]);
  (async () => {
    const imageDirectoryPath = path.join(__dirname, 'icons', req.params[0]);

    console.log(imageDirectoryPath);
    const imageUrls = await getImagesAndDirectories(imageDirectoryPath);
    console.log(imageUrls);
    res.send(imageUrls);
  })();

})

