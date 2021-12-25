<template>
    <div class="q-pa-md bg-grey-3">
       <CustomerSidebar />

       <p style="font-size: 17px;"><b>MY TRANSACTIONS</b></p>

       <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-info text-white shadow-2"
          :breakpoint="0">
        
        <q-tab name="pending_pickup" label="PENDING FOR PICKUP" />
        <q-tab name="sched_for_pickup" label="SCHEDULED FOR PICKUP" />
        <q-tab name="on_progress" label="ON PROGRESS" />
        <q-tab name="returned" label="RETURN VEHICLES" />
        <q-tab name="done_transactions" label="DONE TRANSACTION" />
        <q-tab name="cancelled_transactions" label="CANCELLED" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending_pickup">
            <q-table
                  title="Pending Transactions"
                  :rows="rows_pending"
                  :columns="columns_pending"
                  row-key="recid"
                  :filter="filter_pending"
                  :dense="$q.screen.lt.md"
                   grid
                  hide-header
                >

                 <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>
                            <q-btn size="15px" flat dense round icon="cancel" @click="CancelTransaction(props.row.RecID)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_pending">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
                
        </q-tab-panel>

        <q-tab-panel name="sched_for_pickup">

           <q-table
                  title="Approved Transactions"
                  :rows="rows_approved"
                  :columns="columns_approved"
                  row-key="recid"
                  :filter="filter_approved"
                  :dense="$q.screen.lt.md"
                  grid
                  hide-header
                >

               <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>
                            <q-btn size="15px" flat dense round icon="thumb_up" @click="DonePickup(props.row.RecID)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_approved">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
           
                
        </q-tab-panel>


        <q-tab-panel name="on_progress">

           <q-table
                  title="OnProgress Transactions"
                  :rows="rows_onprogress"
                  :columns="columns_onprogress"
                  row-key="recid"
                  :filter="filter_onprogress"
                  :dense="$q.screen.lt.md"
                  grid
                  hide-header
                >

               <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>
                            <q-btn size="15px" flat dense round icon="undo" @click="ReturneVehicle(props.row.RecID)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_onprogress">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
           
                
        </q-tab-panel>



        <q-tab-panel name="returned">

           <q-table
                  title="For Return"
                  :rows="rows_return"
                  :columns="columns_return"
                  row-key="recid"
                  :filter="filter_return"
                  :dense="$q.screen.lt.md"
                  grid
                  hide-header
                >

               <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>
                            <q-btn size="15px" flat dense round icon="undo" @click="UpdateDoneTransaction(props.row.RecID)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_return">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
           
                
        </q-tab-panel>


         <q-tab-panel name="done_transactions">
           
                  <q-table
                  title="Completed Transactions"
                  :rows="rows_completed"
                  :columns="columns_completed"
                  row-key="recid"
                  :filter="filter_completed"
                  :dense="$q.screen.lt.md"
                   grid
                  hide-header
                >

              <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_completed">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
        </q-tab-panel>


         <q-tab-panel name="cancelled_transactions">


             <q-table
                  title="Cancelled Transactions"
                  :rows="rows_cancel"
                  :columns="columns_cancel"
                  row-key="recid"
                  :filter="filter_cancel"
                  :dense="$q.screen.lt.md"
                  grid
                  hide-header
                >

               <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_cancel">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
           
                 
        </q-tab-panel>
      </q-tab-panels>


      <q-ajax-bar ref="bar" position="top" color="accent" size="10px" skip-hijack/>

       <q-dialog v-model="ConfirmPickupDialog" full-width>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="primary" text-color="white" />
          <span class="q-ml-sm">Already pickup this vehicle?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes, already pickup" :disable="isDisabled" @click="ConfirmPickup" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="CancelTransactionDialog" full-width>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="cancel" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to cancel this transaction?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Yes, Cancel it" :disable="isDisabled" @click="Cancel" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>

      <q-dialog v-model="ConfirmReturnDialog" full-width>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="thumb_up" color="primary" text-color="white" />
          <span class="q-ml-sm">Done using this vehicle?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Yes, Already Done" :disable="isDisabled" @click="ConfirmDone" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

      <q-dialog v-model="ConfirmReturnedDialog" full-width>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="undo" color="primary" text-color="white" />
          <span class="q-ml-sm">Return this vehicle?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Yes, Return" :disable="isDisabled" @click="ReturnVehicle" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    

          <q-dialog v-model="ViewVehicleDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">

        <q-card-section>
          <div class="text-h6" style="font-size: 16px;">VEHICLE DETAILS: </div>
        </q-card-section>

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">
           <div class="row q-gutter-sm">
             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                  <q-input filled v-model="v_owner" readonly/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Pickup Address: </label>
                  <q-input filled v-model="v_address" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Name: </label>
                  <q-input filled v-model="v_name" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Type: </label>
                  <q-input filled v-model="v_type" readonly />
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Price: </label>
                  <q-input filled v-model="v_price" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Specification: </label>
                  <q-input type="textarea" filled v-model="v_specs" readonly />
              </div>
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
        </q-card-actions>

      </q-card>
    </q-dialog>

    <ChatSupport/>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import CustomerSidebar from '../../components/CustomerSidebar.vue';
