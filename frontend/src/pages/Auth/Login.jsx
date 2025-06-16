import { useContext, useState } from 'react'
import { Input } from '../../components/inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Autolayout } from '../../components/layouts/Autolayout'
import axiosInstance from '../../utils/axiosInstances'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'
import { toast } from 'react-hot-toast'

export const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext)
  const [formData, setformData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSumbit = async (e) => {
    setError("")
    e.preventDefault()
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem('token', token);
        toast.success("Successfully login")
        updateUser(user)
        navigate('/dashboard')
      }
      else {
        setError("Login failed, please try again");
      }
    }
    catch (err) {
      if (err.response.data.message && err.response.data) {
        toast.error(`${err.response.data.message}`)
        setError(err.response.data.message|| "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
      console.log(err.response.data.message)
    }

    setformData({
      email: "",
      password: ""
    })

    setTimeout(()=>{
      setError("")
    },1000)
  }

  return (
    <Autolayout>
      <div className='lg:w-[70%] flex flex-col justify-center h-full'>
        <h1 className='text-xl font-semibold'>Welcome Back</h1>
        <p className='text-sm text-slate-700 mt-1 mb-6'>Please enter your details to login</p>

        <form onSubmit={handleSumbit} >
          <Input
            type='email'
            name='email'
            label='Email Address'
            placeholder='XYZ@gmail.com'
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type='password'
            name='password'
            label='Password'
            placeholder='Enter Valid Password'
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className='text-red-600 text-xs mt-2'>{error}</p>}

          <button type='submit' className='bg-purple-600 w-full p-3 my-4 rounded-lg transition-all shadow-md shadow-purple-500/50 hover:bg-purple-700 text-white'>Login</button>
        </form>
        <p>
          Don't have an account?
          <Link to='/signup' className='underline text-blue-500 text-primary'>
            SignUp
          </Link>
        </p>
      </div>
    </Autolayout>
  )
}
