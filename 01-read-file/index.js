const fs = require('fs')
const path = require('path')
const { stdout } = process

const fileDir = path.join(__dirname, 'text.txt')
const output = fs.createReadStream(fileDir, 'utf-8')
let data = ''

output.on('data', chunk => {
  data += chunk
  console.log(data)
})