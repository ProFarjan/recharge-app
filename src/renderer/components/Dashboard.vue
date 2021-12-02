<template>
  <div id="page_dashboard">
    <div class="main-content pt-4">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center"><i class="i-Add-User"></i>
              <div class="content" style="max-width: 100% !important;">
                <p class="text-muted mt-2 mb-0">Today's Recharge</p>
                <p class="text-primary text-24 line-height-1 mb-2">2500.20</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center"><i class="i-Financial"></i>
              <div class="content" style="max-width: 100% !important;">
                <p class="text-muted mt-2 mb-0">Today's Send</p>
                <p class="text-primary text-24 line-height-1 mb-2">25600</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center"><i class="i-Checkout-Basket"></i>
              <div class="content" style="max-width: 100% !important;">
                <p class="text-muted mt-2 mb-0">Today's Received</p>
                <p class="text-primary text-24 line-height-1 mb-2">26210</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
            <div class="card-body text-center"><i class="i-Money-2"></i>
              <div class="content" style="max-width: 100% !important;">
                <p class="text-muted mt-2 mb-0">Balance</p>
                <p class="text-primary text-24 line-height-1 mb-2">263000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      <div class="row">-->
<!--        <div class="col-lg-8 col-md-12">-->
<!--          <div class="card mb-4">-->
<!--            <div class="card-body">-->
<!--              <div class="card-title">Today Collection (User Wise)</div>-->
<!--              <v-chart class="chart" id="echartBar" style="height: 300px;" :option="BarOption" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-lg-4 col-sm-12">-->
<!--          <div class="card mb-4">-->
<!--            <div class="card-body">-->
<!--              <div class="card-title">Today Collection (Particulars Wise)</div>-->
<!--              <v-chart class="chart" id="echartPie" style="height: 300px;" :option="PieOption" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <div class="card mb-4">
            <div class="card-body text-left">
              <div class="card-title d-flex align-items-start border-0">Recharge Method Balance</div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Grameenphone (01766885733)</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Grameenphone (01723874659)</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Robi</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Airtel</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Banglalink</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Teletalk</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="card mb-4">
            <div class="card-body text-left">
              <div class="card-title">Banking Method Balance</div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="icons.gp" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">bKash (01966885733) -> Agent</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">bKash (01823874659) -> Personal</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Nogad</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">Rocket</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">MyCash</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" :src="logo" alt="" />
                <div class="flex-grow-1">
                  <h5><a href="">SureCase</a></h5>
                  <p class="m-0 text-small text-muted">
                    Lasted Checked (2021-10-10 12:01 AM)
                  </p>
                  <p class="text-small text-danger m-0">550</p>
                </div>
                <div>
                  <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                    Balance Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="card o-hidden mb-4">
                <div class="card-header d-flex align-items-start border-0">
                  <h3 class="float-left card-title m-0">Today's Transaction Records</h3>
                </div>
                <div>
                  <div class="table-responsive">
                    <table class="table text-center" id="user_table">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Payment Type</th>
                        <th scope="col">Method</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Note</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Smith Doe</td>
                        <td><img class="rounded-circle m-0 avatar-sm-table" :src="logo" alt="" /></td>
                        <td>Smith@gmail.com</td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jhon Doe</td>
                        <td><img class="rounded-circle m-0 avatar-sm-table" :src="logo" alt="" /></td>
                        <td>Jhon@gmail.com</td>
                        <td><span class="badge badge-info">Pending</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Alex</td>
                        <td><img class="rounded-circle m-0 avatar-sm-table" :src="logo" alt="" /></td>
                        <td>Otto@gmail.com</td>
                        <td><span class="badge badge-warning">Not Active</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Mathew Doe</td>
                        <td><img class="rounded-circle m-0 avatar-sm-table" :src="logo" alt="" /></td>
                        <td>Mathew@gmail.com</td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      logo: require('./../assets/images/Angular_Icon.png'),
      icons: {
        gp: require('./../assets/images/gp.jpg')
      }
    }
  }
}
</script>


<style scoped>

</style>
