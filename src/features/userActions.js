import { toast } from "sonner"
import { api } from "../config/apis/axios"
import { USER_URLS } from "../config/apis/urls"

export async function login_admin(data) {
    try {
        console.log('calling api')
        const response = await api.post(USER_URLS.admin_login,data)
        console.log('login_admim actions', response, response.data)
        toast.success('Admin logged in successfully!')
        return response.data
    }
    catch (e) {
        console.error(e)
        if( e.status == 401) {
            toast.error('Unauthorised user')
        }
        else{
            toast.error(e.message)
        }
    }
}
export async function google_login(token) {
    try {
        console.log('calling api')
        const response = await api.post(USER_URLS.google_login,{token:token})
        console.log('google login actions', response, response.data)
        toast.success('User logged in successfully!')
        return response.data
    }
    catch (e) {
        console.error(e)
        toast.error(e.response.data['message'])
    }
}
export async function get_users_action(navigate) {
    try {
        console.log('calling api')
        const response = await api.get(USER_URLS.get_users)
        console.log('users display', response, response.data)
        return response.data
    }
    catch (e) {
        console.error(e.response.data)
        toast.error(e.response.data['detail'])
        navigate('/')
        
    }
}

export async function user_active_status_action(user_id) {
    try {
        console.log('calling api')
        const response = await api.post(USER_URLS.user_active_status, {user_id: user_id})
        if (response.status == 200) {
            toast.success(response.data['message'])
        }
    }
    catch (e) {
        console.error(e.response.data)
        toast.error(e.response.data['detail'])
        navigate('/')
        
    }
}