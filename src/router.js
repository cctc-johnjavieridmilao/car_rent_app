import { createWebHistory, createRouter } from "vue-router";
import Login from './views/Login.vue';
import Register from './views/Register.vue';


//ADMIN
import Admin from './views/admin/Admin.vue';
import AdminSettings from './views/admin/AdminSettings.vue';
import Usermanagement from './views/admin/Usermanagement.vue';
import Vehiclemanagement from './views/admin/VehicleManagement.vue';
import Transactionlist from './views/admin/TransactionList.vue';
import AdminRentHistory from './views/admin/AdminRentHistory.vue';
import BrandList from './views/admin/BrandList.vue';
import VehicleTypeList from './views/admin/VehicleTypeList.vue';

//OWNER
import Owner from './views/VehicleOwner/Owner.vue';
import OwnerSettings from './views/VehicleOwner/Settings.vue';
import OwnerVehicles from './views/VehicleOwner/Vehicles.vue';
import RentRequest from './views/VehicleOwner/RentRequest.vue';
import OwnerRentHistory from './views/VehicleOwner/OwnerRentHistory.vue';

//CUSTOMER
import Customer from './views/customer/Home.vue';
import CustomerSettings from './views/customer/Settings.vue';
import CustomerRent from './views/customer/RentVehicles.vue';
import CustomerRentHistory from './views/customer/CustomerRentHistory.vue';

//GLOBAL FILE
//import RentHistory from './views/global/RentHistory.vue';


const AdminsRoues = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
          requiresAuth: true,
        }
    },
    {
        path: '/admin/settings',
        name: 'admin.setting',
        component: AdminSettings,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/admin/usermanagement',
        name: 'admin.usermanagement',
        component: Usermanagement,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/admin/vehiclemanagement',
        name: 'admin.vehiclemanagement',
        component: Vehiclemanagement,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/admin/renthistory',
        name: 'admin.rent.history',
        component: AdminRentHistory,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/admin/transactionlist',
        name: 'admin.transactionlist',
        component: Transactionlist,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/admin/brandlist',
        name: 'admin.brandlist',
        component: BrandList,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/admin/vehicletypelist',
        name: 'admin.vehicletypelist',
        component: VehicleTypeList,
        meta: {
            requiresAuth: true,
          }
    },
];

const ownerRoutes = [
    {
        path: '/owner',
        name: 'owner',
        component: Owner,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/owner/settings',
        name: 'owner.setting',
        component: OwnerSettings,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/owner/rentrequest',
        name: 'owner.rentrequest',
        component: RentRequest,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/owner/renthistory',
        name: 'owner.rent.history',
        component: OwnerRentHistory,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/owner/vehicles',
        name: 'owner.vehicles',
        component: OwnerVehicles,
        meta: {
            requiresAuth: true,
          }
    },
];

const customerRoutes = [
    {
        path: '/customer',
        name: 'customer',
        component: Customer,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/customer/rentvehicles',
        name: 'customer.rentvehicle',
        component: CustomerRent,
        meta: {
            requiresAuth: true,
          }
    },
    {
        path: '/customer/settings',
        name: 'customer.settings',
        component: CustomerSettings,
        meta: {
            requiresAuth: true,
          }
    },

    {
        path: '/customer/renthistory',
        name: 'customer.rent.history',
        component: CustomerRentHistory,
        meta: {
            requiresAuth: true,
          }
    },

    
];

const routes = [...AdminsRoues,...ownerRoutes,...customerRoutes];

 const router = createRouter({
    history: createWebHistory(),
    routes
  });

  const usertype = (sessionStorage.getItem('usertype') != null ? sessionStorage.getItem('usertype').split('|')[1] : []);

  router.beforeEach((to, from, next) => {

    if(to.meta.requiresAuth) {

        if (sessionStorage.getItem('u_id') == null && to.name !== 'login') {
            next({ name: 'login' })
        }
        else { next() }

    }
    else { 
        if(sessionStorage.getItem('u_id') != null && (to.name === 'login' || to.name === 'register')) {

            if(usertype === 'Admin') {
                next({ name: 'admin' })
            } 

            else if(usertype === 'Owner') {
                next({ name: 'owner' })
            } 

            else if(usertype === 'Customer') {
                next({ name: 'customer' })
            }
           
        } else {next() }
   }
   
  })

export default router;
