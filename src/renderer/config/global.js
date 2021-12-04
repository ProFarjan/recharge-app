import SerialPort from 'serialport'

export default {
  data: () => ({
    sidebarAnimation: 'sidebar-full',
    port: null
  }),
  mounted () {
    const serialPort = new SerialPort('COM86')
    var Readline = SerialPort.parsers.Readline
    var parser = new Readline()
    serialPort.on('open', () => {
      console.log('port open. Data rate: ' + serialPort.baudRate)
    })
    console.log(serialPort)
    this.port = serialPort
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
  }
}
