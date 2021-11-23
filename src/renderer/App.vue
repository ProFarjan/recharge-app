<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project'
  }
</script>

<style>
  @import "assets/css/themes/lite-purple.css";
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .main-content {
    min-height: 72vh !important;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .container-fluid {
    min-height: 72vh !important;
    padding-right: 0;
    padding-left: 0;
  }
  .btn-primary {
    color: #fff !important;
    background-color: #663399 !important;
    border-color: #663399 !important;
  }
  .btn-success {
    color: #fff !important;
    background-color: #4caf50 !important;
    border-color: #4caf50 !important;
  }
  div.tab-border {
    margin: 15px 0 !important;
  }
  .icon-txt{
    color: #fff !important;
    font-weight: 900;
  }
  .btn-sm, .btn-group-sm > .btn {
    padding: 0.25rem 0.5rem !important;
    font-size: 0.71137rem !important;
    line-height: 1.5;
    border-radius: 0.2rem !important;
  }
  .separator-breadcrumb {
    margin-bottom: 1rem;
  }
</style>
