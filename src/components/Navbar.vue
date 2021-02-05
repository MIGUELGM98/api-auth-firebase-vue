<template>
     <div class="navbar navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">
            Formularios
        </router-link>>
        <div class="d-flex">
            <router-link to="/" 
            class="btn btn-dark" 
            v-if="usuarioAutenticado">
                Tareas
            </router-link> 
            <router-link to="/ingreso" 
            class="btn btn-dark" 
            v-if="!usuarioAutenticado">
                Ingresar
            </router-link> 
            <router-link to="/login" 
            class="btn btn-dark" 
            v-if="!usuarioAutenticado">
                Registrar
            </router-link>
            <button
            @click="cerrarSesion" 
            class="btn btn-dark" 
            v-if="usuarioAutenticado">
            Cerrar sesion</button>
        </div>
     </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed:{
        ...mapGetters(['usuarioAutenticado'])
    },
    methods:{
        ...mapActions(['cerrarSesion'])
    }
}
</script>
<style>
    
</style>