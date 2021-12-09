<template>
    <div class="q-pa-md bg-grey-3">
       <OwnerSidebar />

       <p style="font-size: 17px;">Rent Reqeust</p>

       <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-info text-white shadow-2"
          :breakpoint="0">
        
        <q-tab name="pending_pickup" label="PENDING FOR PICKUP" />
        <q-tab name="sched_for_pickup" label="SCHEDULED FOR PICKUP" />
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
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="customer_name" :props="props">
                    {{ props.row.customer_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                  
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
                  </q-td>

                  <q-td key="price" :props="props">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                  </q-td>
                  <q-td key="action" :props="props">
                     <q-btn push  color="primary" rounded  label="" @click="ScheduleForPickup(props.row.RecID)" icon-right="event" size="sm"/>
                  </q-td>
                </q-tr>
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
                  :filter="filter_pending"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="customer_name" :props="props">
                    {{ props.row.customer_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                    
                  <q-td key="pickup_date" :props="props">
                    {{ props.row.pickup_date }}
                  </q-td>

                  <q-td key="pickup_time" :props="props">
                    {{ props.row.pickup_time }}
                  </q-td>

                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
                  </q-td>

                  <q-td key="price" :props="props">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                  </q-td>
                </q-tr>
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

         <q-tab-panel name="done_transactions">
               <q-table
                  title="Completed Transactions"
                  :rows="rows_completed"
                  :columns="columns_completed"
                  row-key="recid"
                  :filter="filter_completed"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="customer_name" :props="props">
                    {{ props.row.customer_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                  
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                   
                  <q-td key="pickup_date" :props="props">
                    {{ props.row.pickup_date }}
                  </q-td>

                  <q-td key="pickup_time" :props="props">
                    {{ props.row.pickup_time }}
                  </q-td>

                  <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
                  </q-td>

                  <q-td key="price" :props="props">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                  </q-td>
                  <q-td key="updated_at" :props="props">
                    {{ props.row.is_pickup_date }}
                  </q-td>
                
                </q-tr>
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
                  :rows="rows_cancelled"
                  :columns="columns_cancelled"
                  row-key="recid"
                  :filter="filter_cancelled"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="customer_name" :props="props">
                    {{ props.row.customer_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                  
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
                  </q-td>

                  <q-td key="price" :props="props">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                  </q-td>

                  <q-td key="cancelled_at" :props="props">
                    {{ props.row.cancelled_at }}
                  </q-td>
                  
                </q-tr>
              </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_cancelled">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
           </q-table>
        </q-tab-panel>
     </q-tab-panels>
    

      <q-ajax-bar ref="bar" position="top" color="accent" size="10px" skip-hijack/>

      <q-dialog v-model="PickUpDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">FOR PICKUP</div>
        </q-card-section>

        <q-separator />
       <q-form @submit.prevent="OnScheduled">

         <q-card-section style="max-height: 70vh;" class="scroll">
         
           <div class="row q-gutter-sm">
             <div class="col-md-12 col-sm-12 col-xs-12">
                 <q-input filled v-model="pick_date" mask="date" :rules="['date']" label="Pickup date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="pick_date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12">
                 <q-input filled v-model="pick_time" mask="time" :rules="['time']" label="Pickup time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                         <q-time v-model="pick_time" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12">
                  <q-input filled v-model="address" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type your address']" label="Address"/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <q-input type="textarea" filled v-model="remarks" lazy-rules :rules="[ val => val && val.length > 0 || 'Please eneter your remarks']" label="Remarks"/>
              </div>
              
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" :disable="isDisabled" label="Proceed" color="primary"/>
        </q-card-actions>

       </q-form>
        

      </q-card>
    </q-dialog>
    </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import OwnerSidebar from '../../components/OwnerSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  components: {
    OwnerSidebar
  },
    setup() {

      const $q = useQuasar();
      const app = getCurrentInstance();
      const bar = ref(null)
      const url = app.appContext.config.globalProperties.ApiUrl;
      const isDisabled = ref(false);
      const PickUpDialog = ref(false);
      const tran_id = ref(0);
      const pick_date = ref(null);
      const pick_time = ref(null);
      const address = ref(null);
      const remarks = ref(null);
      const tab = ref('pending_pickup');

       const columns_pending = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'Action', sortable: false }
        ];

      const rows_pending = ref([]);
      const filter_pending = ref('');

       const columns_approved = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true }
        ];

        const rows_approved = ref([]);
        const filter_approved = ref('');

         const columns_completed = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
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


        const columns_cancelled = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'cancelled_at', align: 'left', label: 'Cancelled at', field: 'cancelled_at', sortable: false }
        ];

      const rows_cancelled = ref([]);
      const filter_cancelled = ref('');


      function getCancelledTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'CANCELLED');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
                  data: formdata,
                  headers: { "Content-Type": "application/json" },
              })
              .then(response => {
                rows_cancelled.value = response.data;
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

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'COMPLETED');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
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

       function getPendingTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'PENDING');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
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

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'FOR PICKUP');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
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

      function OnScheduled() {

        const formdata = new FormData();
        formdata.append('id', tran_id.value);
        formdata.append('pickup_date', pick_date.value);
        formdata.append('time', pick_time.value);
        formdata.append('remarks', remarks.value);
        formdata.append('address', address.value);

        isDisabled.value = true;

         axios({
                method: 'POST',
                url: url+'/UpdateTransaction',
                data: formdata,
                headers: {"Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Transaction Success!'
                });
              }

              isDisabled.value = false;
              PickUpDialog.value = false;
              getPendingTransactions();

            })
            .catch(err =>  {
                console.log(err);
            });

      }

      function ScheduleForPickup(id) {
        PickUpDialog.value = true;
        tran_id.value = id;
      }

      onMounted(() => {
        getPendingTransactions();
        getApprovedTransactions();
        getCompletedTransactions();
        getCancelledTransactions();
      });

    return {
      tab,
      bar,
      filter_pending,
      columns_pending,
      rows_pending,
      isDisabled,
      PickUpDialog,
      OnScheduled,
      ScheduleForPickup,
      tran_id,
      pick_date,
      pick_time,
      address,
      remarks,
      columns_approved,
      rows_approved,
      filter_approved,
      columns_completed,
      rows_completed,
      filter_completed,
      columns_cancelled,
      filter_cancelled,
      rows_cancelled
    }
                
   }
}
</script>
