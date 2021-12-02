<template>
  <div
      class="text-left">

    <transition
        name="banking_transition"
        enter-active-class="animated zoomIn"
        leave-active-class="animated fadeOut"
        :duration="{enter: 800, leave: 100}"
    >
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header text-left text-18">
              Received Message Records
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
                  :per-page="perPage"
                  outlined
                  striped>
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
  name: 'Received',
  data: () => ({
    user: null,
    filter: null,
    filterOn: [],
    totalRows: 1,
    currentPage: 1,
    perPage: 5,
    pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
    fields: [
      {key: 'sl', label: 'SL'},
      {key: 'gsmid', label: 'Operator', sortable: true},
      {key: 'message', label: 'Message'},
      {key: 'receivedtime', label: 'Received Time', sortable: true}
    ],
    items: []
  }),
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.$http.get('index.php?table=received&_sort=desc&_order=id', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.user.accesToken}`
      }
    }).then(res => {
      if (res.data.status === 'success') {
        this.items = res.data.message
      } else {
        this.$notify({
          type: 'warn',
          title: 'Warning',
          text: res.data.message
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
