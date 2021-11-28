<template>
    <div class="q-pa-md">
       <OwnerSidebar />

       <p style="font-size: 17px;">Owner dashboard</p>

         <div class="row q-col-gutter-xs">
           <div class="col-md-3 col-sm-12 col-xs-12">
                <q-card class="my-card bg-primary">
                    <q-card-section>
                      <div class="text-h6">Pending request</div>
                   </q-card-section>
                    <q-card-section>
                        {{ dashboard.pending }}
                    </q-card-section>
                </q-card>
           </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
                <q-card class="my-card bg-info">
                    <q-card-section>
                      <div class="text-h6">For pickup</div>
                   </q-card-section>
                    <q-card-section>
                         {{ dashboard.for_pickup }}
                    </q-card-section>
                </q-card>
           </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
                <q-card class="my-card bg-secondary">
                    <q-card-section>
                      <div class="text-h6">Completed</div>
                   </q-card-section>
                    <q-card-section>
                        {{ dashboard.approved }}
                    </q-card-section>
                </q-card>
           </div>
           <div class="col-md-3 col-sm-12 col-xs-12">
                <q-card class="my-card bg-red">
                    <q-card-section>
                      <div class="text-h6">Cancelled</div>
                   </q-card-section>
                    <q-card-section>
                       {{ dashboard.cancelled }}
                    </q-card-section>
                </q-card>
           </div>
       </div>

       <q-ajax-bar
        ref="bar"
        position="top"
        color="accent"
        size="10px"
        skip-hijack
      />
    </div>
</template>

<style scoped>
 .my-card {
     color: white;
 }
</style>

<script>
/* eslint-disable no-undef */
import { ref,onMounted,getCurrentInstance } from 'vue'
import OwnerSidebar from '../../components/OwnerSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  components: {
    OwnerSidebar
  },
    setup() {
      const dashboard = ref({
        pending: 0,
        approved: 0,
        for_pickup: 0,
        cancelled: 0,
      });
      const $q = useQuasar();
      const bar = ref(null);
      const app = getCurrentInstance();
      const url = app.appContext.config.globalProperties.ApiUrl;

      onMounted(() => {

      const formdata = new FormData();
       const barRef = bar.value;
       barRef.start();

       formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
           
           axios({
                method: 'POST',
                url: url+'/GetOwnerDashboard',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                const data = response.data[0];
                dashboard.value.pending = data.pending;
                dashboard.value.approved = data.completed;
                dashboard.value.for_pickup = data.pickup;
                dashboard.value.cancelled = data.cancelled;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
         
      });

    return {
       dashboard,
       bar
    }
                
   }
}
</script>
