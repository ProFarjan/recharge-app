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
              <form @submit.stop.prevent="handleLogin">
                <div class="form-group div_txt">
                  <label for="username">Username</label>
                  <b-form-input
                      id="username"
                      ref="username"
                      v-model="user.username"
                      v-validate="{ required: true }"
                      name="username"
                      :state="validateState('username')"
                      aria-describedby="Username"
                      data-vv-as="Username"
                      trim
                      autofocus
                  />
                  <b-form-invalid-feedback>{{ veeErrors.first('username') }}</b-form-invalid-feedback>
                </div>
                <div class="form-group div_txt">
                  <label for="password">Password</label>
                  <b-form-input
                      id="password"
                      v-model="user.password"
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
                    to="/"
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
    background: require('@/assets/images/photo-wide-3.jpg'),
    logo: require('@/assets/images/logo-text.jpg'),
    btn_loading: false,
    user: new User('', ''),
    message: '',
    documents: [],
    ports: null
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
    async handleLogin () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return null
        }
        this.btn_loading = true
        this.$http.post('login.php', {
          username: this.user.username,
          password: this.user.password
        }).then(res => {
          if (res.data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(res.data.message))
            this.btn_loading = false
            this.$router.push('/dashboard')
          } else {
            this.message = res.data.message
          }
          setTimeout(() => {
            this.btn_loading = false
          }, 1000)
        })
      })
    }
  }
}
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
