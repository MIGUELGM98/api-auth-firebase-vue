<template >
    <table class="table table-success table-striped mt-3">
        <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoria</th>
              <th scope="col">Estado</th>
              <th scope="col">Numero</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tareas" :key="item.id">
              <th scope="row">{{item.id}}</th>
              <td>{{item.nombre}}</td>
              <!-- <td>{{item.categorias.join(', ')}}</td> -->
              <!-- <td v-html="item.categorias"></td> -->
              <td>
                  <span v-for="(cat,index) in item.categorias" :key="index">
                      {{cat}}
                      {{
                          item.categorias.length===index+1 ? '':', '
                      }}
                  </span>
              </td>
              <td>{{item.estado}}</td>
              <td>{{item.numero}}</td>
              <td>
                  <button class="btn btn-danger" @click="deleteTarea(item.id)">Eliminar</button>
                  <router-link 
                  class="btn btn-warning ml-2 btn-sm"
                  :to="{
                      name:'Editar',
                      params:{
                          id:item.id
                      }
                  }"                  
                  >
                      Editar
                  </router-link>
              </td>
            </tr>        
          </tbody>
      </table>
</template>
<script>

import {mapState,mapActions} from 'vuex'
export default {
    computed:{
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['deleteTarea'])
    },
}
</script>
<style >
    
</style>