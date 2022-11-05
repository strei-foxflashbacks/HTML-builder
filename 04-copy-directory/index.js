const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

fs.mkdir(path.join(__dirname, 'files-copy'), {
  recursive: true,
}, err => {
  if (err) throw err
})

fsPromises.readdir(path.join(__dirname, 'files-copy'))
.then(files => {
  files.map(file => {
    const sourcePath = path.join(__dirname, 'files-copy', file)
    fs.unlink(sourcePath, err => {
      if (err) throw err
    })
  })
})

fsPromises.readdir(path.join(__dirname, 'files'))
.then(files => {
  files.forEach(file => {
    const sourcePath = path.join(__dirname, 'files', file)
    fsPromises.copyFile(sourcePath, path.join(__dirname, 'files-copy', file))
  })
})
