<template>
  <div
      class="text-left">

    <transition
        name="recharge_transition"
        enter-active-class="animated zoomIn"
        leave-active-class="animated fadeOut"
        :duration="{enter: 800, leave: 100}"
    >
      <div class="row">
        <div :class="($screenSize < 980) ? 'col-sm-12' : 'col-sm-6'">
          <div class="card">
            <div class="card-header text-left text-18">
              System Settings
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.stop.prevent="createOperator">

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="operator">System Type</label>
                      <v-select
                          id="operator"
                          v-model="fm.systemType"
                          name="operator"
                          :options="systemTypes"
                          label="name"
                          :reduce="systemType => systemType.id"
                          placeholder="Choose a Type"
                      >
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!fm.systemType"
                              v-bind="attributes"
                              v-on="events" />
                        </template>
                      </v-select>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="name">Name</label>
                      <b-form-input
                          id="name"
                          ref="name"
                          v-model="fm.name"
                          v-validate="{ required: true }"
                          :state="validateState('name')"
                          aria-describedby="name"
                          data-vv-as="name"
                          trim
                      />
                      <b-form-invalid-feedback>{{ veeErrors.first('name') }}</b-form-invalid-feedback>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="phone">Phone Number</label>
                      <b-form-input
                          id="phone"
                          ref="phone"
                          v-model="fm.phone"
                          v-validate="{ required: true }"
                          :state="validateState('phone')"
                          aria-describedby="phone"
                          data-vv-as="phone"
                          trim
                      />
                      <b-form-invalid-feedback>{{ veeErrors.first('phone') }}</b-form-invalid-feedback>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="operator">Select Operator</label>
                      <v-select
                          id="operator"
                          v-model="fm.operator"
                          name="operator"
                          :options="operators"
                          label="name"
                          :reduce="operator => operator.name"
                          placeholder="Choose an operator"
                      >
                        <template #search="{attributes, events}">
                          <input
                              class="vs__search"
                              :required="!fm.operator"
                              v-bind="attributes"
                              v-on="events" />
                        </template>
                      </v-select>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="port">GSM Port</label>
                      <b-form-input
                          placeholder="Enter Com Port"
                          id="port"
                          ref="port"
                          v-model="fm.port"
                          v-validate="{ required: true }"
                          :state="validateState('port')"
                          aria-describedby="port"
                          data-vv-as="port"
                          trim
                      />
                      <b-form-invalid-feedback>{{ veeErrors.first('port') }}</b-form-invalid-feedback>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="ussdSend">USSD Send { @phone, @amount }</label>
                      <b-form-input
                          id="ussdSend"
                          ref="ussdSend"
                          v-model="fm.ussdSend"
                          v-validate="{ required: true }"
                          :state="validateState('ussdSend')"
                          aria-describedby="ussdSend"
                          data-vv-as="ussdSend"
                          trim
                      />
                      <b-form-invalid-feedback>{{ veeErrors.first('ussdSend') }}</b-form-invalid-feedback>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="ussdBalance">USSD Balance</label>
                      <b-form-input
                          id="ussdBalance"
                          ref="ussdBalance"
                          v-model="fm.ussdBalance"
                          v-validate="{ required: true }"
                          :state="validateState('ussdBalance')"
                          aria-describedby="ussdBalance"
                          data-vv-as="ussdBalance"
                          trim
                      />
                      <b-form-invalid-feedback>{{ veeErrors.first('ussdBalance') }}</b-form-invalid-feedback>
                    </div>

                    <vue-ladda
                        button-class="btn btn-success mt-2"
                        data-size="s"
                        data-style="zoom-in"
                        :loading="isSubmitted">
                      Save
                    </vue-ladda>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="($screenSize < 980) ? 'col-sm-12' : 'col-sm-6'">
          <div class="card">
            <div class="card-header text-left text-18">
              Lasted Recharge Records
            </div>
            <div class="card-body">
              <div class="table table-responsive">
                <b-table small :fields="fields" :items="items" responsive="sm">
                  <!-- A virtual column -->
                  <template #cell(sl)="data">
                    {{ data.index + 1 }}
                  </template>

                  <!-- Optional default data cell scoped slot -->
                  <template #cell()="data">
                    <i>{{ data.value }}</i>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>


<script>
export default {
  name: 'Setting',
  data: () => ({
    isSubmitted: false,
    user: null,
    fm: {
      systemType: '',
      name: '',
      phone: '',
      operator: '',
      port: '',
      ussdSend: '',
      ussdBalance: ''
    },
    systemTypes: [
      {id: 'recharge', name: 'Recharge'},
      {id: 'banking', name: 'Banking'}
    ],
    operators: [
      { id: 1, name: 'Greenphone', category: 'recharge' },
      { id: 2, name: 'Robi', category: 'recharge' },
      { id: 3, name: 'Aritel', category: 'recharge' },
      { id: 4, name: 'Teletalk', category: 'recharge' },
      { id: 5, name: 'Banglalink', category: 'recharge' },
      { id: 6, name: 'bKash', category: 'banking' },
      { id: 7, name: 'Nagad', category: 'banking' },
      { id: 8, name: 'Rocket', category: 'banking' },
      { id: 9, name: 'Others', category: 'banking' }
    ],
    fields: [
      'sl',
      'systype',
      'name',
      'phone',
      'operator',
      'port',
      'ussdsend',
      'ussdbalance'
    ],
    items: []
  }),
  methods: {
    validateState (ref) {
      if (this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    createOperator () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return null
        }
        this.isSubmitted = true
        const data = {
          ussdsend: this.fm.ussdSend,
          ussdbalance: this.fm.ussdBalance,
          systype: this.fm.systemType,
          name: this.fm.name,
          phone: this.fm.phone,
          operator: this.fm.operator,
          port: this.fm.port,
          userid: this.user.id
        }
        this.$http.post('index.php?table=gsm', data, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.user.accesToken}`
          }
        }).then(res => {
          if (res.data.status === 'success') {
            this.$notify({
              type: 'success',
              title: 'Submitted Done!',
              text: 'Successfully Save Your ' + this.fm.port
            })
            this.items.push(data)
            this.resetFM()
          } else {
            this.$notify({
              type: 'warn',
              title: 'Warning Message',
              text: res.data.message
            })
          }
          this.isSubmitted = false
        })
      })
    },
    resetFM () {
      this.fm.operator = this.fm.phone = this.fm.port = this.fm.name = this.fm.ussdBalance = this.fm.ussdSend = this.fm.systemType = ''
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.$http('index.php?table=gsm&isactive=1', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.user.accesToken}`
      }
    }).then(res => {
      if (res.data.status === 'success') {
        this.items = res.data.message
      }
    })
  }
}
</script>

<style scoped>

</style>
