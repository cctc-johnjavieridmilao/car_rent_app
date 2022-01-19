<template>
    <div>
        <q-header elevated class="bg-deep-purple-7">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title style="font-size: 18px;">Rent N' Go</q-toolbar-title>
           <q-btn flat @click="Logout('Logout')" round dense icon="logout" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="300"
        :breakpoint="400"
        overlay
        class="bg-grey-3"
        bordered
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list>

            <div v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :to="{ path: menuItem.path }" :disable="menuItem.isDisabled" v-ripple @click="Logout(menuItem.label)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </div>

          </q-list>
        </q-scroll-area>

         <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
               <img :src="profile == null || profile == '' ? 'https://cdn.quasar.dev/img/boy-avatar.png' : upload_url + profile">
            </q-avatar>
            <div class="text-weight-bold">{{ fullname }}</div>
            <div>{{ usertype }}</div>
          </div>
        </q-img>
      </q-drawer>
    </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import router from '../router';
import axios from 'axios';

export default {
    setup() {
            const menuList = [
            {
                icon: 'home',
                label: 'Dashboard',
                separator: true,
                path: '/admin',
                isDisabled: false
            },
            {
                icon: 'settings',
                label: 'Settings',
                separator: true,
                path: '/admin/settings',
                isDisabled: false
            },
            {
                icon: 'account_box',
                label: 'User management',
                separator: true,
                path: '/admin/userManagement',
                isDisabled: false
            },
            {
                icon: 'car_rental',
                label: 'Vehicle management',
                separator: true,
                path: '/admin/vehicleManagement',
                isDisabled: false
            },
            {
                icon: 'report',
                label: 'Transaction Lists',
                separator: true,
                path: '/admin/transactionlist',
                isDisabled: false
            },
            {
                icon: 'dashboard',
                label: 'Rent History',
                separator: true,
                path: '/admin/renthistory',
                isDisabled: false
            },
            {
                icon: 'report',
                label: 'Vehicletype Lists',
                separator: true,
                path: '/admin/vehicletypelist',
                isDisabled: false
            },
            {
                icon: 'report',
                label: 'Brand Lists',
                separator: true,
                path: '/admin/brandlist',
                isDisabled: false
            },
            {
                icon: 'logout',
                label: 'Logout',
                separator: true,
                path: '/',
                isDisabled: false
            }
        ];

        const $q = useQuasar();
        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;
        const profile = ref(null);

        onMounted(() => {
        const formdata = new FormData();
          formdata.append('uid', $q.sessionStorage.getItem('u_id'));
            axios({
                method: 'POST',
                url: url+'/GetProfile',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
              const res = response.data[0];
              profile.value = res.profile;

            })
            .catch(err =>  {
                console.log(err);
            });
      });

        return {
            menuList,
            drawer: ref(false),
            fullname: $q.sessionStorage.getItem('fullname'),
            usertype: $q.sessionStorage.getItem('usertype'),
            profile,
            upload_url: app.appContext.config.globalProperties.UploadUrl,
            Logout(label) {
              if(label == 'Logout') {
                if(confirm('Are you sure you want to logout?') == false) {
                  return false;
                } 
                 $q.sessionStorage.clear();
                  router.push({ path: '/' })
              }
            }
        }
    },
}
</script>