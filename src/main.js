import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import toast from '@/services/toast'

const app = createApp(App) // CREATE APPPPPPPPPPPPPPPPPPPPPPPPPPPP

// Global error handler Vue 3, biar visible haha bingung lo
app.config.errorHandler = (err, vm, info) => {
  // toast.error(`Error: ${err.message || err}`) // TOAST
  console.error(err) //CONSOLE LOG
}


app.use(router)
app.mount('#app')
