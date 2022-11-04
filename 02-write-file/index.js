const fs = require('fs')
const path = require('path')

const { stdin, stdout, exit } = process

const exitMessage = () => {
  console.log('\nYour text is in text.txt file!\nHave a nice day!\n')
  exit()
}

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  err => {
    if (err) throw err
  }
)
stdout.write('Enter your text:\n')
stdin.on('data', data => {
  const text = data.toString()
  if (text.trim() === 'exit') {
    exitMessage()
  }
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    `${text}`,
    err => {
      if (err) throw err
    }
  )
})

process.on('SIGINT', exitMessage)
