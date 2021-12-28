<template>
    <div>
          <q-header elevated class="bg-deep-purple-7">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
           <q-toolbar-title>Carku: Rental Vehicle</q-toolbar-title>
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
              <q-item clickable :to="{ path: menuItem.path }" :disable="menuItem.isDisabled" @click="Logout(menuItem.label)" v-ripple>
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
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
             <div class="text-weight-bold">{{ fullname }}</div>
            <div>{{ usertype }}</div>
          </div>
        </q-img>
      </q-drawer>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import router from '../router';

export default {
    setup() {

      const menuList = [
        {
            icon: 'home',
            label: 'Dashboard',
            separator: true,
            path: '/owner',
            isDisabled: false
        },
        {
            icon: 'settings',
            label: 'Settings',
            separator: true,
            path: '/owner/settings',
            isDisabled: false
        },
        {
            icon: 'report',
            label: 'Lists of Vehicles',
            separator: true,
            path: '/owner/vehicles',
            isDisabled: false
        },
         {
            icon: 'report',
            label: 'Rent Request',
            separator: true,
            path: '/owner/rentrequest',
            isDisabled: false
        },
         {
            icon: 'dashboard',
            label: 'Rent History',
            separator: true,
            path: '/owner/renthistory',
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

    return {
        menuList,
        drawer: ref(false),
        fullname: $q.sessionStorage.getItem('fullname'),
        usertype: $q.sessionStorage.getItem('usertype'),
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
                
   }
}
</script>
