<template>
    <div class="w-full">
        <div class="mb-5 grid grid-cols-1 md:grid-cols-2
            gap-4 justify-items-stretch px-4">
            <div>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block 
                     w-full p-2.5  
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    aria-describedby="file_input_help" id="file_input" type="file" accept=".txt"
                    @change="handleFileUpload">
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    Seleccione un archivo .txt.</p>
            </div>
        </div>
        <div class="mb-5 grid grid-cols-1 md:grid-cols-2
            gap-4 justify-items-stretch px-4">
            <div class="relative">
                <div class="absolute left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-12 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block 
                     w-full pl-10 p-2.5  
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="providers_term"
                    placeholder="Término de búsqueda">
            </div>
            <div>
                <select class="form-select form-select-lg mb-3
                appearance-none
                font-normal
                bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                w-full pl-10 p-2.5  
                dark:bg-gray-700 
                dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500
                hover:bg-gray-50 dark:hover:bg-gray-600
                " aria-label=".form-select-lg example" v-model="tolookfor">
                    <option value="name" selected>Abrir este menú de selección</option>
                    <option value="name">Nombre</option>
                    <option value="RFC">RFC</option>
                    <option value="email">Correo</option>
                </select>
            </div>
        </div>
        <div class="mb-5 grid grid-cols-2 xl:grid-cols-2 gap-4 justify-items-stretch mb-4 p-4">
            <button type="button" class="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium 
            text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg 
            focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 
            active:shadow-lg transition duration-150 ease-in-out" v-on:click="confirmed = 0"
                :class="{ 'bg-gray-900': !confirmed }">
                Rechazados</button>
            <button type="button" class="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium 
            text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg 
            focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 
            active:shadow-lg transition duration-150 ease-in-out" v-on:click="confirmed = 1"
                :class="{ 'bg-gray-900': confirmed }">
                Aceptados</button>
        </div>
      
        <div class="flex flex-col shadow-lg sm:rounded-lg">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase 
                            bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        RFC
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Correo
                                    </th>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="provider in _providers" :key="provider.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 
                                dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 
                                dark:text-white whitespace-nowrap">
                                        {{ provider.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ provider.RFC }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ provider.email }}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="font-medium text-blue-600 dark:text-blue-500 
                                    hover:underline" v-if="!confirmed" @click="acceptOrDecline(provider)">Aceptar</button>
                                        <button class="font-medium text-blue-600 dark:text-blue-500 
                                    hover:underline" v-else @click="acceptOrDecline(provider)">Rechazar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, inject, reactive, toRefs } from 'vue'

const swal = inject('$swal')
const props = defineProps({
    providers: Array
})
const emit = defineEmits(['setProviders', 'acceptOrDecline'])

const state = reactive({
    tolookfor: 'name',
    providers_term: '',
    confirmed: 0,
    _providers: computed(() => search())
})
const { providers_term, _providers, tolookfor, confirmed } = toRefs(state)
const checkStatus = async (response) => {
    if (response.status >= 200 && response.status < 300)
        return await response.json()

    throw await response.json()
}

function search() {
    return props.providers.filter((provider) => {
        if (provider.confirmed === state.confirmed) {
            return provider[`${state.tolookfor}`].toLowerCase().includes(state.providers_term.toLowerCase())
        }
    }
    )
}

function acceptOrDecline(update) {
    emit('acceptOrDecline', update)
}

function reloadProviders(update) {
    emit('setProviders', update)
}

function handleFileUpload(e) {
    let data = new FormData()
    data.append('name', e.target.files[0].name)
    data.append('file', e.target.files[0])

    fetch('http://127.0.0.1:8000/api/provider', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
        },
        method: 'post',
        body: data
    }).then(checkStatus)
        .then((data) => {
            reloadProviders(data.request)
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
</script>