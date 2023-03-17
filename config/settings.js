const fs = require('fs')
const chalk = require('chalk')
// EDIT DISINI
global.owner = ['6281220670449'] // no own
global.author = 'KurrXd' // nama author 
global.packname = 'xd bot whatsapp' // nama pack sticker
global.namabot = 'XD BOTZ' // nama bot mu
global.group = 'grup lu' // grup mu



let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
