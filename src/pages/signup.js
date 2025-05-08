
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router';
import Alert from './Alert';
import Image
 from 'next/image';
 import Spinner from './components/Spinner';
 import Head from 'next/head';
const Signup = () => {
  const[loading, setLoading]=useState(false);
  const router =useRouter();
  useEffect(()=>{
    if(localStorage.getItem('token')){
    router.push('/');
    }
  })
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [npassword,setnPassword]=useState('');
  const [number,setNumber]=useState('');
  const handleChange=(e)=>{
  if(e.target.name=="name"){
 setName(e.target.value)
  }
  else if(e.target.name=="email"){
    setEmail(e.target.value)
  }
  else if(e.target.name=="password"){
setPassword(e.target.value)
  }
  else if(e.target.name=="npassword"){
    setnPassword(e.target.value)
      }
  else if(e.target.name=="number"){
setNumber(e.target.value)
  }
  }
  
  
  const handleSubmit=async()=>{
   
    if(password!=npassword){
      toast.error("Password and confirm password didnot match .", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else if(number.length!=10){
      toast.error("Please Enter 10 digit mobile number", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else if(email.includes('@')==false&&email.includes('.')==false){
      toast.error("Please Enter Valid Email Address", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }
    else{
    setLoading(true)
        const data ={name,email:email.toLowerCase(),password,number,npassword};
        console.log(data)
        
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response=await res.json();
console.log(response)
    if(response.success){
      setLoading(false)
      setName('');
      setEmail('');
      setPassword('');
      setnPassword('');
     
      toast.success('Your account has been created successfully.Please Login', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(()=>{
          router.push("/login")
          },1000)
        }
    else if(response.success==false){
      setLoading(false)
      toast.error(response.message, {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
    }
  }
  
  return (
    <>
    {loading?<Spinner/>:<div>
      <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
<Head>
      <title>Sign Up - Project Studio </title>
      <meta name="description" content='SignUp to our hotel booking and food delivery website to unlock exclusive deals on accommodations and enjoy the convenience of seamless food delivery. Discover a world of exceptional hospitality and culinary delights with our secure login process!'/>
      <meta name="keywords" content="hotel booking, food delivery, accommodation, online reservations, gourmet dining, seamless service, delightful stay, convenient hospitality, doorstep delivery, culinary experience, vacation getaway, top-rated hotel, comfortable accommodations, exquisite cuisine, memorable retreat" />
     </Head>
     
      {/* <div className="flex flex-col justify-center px-6 py-6 lg:px-8 bg-white min-h-screen bg-[url('/loginbg.jpg')] object-cover">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <Image alt="logo" src="/prapplogo.png" width={180} height={60} className='m-auto'/>
    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
  </div>

  <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
    
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input onChange={handleChange} value={name} id="name" name="name" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 p-2" placeholder='Enter Your Name'/>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={handleChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 p-2 peer ..." placeholder='Enter Your Mobile Email'/>
          {email.length==0?"":<p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm font-bold">
      Please provide a valid email address.
    </p>}
        </div>
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">Mobile Number</label>
        <div className="mt-2">
          <input onChange={handleChange} value={number} id="number" name="number" type="number" autoComplete="number" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 p-2" placeholder='Enter Your Mobile Number'/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
          </div>
        </div>
        <div className="mt-2">
          <input onChange={handleChange} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 p-2 " placeholder='Enter Your Mobile Password'/>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="npassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div className="text-sm">
          </div>
        </div>
        <div className="mt-2">
          <input onChange={handleChange} value={npassword} id="npassword" name="npassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 p-2" placeholder='Enter Your Confirm Password'/>
        </div>
      </div>

      <div>
        <button onClick={handleSubmit} className=" my-4 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"> Continue</button>
      </div>
  

    <p className="mt-10 text-center text-sm text-gray-500">
      Already a member?
      <Link href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500"> Login</Link>
    </p>
  </div>
</div> */}
<>
<style jsx global>{`
        .animate-img {
          background-image: url("/sphere.webp");
          background-size: cover;
          background-repeat: no-repeat;
          z-index: -1;
          transform: translateY(-50%);
          position: absolute;
          left: -30%;
          bottom: auto;
          right: auto;
          top: 58%;
          animation: rotate360 30s linear infinite; /* Adjust duration as needed */
        }
        @keyframes rotate360 {
          0% {
            transform: translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateY(-50%) rotate(360deg);
          }
        }
      `}</style>

      <div className="">
        <img src="/sphere.webp" className=" animate-img w-100 h-full hidden lg:block md:block" />
        </div>
  <section className="bg-none">
    
    <div className="lg:grid lg:min-h-screen ">
      <main className="flex items-center justify-center px-8 py-6 sm:px-6 lg:px-6 lg:py-6 ">
        <div className="max-w-xl lg:max-w-3xl">
          
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl hidden lg:block">
        Create Your Account 
      </h1>
          <div  className="mt-8 grid grid-cols-6 gap-6">
            
            <div className="col-span-6 ">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-white"
              >
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={name}
                className="mt-1 w-full rounded-md border-gray-400 bg-white text-sm text-black shadow-sm p-3 border-2"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                onChange={handleChange} value={email} id="email" name="email"
                className="mt-1 w-full rounded-md border-gray-400 bg-white text-sm text-black shadow-sm p-3 border-2"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <input
                type="number"
                onChange={handleChange} value={number} id="number" name="number"
                className="mt-1 w-full rounded-md border-gray-400 bg-white text-sm text-black shadow-sm p-3 border-2"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                onChange={handleChange} value={password} id="password" name="password"
                className="mt-1 w-full rounded-md border-gray-400 bg-white text-sm text-black shadow-sm p-3 border-2 "
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-white"
              >
                Password Confirmation
              </label>
              <input
                type="password"
                onChange={handleChange} value={npassword} id="npassword" name="npassword" 
                className="mt-1 w-full rounded-md border-gray-400 bg-white text-sm text-black shadow-sm p-3 border-2"
              />
            </div>
            {/* <div className="col-span-6">
              <label htmlFor="MarketingAccept" className="flex gap-4">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                />
                <span className="text-sm text-white">
                  I want to receive emails about events, product updates and
                  company announcements.
                </span>
              </label>
            </div> */}
            <div className="col-span-6">
              <p className="text-sm text-white">
                By creating an account, you agree to our
                <a href="#" className="text-white underline mx-1">
                  terms and conditions
                </a>
                and
                <a href="#" className="text-white underline mx-1">
                  privacy policy
                </a>
                .
              </p>
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button onClick={handleSubmit} className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                Create an account
              </button>
              <p className="mt-4 text-sm text-white sm:mt-0">
                Already have an account? 
                <Link href="/login" className="text-white underline mx-2 ">
                  Log in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </section>
</>

    </div>}
    </>
  )
}

export default Signup

