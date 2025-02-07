import * as Yup from 'yup'

export let LogForm_Data = {
    INITIAL_VALUES : {
        email: '',
        password: ''
      },

    VALIDATION_SCHEMA: 
            Yup.object({
                email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
                password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Required')
            })
}