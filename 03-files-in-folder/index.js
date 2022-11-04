const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

fsPromises.readdir(path.join(__dirname, 'secret-folder'), {
  withFileTypes: true
}).then(entries => {
  entries.forEach(entry => {
    if (entry.isFile()) {
      const entryPath = path.join(__dirname, 'secret-folder', entry.name)
      const entryExtName = path.extname(entryPath)
      const entryName = entry.name.replace(entryExtName, '')
      fs.stat(path.join(__dirname, 'secret-folder', entry.name), (err, stats) => {
        if (err) throw err
        console.log(`${entryName} - ${entryExtName.replace(/\./, '')} - ${(stats.size) / 1000}`)
      })
    }
  })
})