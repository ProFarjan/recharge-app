import SerialPort from 'serialport'
import axios from 'axios'
axios.defaults.baseURL = 'http://144.48.119.70/api/'

export default {
  data: () => ({
    sidebarAnimation: 'sidebar-full',
    accesToken: 'NGJiNTkwYjI4MzIxMzJhOGNmYzA1NWVjOWYzNWY3ZGE=',
    port: [],
    gsm: [],
    temp: '',
    rcv: [],
    gsmRecharge: [],
    gsmBanking: [],
    log: []
  }),
  mounted () {
    var vm = this
    axios.get('index.php?table=gsm&isactive=1', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.accesToken}`
      }
    }).then(res => {
      if (res.data.status === 'success') {
        var i = 0
        this.log.push(res.data)
        for (let g of res.data.message) {
          g.index = i
          vm.openPort(g)
          i++
          this.gsm.push(g)
          if (g.systype === 'recharge') {
            this.gsmRecharge.push(g)
          } else {
            this.gsmBanking.push(g)
          }
        }
      } else {
        this.$notify({
          type: 'warn',
          title: 'Warning Message',
          text: res.data.message
        })
      }
    })
  },
  methods: {
    openPort (gsm) {
      const serialPort = new SerialPort(gsm.port)
      var Readline = SerialPort.parsers.Readline
      var parser = new Readline()
      serialPort.on('open', () => {
        console.log('port open. Data rate: ' + serialPort.baudRate)
      })
      this.port[gsm.index] = serialPort
      serialPort.pipe(parser)
      setTimeout(() => {
        serialPort.write('AT+CUSD=1,"' + gsm.ussdbalance + '",15\r\n')
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
        const val = data.trim(' ')
        if (val.substring(0, 5) === '+CMTI') {
          this.rcv = val.split(',')
          if (this.rcv.length > 1) {
            this.readMessage(serialPort, this.rcv[1])
          }
        }
        if (val === 'OK' & this.temp !== '') {
          this.save(this.temp)
          if (this.temp.includes('+CMTI') & this.rcv.length > 1) {
            this.saveReceivedMessage(serialPort, this.temp, this.rcv[1])
          }
          this.temp = ''
        } else {
          this.temp += val + ((val === '') ? '' : ' ')
        }
      })
    },
    async ussd (serialPort, code) {
      serialPort.write('AT+CUSD=1,"' + code + '",15\r\n', err => {
        if (err) {
          console.log(err.message)
        }
      })
      serialPort.write('\x1A')
      serialPort.write('^z')
    },
    async save (data) {
      await axios.post('index.php?table=sent_log', {
        gsmid: 1,
        message: data,
        receivedtime: new Date().toJSON().slice(0, 19).replace('T', ' ')
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.accesToken}`
        }
      }).then(res => {
        console.log('store data', res.data)
      })
    },
    async saveReceivedMessage (serialPort, message, id) {
      const filterMessage = this.filterRecMessage(message)
      await axios.post('index.php?table=received', {
        gsmid: 1,
        phone: filterMessage.phone,
        message: filterMessage.message,
        receivedtime: filterMessage.date
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.accesToken}`
        }
      }).then(res => {
        if (res.data.status === 'success') {
          this.deleteMessage(serialPort, id)
        }
      })
    },
    async readMessage (serialPort, id) {
      serialPort.write('AT+CMGR=' + id + '\r\n')
      serialPort.write('\x1A')
      serialPort.write('^z')
    },
    deleteMessage (serialPort, id) {
      serialPort.write('AT+CMGD=' + id + '\r\n')
      serialPort.write('\x1A')
      serialPort.write('^z')
      this.rcv = []
    },
    filterRecMessage (data) {
      const arr = data.split('+CMGR:')
      let core = {
        phone: '+8801000000000',
        message: data,
        date: new Date().toJSON().slice(0, 19).replace('T', ' ')
      }
      if (arr.length > 1) {
        const mainBody = arr[1].trim(' ')
        const mainBodyExplode = mainBody.split('" ')
        if (mainBodyExplode.length > 1) {
          core.message = mainBodyExplode[1].trim()
        }
        const getInfo = mainBodyExplode[0].split(',')
        core.phone = getInfo[1].substring(1, 15)
        core.date = (getInfo[3].substring(1, 20)).replace(/\//g, '-')
      }
      return core
    }
  }
}
