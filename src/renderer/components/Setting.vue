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
                      <label style="font-size: 18px;font-weight: 600;" for="operator">Select Operator</label>
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
                          :reduce="operator => operator.id"
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
                      <label style="font-size: 18px;font-weight: 600;" for="b_ussd">Balance USSD</label>
                      <b-form-input
                          id="b_ussd"
                          v-model="fm.balanceUSSD"
                          type="b_ussd"
                          name="text"
                          v-validate="{ required: true }"
                          :state="validateState('b_ussd')"
                          aria-describedby="b_ussd"
                          data-vv-as="b_ussd"></b-form-input>
                      <b-form-invalid-feedback>{{ veeErrors.first('b_ussd') }}</b-form-invalid-feedback>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="s_ussd">Send USSD</label>
                      <b-form-input
                          id="s_ussd"
                          v-model="fm.sendUSSD"
                          type="s_ussd"
                          name="text"
                          v-validate="{ required: true }"
                          :state="validateState('s_ussd')"
                          aria-describedby="s_ussd"
                          data-vv-as="s_ussd"></b-form-input>
                      <b-form-invalid-feedback>{{ veeErrors.first('s_ussd') }}</b-form-invalid-feedback>
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
    </transition>

  </div>
</template>


<script>
export default {
  name: 'Setting',
  data: () => ({
    isSubmitted: false,
    fm: {
      systemType: '',
      name: '',
      phone: '',
      operator: '',
      sendUSSD: '',
      balanceUSSD: ''
    },
    systemTypes: [
      {id: 'recharge', name: 'Recharge'},
      {id: 'banking', name: 'Banking'}
    ],
    operators: [
      { id: 1, name: 'Greenphone', category: 'recharge' },
      { id: 2, name: 'Robi', category: 'recharge' },
      { id: 3, name: 'Aritel', category: 'recharge' },
      { id: 4, name: 'bKash', category: 'banking' }
    ],
    fields: [
      'sl',
      'type',
      'phone',
      'amount',
      'status'
    ],
    items: [
      { name: { first: 'John', last: 'Doe' }, type: 'Male', phone: 42, amount: 42, status: 'ok' },
      { name: { first: 'Jane', last: 'Doe' }, type: 'Female', phone: 36, amount: 42, status: 'ok' },
      { name: { first: 'Rubin', last: 'Kincade' }, type: 'Male', phone: 73, amount: 42, status: 'ok' },
      { name: { first: 'Shirley', last: 'Partridge' }, type: 'Female', phone: 62, amount: 42, status: 'ok' }
    ]
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
        setTimeout(() => {
          this.isSubmitted = false
          this.resetFM()
          this.$refs['phone'].focus()
        }, 1000)
      })
    },
    resetFM () {
      this.fm.operator = this.fm.phone = this.fm.amount = ''
    }
  }
}
</script>

<style scoped>

</style>
