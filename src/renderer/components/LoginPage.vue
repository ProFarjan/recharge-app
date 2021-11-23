<template>
  <div id="wrapper">
    <h2>Hello world</h2>

    <button @click="listMyPorts">Show Ports</button>

    <pre v-if="msg.length">{{msg}}</pre>

  </div>
</template>

<script>
const SerialPort = require('serialport')

export default {
  name: 'landing-page',
  data: () => ({
    msg: []
  }),
  methods: {
    async  listSerialPorts () {
      const port = new SerialPort('COM11', {
        baudRate: 9600
      })
      port.write('AT', function (err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('message written')
      })

      // Open errors will be emitted as an error event
      port.on('error', function (err) {
        console.log('Error: ', err.message)
      })
    },
    listMyPorts () {
      let vm = this
      setTimeout(function listPorts () {
        vm.listSerialPorts()
        // setTimeout(listPorts, 2000)
      }, 2000)
    }
  }
}
</script>

<style scoped>
</style>
