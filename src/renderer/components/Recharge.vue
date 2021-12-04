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

              <b-input-group size="sm" class="mb-2">
                <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                ></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>

              <b-table
                  :busy="(items.length == 0)"
                  small
                  :fields="fields"
                  :items="items"
                  responsive="sm"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  @filtered="onFiltered"
                  :current-page="currentPage"
                  :per-page="perPage">
                <!-- A virtual column -->
                <template #cell(sl)="data">
                  {{ data.index + 1 }}
                </template>

                <!-- Optional default data cell scoped slot -->
                <template #cell()="data">
                  <i>{{ data.value }}</i>
                </template>

                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
              </b-table>

              <b-row>
                <b-col sm="4" class="my-1">
                  <b-form-group
                      label-for="per-page-select"
                      label-cols-sm="6"
                      label-cols-md="4"
                      label-cols-lg="3"
                      label-align-sm="left"
                      label-size="sm"
                      class="mb-0"
                  >
                    <b-form-select
                        id="per-page-select"
                        v-model="perPage"
                        :options="pageOptions"
                        size="sm"
                    ></b-form-select>
                  </b-form-group>
                </b-col>

                <b-col sm="8" class="my-1">
                  <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      align="fill"
                      size="sm"
                      class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>

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
    user: null,
    isSubmitted: false,
    filter: null,
    filterOn: [],
    totalRows: 1,
    currentPage: 1,
    perPage: 5,
    pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
    fm: {
      phone: '',
      operator: null,
      amount: ''
    },
    operators: [],
    fields: [
      {key: 'sl', label: 'SL'},
      'phone',
      'amount',
      'sendingtime'
    ],
    items: []
  }),
  computed: {
    getGsmIds () {
      let ids = []
      for (let operator of this.operators) {
        ids.push(operator.id)
      }
      return ids.join(',')
    }
  },
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
        const serialPort = this.$root.$data.port[this.fm.operator.index]
        const ussdPhone = this.fm.operator.ussdsend.replace('phone', this.fm.phone)
        var ussd = ussdPhone.replace('amount', this.fm.amount)
        if (ussd) {
          this.$root.ussd(serialPort, ussd)
          this.$http.post('index.php?table=sent', {
            gsmid: this.fm.operator.id,
            phone: this.fm.phone,
            amount: this.fm.amount,
            userid: this.user.id,
            sendingtime: new Date().toJSON().slice(0, 19).replace('T', ' ')
          }, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.user.accesToken}`
            }
          }).then(res => {
            if (res.data.status === 'success') {
              this.resetFM()
              this.$refs['phone'].focus()
              this.$notify({
                type: 'success',
                title: 'success',
                text: 'Send Request Successfully Submitted'
              })
              this.getLastItems()
            } else {
              this.$notify({
                type: 'warn',
                title: 'Warning',
                text: res.data.message
              })
            }
            this.isSubmitted = false
          })
        }
      })
    },
    resetFM () {
      this.fm.operator = this.fm.phone = this.fm.amount = ''
    },
    async getLastItems () {
      await this.$http.get('index.php?table=sent&gsmid_in=' + this.getGsmIds + '&_limit=500&_sort=desc&_order=id', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.user.accesToken}`
        }
      }).then(res => {
        if (res.data.status === 'success') {
          this.items = res.data.message
        }
      })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.operators = this.$root.$data.gsm
    this.getLastItems()
  }
}
</script>

<style scoped>

</style>
