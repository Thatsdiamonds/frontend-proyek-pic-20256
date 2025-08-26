import { useToast } from 'vue-toast-notification'

// Komponen buat notifikasi

const toast = useToast()

export default {
  success(msg, options = {}) {
    toast.success(msg, { position: 'bottom-left', duration: 3000, ...options })
  },
  error(msg, options = {}) {
    toast.error(msg, { position: 'bottom-left', duration: 3000, ...options })
  },
  info(msg, options = {}) {
    toast.info(msg, { position: 'bottom-left', duration: 3000, ...options })
  },
  warning(msg, options = {}) {
    toast.warning(msg, { position: 'bottom-left', duration: 3000, ...options })
  }
}
