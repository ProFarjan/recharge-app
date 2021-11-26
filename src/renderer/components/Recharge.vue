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
              Recharge System Page
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.stop.prevent="rechargeRequest">
                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="phone">Phone Number</label>
                      <b-form-input
                          id="phone"
                          ref="phone"
                          size="lg"
                          v-model="fm.phone"
                          v-validate="{ required: true }"
                          :state="validateState('phone')"
                          aria-describedby="phone"
                          data-vv-as="phone"
                          trim
                          autofocus
                      />
                      <b-form-invalid-feedback>{{ veeErrors.first('phone') }}</b-form-invalid-feedback>
                    </div>

                    <div class="form-group div_txt">
                      <label style="font-size: 18px;font-weight: 600;" for="amount">Recharge Amount</label>
                      <b-form-input
                          id="amount"
                          v-model="fm.amount"
                          type="amount"
                          size="lg"
                          name="text"
                          v-validate="{ required: true }"
                          :state="validateState('amount')"
                          aria-describedby="amount"
                          data-vv-as="amount"></b-form-input>
                      <b-form-invalid-feedback>{{ veeErrors.first('amount') }}</b-form-invalid-feedback>
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

                    <vue-ladda
                        button-class="btn btn-success mt-2"
                        data-size="l"
                        data-style="zoom-in"
                        :loading="isSubmitted">
                      Request Recharge
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
  name: 'Recharge',
  data: () => ({
    isSubmitted: false,
    fm: {
      phone: '',
      operator: '',
      amount: ''
    },
    operators: [
      { id: 1, name: 'GP', type: 'recharge', number: '01766885733', note: '' },
      { id: 2, name: 'GP', type: 'recharge', number: '01716885733', note: '' },
      { id: 3, name: 'BN', type: 'recharge', number: '01616885733', note: '' }
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
    rechargeRequest () {
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
