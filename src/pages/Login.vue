<script setup>
import { reactive, toRefs, inject } from "vue";
import { useRouter} from 'vue-router'

const swal = inject('$swal')
const router = useRouter()
const emit = defineEmits(['isLogin'])

const checkStatus = async (response) => {
    if (response.status >= 200 && response.status < 300)
        return await response.json()

    throw await response.json()
} 

const state = reactive({
    providers: [],
    form: {
        email: '',
        password: ''
    }
})

const { providers, form } = toRefs(state)

function login() {

    var data = new FormData();
    data.append("email", state.form.email);
    data.append("password", state.form.password);

    fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'post',
        body: data
    })
        .then(checkStatus)
        .then(function (data) {
            localStorage.setItem('isLogin', true )
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('token_type', data.token_type)
            localStorage.setItem('expires_in', data.expires_in)
            localStorage.setItem('isAdmin', data.user.admin)
            localStorage.setItem('user', JSON.stringify(data.user))
            emit('isLogin')
            if(data.user.admin){
                router.push('/admin')
            }else{
                router.push('/provider')
            }
        }).catch((err) => {
            swal({
                title: 'Error!',
                text: err.error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    ) 

}

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 class="text-2xl font-bold text-center">Ingrese a su cuenta</h3>
            <form v-on:submit.prevent="login">
                <div class="mt-4 mx-4">
                    <div>
                        <label class="block" for="email">Correo</label>
                        <input v-model="form.email" type="text" placeholder="Email" 
                        class="w-full px-12 py-2 mt-2 border rounded-md focus:outline-none
                            focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div class="mt-4">
                        <label class="block">Contraseña </label>
                        <input v-model="form.password" type="password" placeholder="Contraseña" 
                        class="w-full px-12 py-2 mt-2 border rounded-md 
                        focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button class="px-6 py-2 mt-4 text-white bg-blue-600 
                    rounded-lg hover:bg-blue-900">Ingresar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>