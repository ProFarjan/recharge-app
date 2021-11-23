<template>
  <div id="wrapper">
    <h2>Hello world</h2>

  </div>
</template>

<script>

export default {
  name: 'landing-page',
  data: () => ({
    atcmd: '',
    msg: [],
    port: null
  }),
  methods: {
    writeSerialPorts () {},
    readMyPorts () { },
    listSerialPorts () {}
  }
}
</script>

<style scoped>
</style>
