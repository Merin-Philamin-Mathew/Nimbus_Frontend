import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Cloud } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { LogForm_Data } from '../../features/datas/user_datas';
import { login_admin } from '../../features/userActions';
import { loginUser, logoutUser } from '../../redux/userSlice';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: LogForm_Data.INITIAL_VALUES,
    validationSchema: LogForm_Data.VALIDATION_SCHEMA,
    onSubmit: (values) => {
      setIsLoading(true);
      console.log('logging in ....')
      login_admin({ ...values, user_type: 'admin' })
        .then((res) => {
          console.log('api response', res);
          if (res) {  // Ensure res is not null or undefined before dispatching
            dispatch(loginUser(res));
            navigate('/', { replace: true });
          }
        })
        .catch((error) => {
          console.log(error.response.data, 'errorr');
          if (error.response && error.response.data && error.response.data.error) {
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

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Password"
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
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            {isLoading ? 'Logging in...' : 'Access Nimbus'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;