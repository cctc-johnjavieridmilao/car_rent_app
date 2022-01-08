<template>
    <div class="q-pa-md bg-grey-3">
        <AdminSidebar />

       <p style="font-size: 17px;"><b>LIST OF VEHICLE TYPE</b></p>

       <q-btn color="primary" label="Add Item" icon-right="add" @click="AddVehicleType" /><br><br>

       <q-table
                  title=""
                  :rows="rows"
                  :columns="columns"
                  row-key="recid"
                  :filter="filter"
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
                            <span class="text-weight-medium">RecID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">VehicleType</span> <span class="text-grey-8">: {{ props.row.VehicleType }}</span><br>
  
                          </q-item-label>
                        </q-item-section>

                        <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="delete" @click="DeleteData(props)"/>
                            <q-btn size="12px" flat dense round icon="edit" @click="EditData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

          <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" style="width: 100%" color="primary" v-model="filter">
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



    <q-dialog v-model="AddDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Add Item</div>
        </q-card-section>

        <q-separator />
        <q-form class="q-gutter-sm" @submit.prevent="OnInsert" @reset="onReset">
        <q-card-section style="max-height: 50vh" class="scroll">
          
            <q-input filled v-model="vehicle_type" label="VehicleType" lazy-rules
              :rules="[ val => val && val.length > 0 || 'VehicleType is required']"
            />
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" label="Submit" color="primary"/>
        </q-card-actions>

         </q-form>
      </q-card>
    </q-dialog>


       <q-dialog v-model="EditDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Edit Item</div>
        </q-card-section>

        <q-separator />
        <q-form class="q-gutter-sm" @submit.prevent="OnUpdate" @reset="onReset">
        <q-card-section style="max-height: 50vh" class="scroll">
          
            <q-input filled v-model="e_vehicle_type" label="VehicleType" lazy-rules
              :rules="[ val => val && val.length > 0 || 'VehicleType is required']"
            />
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" label="Submit" color="primary"/>
        </q-card-actions>

         </q-form>
      </q-card>
    </q-dialog>

     <q-dialog v-model="ConfirmDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" @click="ConfirmDelete" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
      
  </div>
  <ChatSupport/>
</template>

<style scoped>
 .my-card {
     color: white;
 }
</style>

<script>
import { ref,onMounted,getCurrentInstance } from 'vue';
import AdminSidebar from '../../components/AdminSidebar.vue';
import axios from 'axios';
import ChatSupport from '../../components/ChatSupport.vue';
import { useQuasar } from 'quasar';


export default {
    components: {
        AdminSidebar,
        ChatSupport
    },
    setup() {
        const $q = useQuasar();
        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;

        const columns = [
            { name: 'RecID', align: 'left', label: 'RecID', field: 'RecID', sortable: true },
            { name: 'VehicleType', align: 'left', label: 'VehicleType', field: 'VehicleType', sortable: true },
            { name: 'Created_at', align: 'left', label: 'Created_at', field: 'Created_at', sortable: true },
            { name: 'IsActive', align: 'left', label: 'IsActive', field: 'IsActive', sortable: true },
        ];
        const rows = ref([]);
        const filter = ref('');
        const bar = ref(null);
        const AddDialog = ref(false);
        const EditDialog = ref(false);
        const vehicle_type = ref(null);
        const e_vehicle_type = ref(null);
        const recid = ref(null);
        const ConfirmDeleteDialog = ref(false);

         function getVehicleType() {
          const barRef = bar.value;
          barRef.start();

            axios({
                method: 'GET',
                url: url+'/GetVehicleType',
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

        function AddVehicleType() {
           AddDialog.value = true;
        }

        function OnInsert() {
         const formdata = new FormData();
         const barRef = bar.value;

         formdata.append('vehicle_type', vehicle_type.value);

         barRef.start();

           axios({
                method: 'POST',
                url: url+'/RegisterVehicleType',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Created!'
                });
              }

            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
               barRef.stop();
               AddDialog.value = false;
               vehicle_type.value = '';
               getVehicleType();
            })

        }

        function EditData(data) {
            recid.value = data.row.RecID;
            e_vehicle_type.value = data.row.VehicleType;
            EditDialog.value = true;
        }

        function DeleteData(data) {
            recid.value = data.row.RecID;
            ConfirmDeleteDialog.value = true;
        }

        function OnUpdate() {
        const formdata = new FormData();
         const barRef = bar.value;
         
         formdata.append('id', recid.value);
         formdata.append('vehicle_type', e_vehicle_type.value);

         barRef.start();

           axios({
                method: 'POST',
                url: url+'/UpdateVehicleType',
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
               EditDialog.value = false;
               getVehicleType();
            })
        }

        function ConfirmDelete() {
           const formdata = new FormData();
         const barRef = bar.value;
         
         formdata.append('id', recid.value);

         barRef.start();

           axios({
                method: 'POST',
                url: url+'/DeleteVehicleType',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Deleted!'
                });
              }

            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
               barRef.stop();
               ConfirmDeleteDialog.value = false;
               getVehicleType();
            })
        }

        onMounted(() => {
            getVehicleType();
        });

        return {
           columns,
           rows,
           filter,
           AddVehicleType,
           bar,
           AddDialog,
           OnInsert,
           vehicle_type,
           EditDialog,
           e_vehicle_type,
           recid,
           OnUpdate,
           EditData,
           ConfirmDeleteDialog,
           DeleteData,
           ConfirmDelete
        }
    }
}
</script>
