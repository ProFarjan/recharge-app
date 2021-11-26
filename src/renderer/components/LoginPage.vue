<template>
  <div
      class="auth-layout-wrap text-left"
      :style="{'background-image': 'url(' + background + ')'}"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4">
              <div class="auth-logo text-left mb-4">
                <img
                    :src="logo"
                    alt=""
                >
              </div>
              <h1 class="mb-3 text-18">
                Sign In
              </h1>
              <div
                  v-if="message"
                  class="alert alert-warning"
              >
                {{ message }}
              </div>
              <form @submit.prevent="handleLogin">
                <div class="form-group div_txt">
                  <label for="username">Username</label>
                  <b-form-input
                      id="username"
                      v-model="user.username"
                      class="form-control form-control-rounded"
                      type="text"
                      name="username"
                      v-validate="{ required: true}"
                      :state="validateState('username')"
                      aria-describedby="Username"
                      data-vv-as="Username"></b-form-input>
                  <b-form-invalid-feedback>{{ veeErrors.first('username') }}</b-form-invalid-feedback>
                </div>
                <div class="form-group div_txt">
                  <label for="password">Password</label>
                  <b-form-input
                      id="password"
                      v-model="user.password"
                      class="form-control form-control-rounded"
                      type="password"
                      name="password"
                      v-validate="{ required: true }"
                      :state="validateState('password')"
                      aria-describedby="Password"
                      data-vv-as="Password"></b-form-input>
                  <b-form-invalid-feedback>{{ veeErrors.first('password') }}</b-form-invalid-feedback>
                </div>

                <vue-ladda
                    button-class="btn btn-rounded btn-primary btn-block mt-2"
                    data-style="zoom-in"
                    :loading="btn_loading">
                  Sign In
                </vue-ladda>
              </form>
              <div class="mt-3 text-center">
                <router-link
                    class="text-muted"
                    to="/forgot"
                >
                  Forgot Password?
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from '../model/User'

export default {
  name: 'landing-page',
  data: () => ({
    background: require('@/assets/images/photo-long-7.jpg'),
    logo: require('@/assets/images/logo-text.png'),
    btn_loading: false,
    user: new User('', ''),
    message: ''
  }),
  methods: {
    validateState (ref) {
      if (
        this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    handleLogin () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return null
        }
        this.btn_loading = true
        localStorage.setItem('user', JSON.stringify(this.user))
        setTimeout(() => {
          this.btn_loading = false
          this.$router.push('/dashboard')
        }, 1000)
      })
    }
  }
}

// const SerialPort = require('serialport')
//
// export default {
//   name: 'landing-page',
//   data: () => ({
//     msg: [],
//     port: null
//   }),
//   methods: {
//     setMessage () {
//       const serialPort = new SerialPort('COM86')
//       serialPort.on('open', () => {
//         console.log('open port')
//         setTimeout(() => {
//           serialPort.write('AT+CMGF=1\r', function (err) {
//             if (err) {
//               return console.log('Error 01: ', err.message)
//             }
//             console.log('open sms mode')
//             serialPort.on('data', function (data) {
//               console.log('Data: ', data)
//               console.log('sData: ', data.toString())
//             })
//             setTimeout(() => {
//               serialPort.write('AT+CMGS="01966885733"\r', function (err1) {
//                 if (err1) {
//                   return console.log('Error 02: ', err1.message)
//                 }
//                 console.log('Number Set')
//                 serialPort.on('data', function (data) {
//                   console.log('Data: ', data)
//                   console.log('sData: ', data.toString())
//                 })
//                 setTimeout(() => {
//                   serialPort.write('my i' + String.fromCharCode(26) + '\r\n', function (err2) {
//                     if (err2) {
//                       return console.log('Error 02: ', err2.message)
//                     }
//                     console.log('Message Set')
//                     serialPort.on('data', function (data) {
//                       console.log('Data: ', data)
//                       console.log('sData: ', data.toString())
//                     })
//                     setTimeout(() => {
//                       serialPort.write('\x1A', function (err3) {
//                         if (err3) {
//                           return console.log('Error 02: ', err3.message)
//                         }
//                         console.log('Send')
//                         serialPort.on('data', function (data) {
//                           console.log('Data: ', data)
//                           console.log('sData: ', data.toString())
//                         })
//                         setTimeout(() => {
//                           serialPort.write('^z', function (err4) {
//                             if (err4) {
//                               return console.log('Error 02: ', err4.message)
//                             }
//                             console.log('Success')
//                             serialPort.on('data', function (data) {
//                               console.log('Data: ', data)
//                               console.log('sData: ', data.toString())
//                               console.log('last message')
//                               setTimeout(() => {
//                                 serialPort.close()
//                               }, 3000)
//                             })
//                           })
//                         }, 200)
//                       })
//                     }, 200)
//                   })
//                 }, 200)
//               })
//             }, 200)
//           })
//         }, 2000)
//       })
//     },
//     checkNumber () {
//       const serialPort = new SerialPort('COM86')
//       var Readline = SerialPort.parsers.Readline
//       var parser = new Readline()
//       serialPort.on('open', () => {
//         this.port = serialPort
//         console.log('port open. Data rate: ' + serialPort.baudRate)
//       })
//       serialPort.pipe(parser)
//       setTimeout(() => {
//         serialPort.write('AT+CUSD=1,"*2#",15\r\n')
//         serialPort.write('\x1A')
//         serialPort.write('^z')
//         console.log('Write completed')
//       }, 2000)
//       serialPort.on('close', () => {
//         console.log('serial Port Close')
//       })
//       serialPort.on('error', (err) => {
//         console.log('Error: ' + err.message)
//       })
//       parser.on('data', (data) => {
//         console.log(data)
//       })
//     },
//     againWrite () {
//       setTimeout(() => {
//         this.port.write('AT+CUSD=1,"*2#",15\r\n')
//         this.port.write('\x1A')
//         this.port.write('^z')
//         console.log('Write completed again')
//       }, 2000)
//     }
//   }
// }
</script>

<style scoped>
  .auth-layout-wrap .auth-content {
    min-width: 360px !important;
  }
  .auth-layout-wrap .auth-content {
    max-width: 360px;
  }
  .auth-logo img {
    width: 100% !important;
  }
  .btn {
    padding: 0.375rem 0.75rem !important;
    font-size: 0.813rem !important;
  }
  .btn-primary {
    color: #fff !important;
    background-color: #663399 !important;
    border-color: #663399 !important;
  }
  .div_txt{
    text-align: left;
    font-weight: 700;
  }
  .error-txt{
    text-align: center;
    padding: 4px 0 0;
    color: red;
  }
</style>
