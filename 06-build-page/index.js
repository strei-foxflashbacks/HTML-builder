const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

const stylesDir = path.join(__dirname, 'styles')
const assetsDir = path.join(__dirname, 'assets')
const destDir = path.join(__dirname, 'project-dist')
const destAssets = path.join(destDir, 'assets')
const componentsDir = path.join(__dirname, 'components')

fs.mkdir(destDir, {
  recursive: true
}, err => {
  if (err) throw err
})

fsPromises.readdir(stylesDir)
.then(files => {
 files.forEach(file => {
   const fileDir = path.join(stylesDir, file)
   const fileName = path.basename(fileDir)
   const ext = path.extname(fileDir)
   if (ext === '.css') {
    const destFile = path.join(destDir, 'style.css')
    const stylesInput = fs.createReadStream(path.join(stylesDir, fileName))
    const stylesOutput = fs.createWriteStream(destFile)
    stylesInput.on('data', data => {
      stylesOutput.write(data.toString() + '\n')
    })
   }
 })
})

fs.mkdir(destAssets, {
  recursive: true
}, err => {
  if (err) throw err
})

fsPromises.readdir(assetsDir, {
  withFileTypes: true
}).then(folders => {
  folders.forEach(folder => {
    fsPromises.mkdir(path.join(destAssets, folder.name), {
      recursive: true
    }, err => {
      if (err) throw err
    })
    fsPromises.readdir(path.join(destAssets, folder.name))
    .then(files => {
      files.map(file => {
        const sourcePath = path.join(destAssets, folder.name, file)
        fs.unlink(sourcePath, err => {
          if (err) throw err
        })
      })
    })
    fsPromises.readdir(path.join(assetsDir, folder.name))
    .then(files => {
      files.forEach(file => {
        const sourcePath = path.join(assetsDir, folder.name, file)
        fsPromises.copyFile(sourcePath, path.join(destAssets, folder.name, file))
      })
    })
  })
})

// Привет! Мне удалось решить только до этого момента, дальше я уже осознал, что моих знаний и времени не хватает.
// Так что, если вдруг будет желание, я бы не отказался от объяснения, как можно было бы выполнить часть с заменой шаблонов на компоненты
// Спасибо за оценку и хорошего дня!