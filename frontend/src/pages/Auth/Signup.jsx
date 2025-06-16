import { useState, useContext } from 'react'
import { Input } from '../../components/inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Autolayout } from '../../components/layouts/Autolayout'
import { ProfileSelector } from '../../components/ProfileSelector'
import axiosInstance from '../../utils/axiosInstances'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import uploadImage from '../../utils/uploadImage'

export const Signup = () => {
  const navigate = useNavigate()
  const { updateUser } = useContext(UserContext)
  const [fromData, setformData] = useState({
    fullname: "",
    email: "",
    password: ""
  })
  const [image, setImage] = useState(null)
  const [error, setError] = useState(true)


  const handleChange = (e) => {
    setformData({
      ...fromData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      let profileURL = " "
      if (image) {
        const imageUploads = await uploadImage(image);
        profileURL = imageUploads.imageURL
      }
      console.log({ ...fromData, profileURL })

      const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, { ...fromData, profileURL })
      const { token, user } = res.data
      console.log(user)

      if (token) {
        localStorage.setItem('token', token)
        toast.success("Successfully Signup")
        updateUser(user)
        navigate('/dashboard')
      }
    }

    catch (err) {
      console.log(err)
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Signup failed");
        setError(err.response.data.message || "Signup failed");
      } else {
        toast.error("Something went wrong");
        setError("Something went wrong");
      }
    }
    setformData({
      fullname: "",
      email: "",
      password: ""
    })
    setImage("")
    setTimeout(() => {
      setError("")
    }, 1000)
  }

  return (
    <Autolayout>
      <div className='lg:w-[100%] h-full flex flex-col justify-center md:mt-10 '>
        <h1 className='text-xl font-semibold'>Create an Account</h1>
        <p className='text-sm text-slate-700 mt-1 mb-6'>Join us today by entering your details below</p>

        <form onSubmit={handleSubmit} >
          <ProfileSelector image={image} setImage={setImage} />
          <div className='sm:grid grid-cols-2  gap-4'>
            <Input
              type='text'
              name='fullname'
              label='Fullname'
              placeholder='vasuki'
              value={fromData.fullname}
              onChange={handleChange}
            />

            <Input
              type='email'
              name='email'
              label='Email Address'
              placeholder='XYZ@gmail.com'
              value={fromData.email}
              onChange={handleChange}
            />
            <div className='col-span-2'>
              <Input
                type='password'
                name='password'
                label='Password'
                placeholder='Min 8 Character'
                value={fromData.password}
                onChange={handleChange}

              />
            </div>
          </div>
          {
            error && <p className='text-red-600 text-xs'>{error}</p>
          }

          <button type='submit' className='bg-purple-600 w-full p-3 my-4 rounded-lg transition-all shadow-md shadow-purple-500/50 hover:bg-purple-700 text-white'>SignUp</button>
        </form>
        <p>
          Already have an account?
          <Link to='/login' className='underline text-blue-500 text-primary'>
            Login
          </Link>
        </p>
      </div>
    </Autolayout>
  )
}
