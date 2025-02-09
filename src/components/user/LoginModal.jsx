import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Cloud } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { LogForm_Data } from '../../features/datas/user_datas';
import { google_login, login_admin } from '../../features/userActions';
import { loginUser } from '../../redux/userSlice';
import { useGoogleLogin } from '@react-oauth/google';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleGoogleLogin = useGoogleLogin({
      onSuccess: async  tokenResponse => {
        console.log(tokenResponse)
        const userInfo = await google_login(tokenResponse.access_token)
        
        console.log(userInfo,"userInfo");
        if (userInfo) {
          dispatch(loginUser(userInfo))

        }
  
        
      }
      
    });

  const formik = useFormik({
    initialValues: LogForm_Data.INITIAL_VALUES,
    validationSchema: LogForm_Data.VALIDATION_SCHEMA,
    onSubmit: (values) => {
      setIsLoading(true);
      login_admin({ ...values, user_type: 'admin' })
        .then((res) => {
          if (res) {
            dispatch(loginUser(res));
          }
        })
        .catch((error) => {
          if (error.response?.data?.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error('An unknown error occurred. Please try again.');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-sky-500/50 to-teal-600/50 backdrop-blur-sm flex items-center justify-center z-50 ${
        !user.logged_in ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto relative overflow-hidden">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 mb-6">
          <Cloud className="h-8 w-8 text-teal-500" />
          <span className="text-xl font-bold text-gray-800">Nimbus</span>
        </div>

        <h2 className="text-gray-800 text-3xl font-bold mb-2">Welcome to Nimbus</h2>
        <p className="text-gray-600 text-sm mb-6">
          Access your weather insights and personalized forecasts
        </p>

        {!showAdminForm ? (
          <div className="space-y-4">
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-4 text-sm text-gray-500">or</span>
              <div className="border-t border-gray-200 w-full"></div>
            </div>

            {/* Switch to Admin Login */}
            <button
              onClick={() => setShowAdminForm(true)}
              className="w-full bg-gray-100 text-gray-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            >
              Sign in as Administrator
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Admin Password"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible color="gray" /> : <AiFillEye color="gray" />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              >
                {isLoading ? 'Logging in...' : 'Login as Admin'}
              </button>
            </form>

            <button
              onClick={() => setShowAdminForm(false)}
              className="w-full bg-gray-100 text-gray-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            >
              Back to User Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;