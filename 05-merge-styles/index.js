 const fs = require('fs')
 const fsPromises = fs.promises
 const path = require('path')

 const stylesDir = path.join(__dirname, 'styles')
 const destFile = path.join(__dirname, 'project-dist/bundle.css')
 const output = fs.createWriteStream(destFile)

 fsPromises.readdir(stylesDir)
 .then(files => {
  files.forEach(file => {
    const fileDir = path.join(stylesDir, file)
    const fileName = path.basename(fileDir)
    const ext = path.extname(fileDir)
    if (ext === '.css') {
      const input = fs.createReadStream(path.join(stylesDir, fileName))
      input.on('data', data => {
        output.write(data.toString() + '\n')
      })
    }
  })
 })