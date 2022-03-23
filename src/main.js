import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// require('jquery');
// require('jszip');
// require('pdfmake');
// require('datatables.net-bs5')();
// require('datatables.net-buttons-bs5')();
// require('datatables.net-buttons/js/buttons.colVis.js')();
// require('datatables.net-buttons/js/buttons.html5.js')();
// require('datatables.net-buttons/js/buttons.print.js')();
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

createApp(App).use(router).mount('#app')