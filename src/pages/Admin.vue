<script setup>
import { reactive, toRefs, inject, onMounted} from "vue";
import ProvidersTable from '../components/Providers.vue'

const checkStatus = async (response) => {
    if (response.status >= 200 && response.status < 300)
        return await response.json()

    throw await response.json()
} 
const swal = inject('$swal')
const state = reactive({
    providers: []
})
const {providers} = toRefs(state)

function getProviders(update){
    fetch('http://127.0.0.1:8000/api/provider')
    .then((response) => response.json())
    .then((data)=> {
        state.providers = data
        if(update){
            swal({
                title: 'Exito!',
                text: 'Datos actualizados',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
    })
}

function setProviders(update){
    getProviders(update)
}

function acceptOrDecline(data){
    let form = new FormData()
	form.append('_method', 'PUT') 
    form.append('confirmed', (!data.confirmed) ? 1 : 0)  
    form.append('email', data.email)  
    form.append('RFC', data.RFC)  
    updateProvide(data.id, form) 
}

function updateProvide(id, data ){
    fetch('http://127.0.0.1:8000/api/provider/'+id, {
        headers: {
        'Accept':'application/json',
        'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`},
        method: 'post',
        body: data
    }).then(checkStatus)
    .then((data)=> {
        state.providers.map( (provide) =>{
            if(provide.id === data.data.id){
                provide.confirmed = (!provide.confirmed) ? 1 : 0
                return  provide
            }
        })
        swal({
            title: 'Exito!',
            text: `Datos actualizados de ${data.data.name}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }).catch((err) => {
        let list =``
        if(err.errors){
            let value = Object.values(err.errors)
            value.forEach(error => {
                list += `${error}</br>`
            });
        }
        
        swal({
            title: 'Error!',
            html: list, 
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    })   
}

onMounted(() => {
  getProviders(false)
})
</script>

<template>
    <div class="container  mx-auto">
        <div class="mt-10">
            <ProvidersTable v-model:providers="providers"
            @set-providers="setProviders"
            @accept-or-decline="acceptOrDecline"/>
        </div>
    </div>
</template>