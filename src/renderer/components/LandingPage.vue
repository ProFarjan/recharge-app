<template>
  <div id="wrapper">
    <h2>Hello world</h2>

    <button @click="listMyPorts">Show Ports</button>

    <pre v-if="msg.length">{{msg}}</pre>

  </div>
</template>

<script>
  const serialport = require('serialport')

  export default {
    name: 'landing-page',
    data: () => ({
      msg: []
    }),
    methods: {
      async  listSerialPorts () {
        await serialport.list().then((ports, err) => {
          if (err) {
            this.msg.push(err.message)
            return
          } else {
            this.msg.push('')
          }
          console.log('ports', ports)
          this.msg.push(ports)

          if (ports.length === 0) {
            this.msg.push('No ports discovered')
          }
        })
      },
      listMyPorts () {
        let vm = this
        setTimeout(function listPorts () {
          vm.listSerialPorts()
          setTimeout(listPorts, 2000)
        }, 2000)
      }
    }
  }
</script>

<style scoped>
</style>
