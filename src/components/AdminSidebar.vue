<template>
    <div>
           <q-header elevated class="bg-deep-purple-7">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Welcome Admin</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="400"
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
                isDisabled: true
            },
            {
                icon: 'report',
                label: 'Transaction Lists',
                separator: true,
                path: '/admin/transactionlist',
                isDisabled: true
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
                 $q.sessionStorage.clear();
              }
            }
        }
    },
}
</script>