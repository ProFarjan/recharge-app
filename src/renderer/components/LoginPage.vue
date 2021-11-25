<template>
  <div id="wrapper">
    <h2>Hello world</h2>

    <button @click="setMessage">Write Port</button>
    <button @click="checkNumber">Check Number</button>
    <button @click="againWrite">Again Check Number</button>

    <pre v-if="msg.length">{{msg}}</pre>

  </div>
</template>

<script>
const SerialPort = require('serialport')

export default {
  name: 'landing-page',
  data: () => ({
    msg: [],
    port: null
  }),
  methods: {
    setMessage () {
      const serialPort = new SerialPort('COM86')
      serialPort.on('open', () => {
        console.log('open port')
        setTimeout(() => {
          serialPort.write('AT+CMGF=1\r', function (err) {
            if (err) {
              return console.log('Error 01: ', err.message)
            }
            console.log('open sms mode')
            serialPort.on('data', function (data) {
              console.log('Data: ', data)
              console.log('sData: ', data.toString())
            })
            setTimeout(() => {
              serialPort.write('AT+CMGS="01966885733"\r', function (err1) {
                if (err1) {
                  return console.log('Error 02: ', err1.message)
                }
                console.log('Number Set')
                serialPort.on('data', function (data) {
                  console.log('Data: ', data)
                  console.log('sData: ', data.toString())
                })
                setTimeout(() => {
                  serialPort.write('my i' + String.fromCharCode(26) + '\r\n', function (err2) {
                    if (err2) {
                      return console.log('Error 02: ', err2.message)
                    }
                    console.log('Message Set')
                    serialPort.on('data', function (data) {
                      console.log('Data: ', data)
                      console.log('sData: ', data.toString())
                    })
                    setTimeout(() => {
                      serialPort.write('\x1A', function (err3) {
                        if (err3) {
                          return console.log('Error 02: ', err3.message)
                        }
                        console.log('Send')
                        serialPort.on('data', function (data) {
                          console.log('Data: ', data)
                          console.log('sData: ', data.toString())
                        })
                        setTimeout(() => {
                          serialPort.write('^z', function (err4) {
                            if (err4) {
                              return console.log('Error 02: ', err4.message)
                            }
                            console.log('Success')
                            serialPort.on('data', function (data) {
                              console.log('Data: ', data)
                              console.log('sData: ', data.toString())
                              console.log('last message')
                              setTimeout(() => {
                                serialPort.close()
                              }, 3000)
                            })
                          })
                        }, 200)
                      })
                    }, 200)
                  })
                }, 200)
              })
            }, 200)
          })
        }, 2000)
      })
    },
    checkNumber () {
      const serialPort = new SerialPort('COM86')
      var Readline = SerialPort.parsers.Readline
      var parser = new Readline()
      serialPort.on('open', () => {
        this.port = serialPort
        console.log('port open. Data rate: ' + serialPort.baudRate)
      })
      serialPort.pipe(parser)
      setTimeout(() => {
        serialPort.write('AT+CUSD=1,"*2#",15\r\n')
        serialPort.write('\x1A')
        serialPort.write('^z')
        console.log('Write completed')
      }, 2000)
      serialPort.on('close', () => {
        console.log('serial Port Close')
      })
      serialPort.on('error', (err) => {
        console.log('Error: ' + err.message)
      })
      parser.on('data', (data) => {
        console.log(data)
      })
    },
    againWrite () {
      setTimeout(() => {
        this.port.write('AT+CUSD=1,"*2#",15\r\n')
        this.port.write('\x1A')
        this.port.write('^z')
        console.log('Write completed again')
      }, 2000)
    }
  }
}
</script>

<style scoped>
</style>