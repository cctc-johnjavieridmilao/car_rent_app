<template>
    <div class="q-pa-md">
        <AdminSidebar />

       <p style="font-size: 17px;">Admin dashboard</p>

       <div class="row q-col-gutter-xs">
           <div class="col-md-4 col-sm-12 col-xs-12">
                <q-card class="my-card bg-primary">
                    <q-card-section>
                      <div class="text-h6">Total Accounts</div>
                   </q-card-section>
                    <q-card-section>
                       {{ dashboard.accounts }}
                    </q-card-section>
                </q-card>
           </div>
            <div class="col-md-4 col-sm-12 col-xs-12">
                <q-card class="my-card bg-info">
                    <q-card-section>
                      <div class="text-h6">Total Transactions</div>
                   </q-card-section>
                    <q-card-section>
                       {{ dashboard.transactions }}
                    </q-card-section>
                </q-card>
           </div>
            <div class="col-md-4 col-sm-12 col-xs-12">
                <q-card class="my-card bg-secondary">
                    <q-card-section>
                      <div class="text-h6">Total Vehicle Owners</div>
                   </q-card-section>
                    <q-card-section>
                       {{ dashboard.owner_accounts }}
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
import { ref,onMounted,getCurrentInstance } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue';
import axios from 'axios';


export default {
    components: {
        AdminSidebar
    },
    setup() {
        const dashboard = ref({
        accounts: 0,
        transactions: 0,
        owner_accounts: 0
      });
      const bar = ref(null);
      const app = getCurrentInstance();
      const url = app.appContext.config.globalProperties.ApiUrl;

    onMounted(() => {

       const barRef = bar.value;
       barRef.start();
           
           axios({
                method: 'GET',
                url: url+'/GetAdminDashboard',
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                const data = response.data[0];
                dashboard.value.accounts = data.accounts;
                dashboard.value.transactions = data.transactions;
                dashboard.value.owner_accounts = data.owner_accounts;
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
