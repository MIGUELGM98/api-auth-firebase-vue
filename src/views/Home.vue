<template>

  <h1 class="my-5">Formularios con Vue.js</h1>

  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"/>
  </form>
  <ListaTareas/>

</template>

<script>

import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
import {mapActions} from 'vuex'
const shortid= require('shortid');
export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
  },
  data() {
    return {
      tarea: {
        id:'',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim() === ""){
        console.log('Campo vacío')
        return
      }
      this.tarea.id=shortid.generate();
      console.log(this.tarea.id)

      //enviar los datos
      this.setTareas(this.tarea)




      // limpiar los campos
      this.tarea = {
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    },
    ...mapActions(['setTareas','cargarLocalStorage'])
  },
  created() {
    this.cargarLocalStorage()
  },
  
}
</script>
