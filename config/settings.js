const fs = require('fs')
const chalk = require('chalk')
// EDIT DISINI
global.owner = ['6282181337337'] // no own
global.author = 'Faiz' // nama author 
global.packname = 'PandaBotz whatsapp' // nama pack sticker
global.namabot = 'PANDA BOTZ' // nama bot mu
global.group = 'https://chat.whatsapp.com/C3y8SC2EmJWHurHEGl9S4D' // grup mu
global.pic = 'https://telegra.ph/file/d2a3f1f1889f9a2e82555.jpg' // logo lu


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
