const discord = require('discord.js')
const client = new discord.Client()
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const heroku2 = new Heroku({ token: process.env.HEROKU_API_TOKEN2 })
const heroku3 = new Heroku({ token: process.env.HEROKU_API_TOKEN3 })
client.login(process.env.Token)
let result
let apis = ['mubotapi', 'codequizapi', 'keeptypingandnobodyexplodes', 'chartbotapi', 'discord-noeul', 'mubetaapi', 'janggokbotapi', 'muzicbetaapi']
let herokuNo = [0, 0, 0, 0, 1, 2, 2, 2]
let discordID = ['532801455187558420', '540362373634981889', '537627713079345164', '538633650070224916', '546639768839127050', '553150656161251328', '560779140375117826']
let live = ['ㄴㄴ, 살아있음', '히 어라이브!', '말을 걸어보면 알겠지', '님 읽씹당한거임, 난 잘됨', '응~ 나는되', 'Expected working: Working good on CORE.js 1:0']
let die = ['노동하다 죽었음.', '다이.', '방해금지 킨거임', '우리 읽씹하고있음 함무라비 법전을 따라야함', '방해전파 때문에 봇다이', 'Unexpected Error: Working Bad on die.js 6:66']

client.on('message', (message) => {
  if (message.content === '봇다이' || message.content === '봇다이 라이트스켄') {
    dielight(message)
  } else if (message.content === '봇다이 딥스켄') {
    dieDetail(message)
  } else if (message.content.split(' ')[0] === 'heroku' && message.content.split(' ')[1]) {
    message.channel.send('wait...').then((msg) => {
      heroku.get(message.content.split(' ')[1]).then((result) => {
        msg.edit('```json\n' + JSON.stringify(result).substring(0, 1500) + '\n```')
        if (JSON.stringify(result).length >= 1500) {
          message.channel.send('... Can\'t see more')
        }
      }).catch((err) => {
        msg.edit('```json\n' + JSON.stringify(err) + '\n```')
      })
    })
  } else if (message.content.split(' ')[0] === 'heroku2' && message.content.split(' ')[1]) {
    message.channel.send('wait...').then((msg) => {
      heroku2.get(message.content.split(' ')[1]).then((result) => {
        msg.edit('```json\n' + JSON.stringify(result).substring(0, 1500) + '\n```')
        if (JSON.stringify(result).length >= 1500) {
          message.channel.send('... Can\'t see more')
        }
      }).catch((err) => {
        msg.edit('```json\n' + JSON.stringify(err) + '\n```')
      })
    })
  } else if (message.content.split(' ')[0] === 'heroku3' && message.content.split(' ')[1]) {
    message.channel.send('wait...').then((msg) => {
      heroku3.get(message.content.split(' ')[1]).then((result) => {
        msg.edit('```json\n' + JSON.stringify(result).substring(0, 1500) + '\n```')
        if (JSON.stringify(result).length >= 1500) {
          message.channel.send('... Can\'t see more')
        }
      }).catch((err) => {
        msg.edit('```json\n' + JSON.stringify(err) + '\n```')
      })
    })
  } else if (message.content.endsWith('다이') || message.content.endsWith('리붓')) {
    dieChecker(message)
  }
})

async function dielight (message) {
  message.channel.send('라이트 스켄은 실제와 다를수 있으니 \'봇다이 딥스켄\'을 사용하는것을 추천드립니다')
  discordID.forEach((v, i) => {
    if (client.users.get(v).presence.status === 'online') {
      message.channel.send(apis[i] + ': ⭕')
    } else {
      message.channel.send(apis[i] + ': ❌')
    }
  })
}

