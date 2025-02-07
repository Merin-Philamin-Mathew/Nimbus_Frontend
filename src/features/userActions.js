import { toast } from "sonner"
import { admin_api, api } from "../config/apis/axios"
import { USER_URLS } from "../config/apis/urls"

export async function login_admin(data) {
    try {
        console.log('calling api')
        const response = await admin_api.post(USER_URLS.admin_login,data)
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
            toast .error(e.message)
        }
    }
}
export async function google_login(token) {
    try {
        console.log('calling api')
        const response = await admin_api.post(USER_URLS.google_login,{token:token})
        console.log('google login actions', response, response.data)
        toast.success('User logged in successfully!')
        return response.data
    }
    catch (e) {
        console.error(e)
    }
}