<template>
  <h1>Registro de Usuarios</h1>

  <form @submit.prevent="procesarFormulario">
    <input 
    type="email" 
    placeholder="email"
    class="form-control my-2"
    v-model.trim="email"
    >
    <input 
    type="password" 
    placeholder="password" 
    class="form-control my-2"
    v-model.trim="pass1"
    >
    <input 
    type="password" 
    placeholder="password" 
    class="form-control my-2"
    v-model.trim="pass2"
    >
    <button class="btn btn-primary" type="submit" :disabled="bloquear">Registrar</button>
  </form>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            email: 'migue@gmail.com',
            pass1:'123456',
            pass2:'123456'
        }
    },
    computed:{
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass1.length > 5 && this.pass1===this.pass2){
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['registrarUsuario']),
        procesarFormulario(){
            this.registrarUsuario({email:this.email,password:this.pass1})
            this.email='';
            this.pass1='';
            this.pass2='';
        }
    },
};
</script>