async function dieDetail (message) {
  let ment1 = '==== Process has Started ===='
  let ment2 = ['Waiting for request..\n']
  let ment3 = 'diebotapi...up\n'
  let result = []
  let embed = new discord.RichEmbed()
    .setColor(0x00ffff)
    .setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2 + '\n```\n산출결과```\n' + ment3 + '\n```')
    .setFooter('Heroku Node Process Checker')
  message.channel.send(embed).then((emb) => {
    let wait = 0
    for (let counter = 0; counter < apis.length; counter++) {
      ment1 += '\n[' + apis[counter] + ']\nRequest Heroku Data (Http/Get)'
      embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
      emb.edit(embed)
      if (herokuNo[counter] === 0) {
        heroku.get('/apps/' + apis[counter] + '/dynos/worker.1').then((dyno) => {
          ment1 += '\nHeroku Server Response Collected'
          ment2[counter] = JSON.stringify(dyno)
          embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
          emb.edit(embed)
          ment1 += '\nCaculating Status...' + dyno.state
          ment3 += apis[counter] + '...' + dyno.state + '\n'
          result[counter] = dyno.state
          embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
          emb.edit(embed)
          wait++
          if (wait === apis.length) {
            embed.setColor(0x00ff00)
              .setDescription('처리결과')
            for (let counter2 = 0; counter2 < apis.length; counter2++) {
              if (result[counter2] === 'up') {
                embed.addField(apis[counter2] + ': ' + '⭕', live[Math.floor(Math.random() * live.length)])
                emb.edit(embed)
              } else {
                embed.addField(apis[counter2] + ': ' + '❌', die[Math.floor(Math.random() * die.length)])
                emb.edit(embed)
              }
            }
          }
        })
      } else if (herokuNo[counter] === 1) {
        heroku2.get('/apps/' + apis[counter] + '/dynos/worker.1').then((dyno) => {
          ment1 += '\nHeroku Server Response Collected'
          ment2[counter] = JSON.stringify(dyno)
          embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
          emb.edit(embed)
          ment1 += '\nCaculating Status...' + dyno.state
          ment3 += apis[counter] + '...' + dyno.state + '\n'
          result[counter] = dyno.state
          embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
          emb.edit(embed)
          wait++
          if (wait === apis.length) {
            embed.setColor(0x00ff00)
              .setDescription('처리결과')
            for (let counter2 = 0; counter2 < apis.length; counter2++) {
              if (result[counter2] === 'up') {
                embed.addField(apis[counter2] + ': ' + '⭕', live[Math.floor(Math.random() * live.length) + 1])
                emb.edit(embed)
              } else {
                embed.addField(apis[counter2] + ': ' + '❌', die[Math.floor(Math.random() * die.length) + 1])
                emb.edit(embed)
              }
            }
          }
        })
      } else if (herokuNo[counter] === 2) {
        heroku3.get('/apps/' + apis[counter] + '/dynos/worker.1').then((dyno) => {
          ment1 += '\nHeroku Server Response Collected'
          ment2[counter] = JSON.stringify(dyno)
          embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
          emb.edit(embed)
          ment1 += '\nCaculating Status...' + dyno.state
          ment3 += apis[counter] + '...' + dyno.state + '\n'
          result[counter] = dyno.state
          embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
          emb.edit(embed)
          wait++
          if (wait === apis.length) {
            embed.setColor(0x00ff00)
              .setDescription('처리결과')
            for (let counter2 = 0; counter2 < apis.length; counter2++) {
              if (result[counter2] === 'up') {
                embed.addField(apis[counter2] + ': ' + '⭕', live[Math.floor(Math.random() * live.length) + 1])
                emb.edit(embed)
              } else {
                embed.addField(apis[counter2] + ': ' + '❌', die[Math.floor(Math.random() * die.length) + 1])
                emb.edit(embed)
              }
            }
          }
        })
      }
    }
    while (wait === apis.length) {
      embed.setColor(0x00ff00)
        .setDescription('처리결과')
      for (let counter2 = 0; counter2 < apis.length; counter2++) {
        if (result[counter2] === 'up') {
          embed.addField(apis[counter2] + ': ' + '⭕', live[Math.floor(Math.random() * live.length) + 1])
          emb.edit(embed)
        } else {
          embed.addField(apis[counter2] + ': ' + '❌', die[Math.floor(Math.random() * die.length) + 1])
          emb.edit(embed)
        }
      }
    }
  })
}

function dieChecker (message) {
  result = Math.floor(Math.random() * live.length) + 1

  if (message.author === client.user) return
  if (message.content.split(' ')[0] === '뮤다이') {
    heroku.get('/apps/mubotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === 'cq다이') {
    heroku.get('/apps/codequizapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '카텐다이') {
    heroku.get('/apps/keeptypingandnobodyexplodes/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '찻봇다이') {
    heroku.get('/apps/chartbotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '노을다이') {
    heroku2.get('/apps/discord-noeul/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '봇다이다이') {
    message.channel.send('죽을래?')
  }
  if (message.content.split(' ')[0] === '뮤리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/mubotapi/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === 'cq리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/codequizapi/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === '카텐리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/keeptypingandnobodyexplodes/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === '찻봇리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/chartbotapi/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === '노을리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku2.delete('/apps/discord-noeul/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
}
