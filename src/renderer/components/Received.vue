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
  name: 'Received',
  data: () => ({
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
  })
}
</script>

<style scoped>

</style>
