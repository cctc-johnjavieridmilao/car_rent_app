<template>
    <div class="q-pa-md">
        <AdminSidebar />

       <p style="font-size: 17px;">Vehicle management</p>


            <q-table
                  title="Vehicle Lists"
                  :rows="rows"
                  :columns="columns"
                  row-key="recid"
                  :filter="filter"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="owner_name" :props="props">
                    {{ props.row.fullname }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>
                  <q-td key="vehicle_type" :props="props">
                  {{ props.row.vehicle_type }}
                  </q-td>
                  <q-td key="specification" :props="props">
                    {{ props.row.specification.length > 35 ? props.row.specification.substring(0,35) + '...' : props.row.specification }}
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
                  <q-td key="approved_date" :props="props">
                    {{ props.row.approved_date }}
                  </q-td>
                  <q-td key="action" :props="props" class="q-gutter-xs">
                    <q-btn push  color="primary" :disable="props.row.status === 'FOR APPROVAL' ? false : true" rounded  label="" icon-right="find_in_page" size="sm" @click="ViewData(props.row.RecID)"/>
                </q-td>
                </q-tr>
              </template>

          <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>


            <q-ajax-bar
            ref="bar"
            position="top"
            color="accent"
            size="10px"
            skip-hijack
        />

    <q-dialog v-model="ConfirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="thumbs_up_down" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to approved this vehicle?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="red" v-close-popup />
          <q-btn flat label="Approved" @click="Approved" color="primary"/>
          <q-btn flat label="Disapproved" @click="DisApproved" color="secondary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import AdminSidebar from '../../components/AdminSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
    components: {
        AdminSidebar
    },
    setup() {
        const $q = useQuasar();
        const filter = ref('');
        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;
        const columns = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'OwnerName', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'VehicleType', field: 'vehicle_type', sortable: true },
            { name: 'specification', align: 'left', label: 'Specs', field: 'specification', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'approved_date', align: 'left', label: 'Approved At', field: 'approved_date', sortable: true },
             { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
        ];
        const rows = ref([]);
        const bar = ref(null);
        const ConfirmDialog = ref(false);
        const vehicle_id = ref(null);

        function getVehicles() {
          const barRef = bar.value;
          barRef.start();

            axios({
                method: 'GET',
                url: url+'/GetVehicles',
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                rows.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
                barRef.stop();
            })
        }

        function ViewData(id) {
            vehicle_id.value = id;
            ConfirmDialog.value = true;
        }

        function Approved() {
            const formdata = new FormData();
            const barRef = bar.value;
            barRef.start();

            formdata.append('vehicle_id', vehicle_id.value);
           
           axios({
                method: 'POST',
                url: url+'/ApprovedVehicle',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
               if(response.data.msg == 'success') {

                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Approved!'
                });

                   getVehicles();
                   ConfirmDialog.value = false;
               }
               barRef.stop();
            })
            .catch(err =>  {
                console.log(err);
            });
        }

        function DisApproved() {
             const formdata = new FormData();
            const barRef = bar.value;
            barRef.start();

            formdata.append('vehicle_id', vehicle_id.value);
           
           axios({
                method: 'POST',
                url: url+'/DisApprovedVehicle',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
               if(response.data.msg == 'success') {

                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Disapproved!'
                });

                   getVehicles();
                   ConfirmDialog.value = false;
               }
               barRef.stop();
            })
            .catch(err =>  {
                console.log(err);
            });
        }

        onMounted(() => {
            getVehicles();
        });
        
        return {
            filter,
            columns,
            rows,
            bar,
            ViewData,
            ConfirmDialog,
            Approved,
            DisApproved
        }
    }
}
</script>