import ChatSupport from '../../components/ChatSupport.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  components: {
    CustomerSidebar,
    ChatSupport
  },
    setup() {
       const app = getCurrentInstance();
       const $q = useQuasar();
       const filter_pending = ref('');
       const bar = ref(null)
       const url = app.appContext.config.globalProperties.ApiUrl;
       const ConfirmPickupDialog = ref(false);
       const tran_id = ref(0);
       const isDisabled = ref(false);
       const CancelTransactionDialog = ref(false);
       const ConfirmReturnDialog = ref(false);
       const ConfirmReturnedDialog = ref(false);

        const ViewVehicleDialog = ref(false);
        const v_owner = ref(null);
        const v_address = ref(null);
        const v_name = ref(null);
        const v_type = ref(null);
        const v_price = ref(null);
        const v_specs = ref(null);

       const columns_pending = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
        ];

       const rows_pending = ref([]);

       const columns_approved = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }
        ];

        const rows_approved = ref([]);
        const filter_approved = ref('');


         const columns_completed = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'updated_at', align: 'left', label: 'Updated At', field: 'updated_at', sortable: true }
        ];

        const rows_completed = ref([]);
        const filter_completed = ref('');

      const columns_cancel = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'cancel_at', align: 'left', label: 'Cancel At', field: 'cancel_at', sortable: false },
        ];

       const rows_cancel = ref([]);
       const filter_cancel = ref('');

       const columns_onprogress = [ { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }];

       const rows_onprogress = ref([]);
       const filter_onprogress = ref('');


        const columns_return = [ { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }];

       const rows_return = ref([]);
       const filter_return = ref('');

       function ViewData(data) {
        v_specs.value = data.row.vehicle_specs;
        v_owner.value = data.row.owner_name;
        v_address.value = data.row.pickup_address;
        v_name.value = data.row.vehicle_name;
        v_type.value = data.row.vehicle_type;
        v_price.value = data.row.price;
        ViewVehicleDialog.value = true;
      }


      function getCancelledTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'CANCELLED');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_cancel.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

      function getPendingTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'PENDING');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_pending.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

      function getApprovedTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'FOR PICKUP');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_approved.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

       function getOnProgress() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'ON-PROGRESS');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_onprogress.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

        function getReturnVehicles() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'FOR RETURN');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_return.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

      function getCompletedTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'COMPLETED');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_completed.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

      function DonePickup(id) {
        tran_id.value = id;
        ConfirmPickupDialog.value = true;
      }

      function ReturneVehicle(id) {
        tran_id.value = id;
        ConfirmReturnDialog.value = true;
      }

      function UpdateDoneTransaction(id) {
        tran_id.value = id;
        ConfirmReturnedDialog.value = true;
      }

      function ConfirmPickup() {
        
        const formdata = new FormData();
        const barRef = bar.value;
    
        formdata.append('id', tran_id.value);

        isDisabled.value = true;
        barRef.start();
            
          axios({
                method: 'POST',
                url: url+'/UpdateOnProgressTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                
              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Updated!'
                });
              }
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
              isDisabled.value = false;
              ConfirmPickupDialog.value = false;
              getApprovedTransactions();
              getOnProgress();
            })
      }

      function ConfirmDone() {
         const formdata = new FormData();
        const barRef = bar.value;
    
        formdata.append('id', tran_id.value);
        formdata.append('status', 'FOR RETURN');

        isDisabled.value = true;
        barRef.start();
            
          axios({
                method: 'POST',
                url: url+'/UpdateTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                
              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Updated!'
                });
              }
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
              isDisabled.value = false;
              ConfirmReturnDialog.value = false;
              getOnProgress();
              getReturnVehicles();
            })
      }

      function ReturnVehicle() {
         const formdata = new FormData();
        const barRef = bar.value;
    
        formdata.append('id', tran_id.value);
        formdata.append('status', 'COMPLETED');

        isDisabled.value = true;
        barRef.start();
            
          axios({
                method: 'POST',
                url: url+'/UpdateTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                
              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Vehicle Successfully Returned!'
                });
              }
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
              isDisabled.value = false;
              ConfirmReturnedDialog.value = false;
              getReturnVehicles();
              getCompletedTransactions();
            })
      }

      function CancelTransaction(id) {
        tran_id.value = id;
        CancelTransactionDialog.value = true;
      }

      function Cancel() {
        const formdata = new FormData();
        const barRef = bar.value;
    
        formdata.append('id', tran_id.value);

        isDisabled.value = true;
        barRef.start();
            
          axios({
                method: 'POST',
                url: url+'/CancelTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                
              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Cancelled!'
                });
              }
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
              isDisabled.value = false;
              CancelTransactionDialog.value = false;
              getPendingTransactions();
              getCancelledTransactions();
            })
      }

      onMounted(() => {
        getPendingTransactions();
        getApprovedTransactions();
        getCompletedTransactions();
        getCancelledTransactions();
        getOnProgress();
        getReturnVehicles();
      });

    return {
      tab: ref('pending_pickup'),
      filter_pending,
      bar,
      columns_pending,
      rows_pending,
      rows_approved,
      filter_approved,
      columns_approved,
      DonePickup,
      ConfirmPickupDialog,
      ConfirmPickup,
      isDisabled,
      filter_completed,
      rows_completed,
      columns_completed,
      getCompletedTransactions,
      CancelTransaction,
      CancelTransactionDialog,
      Cancel,
      rows_cancel,
      columns_cancel,
      filter_cancel,
       ViewVehicleDialog,
      ViewData,
      v_specs,
      v_owner,
      v_address,
      v_type,
      v_price,
      v_name,
      rows_onprogress,
      filter_onprogress,
      columns_onprogress,
      ReturneVehicle,
      ConfirmReturnDialog,
      ConfirmDone,
      columns_return,
      rows_return,
      filter_return,
      UpdateDoneTransaction,
      ConfirmReturnedDialog,
      ReturnVehicle
    }
                
   }
}
</script>
