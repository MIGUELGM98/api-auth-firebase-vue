import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas:[],
    tarea: {
      id:'',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user:null,
  },
  mutations: {
    setUser(state,payload){
      state.user=payload
    },

    set(state,payload){
      state.tareas.push(payload)
      console.log(state.tareas)
    },
    eliminar(state,payload){
      state.tareas=state.tareas.filter(item => item.id!==payload)

    },
    tarea(state,payload){
      if(!state.tareas.find(item => item.id===payload)){
        router.push('/')
        return
      }
      state.tarea=state.tareas.find(item => item.id===payload)
    },
    update(state,payload){
      state.tareas=state.tareas.map(item=> item.id===payload.id ? payload : item)
      router.push('/')
    },
    cargar(state,payload){
      state.tareas=payload
    }
  },
  actions: {
    cerrarSesion({commit}){
      commit('setUser',null)
        router.push('/ingreso')     
      localStorage.removeItem('usuario')   
    },
    
    async registrarUsuario({commit},usuario){
      console.log(usuario)
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVNPPRbMid9a4RpHxIjpX0_zfkx31YC-0',{
          method:'POST',
          body:JSON.stringify({
            email:usuario.email,
            password:usuario.password,
            returnSecureToken:true
          })
        })
        const userDB= await res.json();
        console.log(userDB)
        if(userDB.error){
          console.log(userDB.error)
          return
        }
        commit('setUser',userDB)
        router.push('/')
        localStorage.setItem('usuario',JSON.stringify(userDB))

      } catch (error) {
        console.log(error)
        
      }
    },
    async ingresoUsuario({commit}, usuario){
      console.log(usuario)
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVNPPRbMid9a4RpHxIjpX0_zfkx31YC-0',{
          method:'POST',
          body:JSON.stringify({
            email:usuario.email,
            password:usuario.password,
            returnSecureToken:true
          })
        })
        const userDB= await res.json()
        console.log('userdb',userDB)

        if(userDB.error){
          console.log(userDB.error)
          return commit('setError'.userDB.error.message)
        }
        commit('setUser',userDB)
        router.push('/')
        localStorage.setItem('usuario',JSON.stringify(userDB))

      } catch (error) {
        console.log(error)
        
      }
    },



    async cargarLocalStorage({commit,state}){
      try {
        if(localStorage.getItem('usuario')){
          commit('setUser',JSON.parse(localStorage.getItem('usuario')))
        }else{
          return commit('setUser',null)

        }

        const respuesta = await fetch(`https://udemy-api-1e3e9-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await respuesta.json()

        const arrayTareas=[];
        for(let id in dataDB){
          arrayTareas.push(dataDB[id])
        }
        commit('cargar',arrayTareas)

      } catch (error) {
        console.log(error)
        
      }

    },
    async setTareas({commit,state},tarea){
      try {
        const rest=await fetch(`https://udemy-api-1e3e9-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(tarea)
        })

        const dataDB= await rest.json();
        console.log(dataDB)

        commit('set', dataDB)
      } catch (error) {
        console.log(error)
        
      }
    },
    async deleteTarea({commit,state},id){
      try {
        const res = await fetch(`https://udemy-api-1e3e9-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,{
        method:'DELETE'
        })
      } catch (error) {
        console.log(error)
      }
      commit('eliminar',id)
    },
    setTarea({commit},id){
      commit('tarea',id)
    },
    async updateTarea({commit,state},tarea){
      try {
        const res = await fetch(`https://udemy-api-1e3e9-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,{
          method:'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB=await res.json()
        commit('update',dataDB)

      } catch (error) {
        console.log(error)
        
      }
    }
  },
  modules: {
  },
  getters:{
    usuarioAutenticado(state){
      return !!state.user
    }
  }
})
