import React, { useState } from 'react'
import api from '../api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { Eye, EyeOff, LockKeyhole, Mail, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password:"",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = await api.post("/auth/login", formData)
      console.log("Login Response:", response.data)
      dispatch(setCredentials({
        token: response.data.token,
        user:response.data.user
      }))
      navigate("/dashboard")
    } catch (error) {
       console.log("Login Error:", error)

      setError(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials."
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 mb-4'>
            <LockKeyhole size={28} />
          </div>
          <h1 className='text-3xl font-bold text-slate-900'>
            LeadFlow
          </h1>
          <p className='mt-2 text-sm text-slate-500'>
            Lead Management System
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 sm:p-8'>
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-slate-900'>
              Welcome back
            </h2>
            <p className='mt-1 text-sm text-slate-500'> 
              Sign in to continue to your dashboard.
            </p>
          </div>

          {error && (
            <div className='mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
              <div className='relative'>
                <Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  required
                  className='w-full h-11 rounded-lg border border-slate-300 bg-white pl-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400'
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
              <div className='relative'>
                <LockKeyhole size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full h-11 rounded-lg border border-slate-300 bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                />
                 <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button type='submit' disabled={loading} className='w-full h-11 rounded-lg bg-blue-600 text-white text-sm font-semibold transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
              {loading ? (
                <>
                  <Loader2 size={18} className='animate-spin' />
                  Signing in..
                </>
                ): ("Sign In")}
            </button>
          </form>
        </div>
        <p className='text-center text-xs text-slate-400 mt-6'>
          Lead Management System
        </p>
      </div>
    </div>
  )
}

export default Login