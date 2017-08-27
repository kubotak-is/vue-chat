import vue from 'vue'
import firebase from 'firebase'
import app from 'components/app.vue'
import 'sanitize.css/sanitize.css'
import 'font-awesome/css/font-awesome.css'

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
})

new vue({
  el: '#app',
  data: {
    fb: firebase
  },
  render: h => h(app)
})
