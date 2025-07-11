import React,{useContext, useState} from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import {validateEmail} from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';
import uploadImage from '../../utils/uploadImage.js';

const SignUp = () => {

  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFUllName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //handle signup page

  const handleSignUp = async(e)=>{
    e.preventDefault();
    
        if(!validateEmail(email)){
          setError("please enter valid email address.");
          return;
        }
    
        if(!fullName){
          setError("please enter your name ")
          return;
        }
        if(!password){
          setError("please enter the  password ")
          return;
        }
        setError("");

        //signup api call
        try { 

          // upload image if present
          let profileImageUrl = "";

          if(profilePic){
            const imgUploadRes = await uploadImage(profilePic);
            profileImageUrl = imgUploadRes.imageUrl || "";
          }

          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
            fullName,
            email,
            password,
            profileImageUrl,
          });
          const {token , user} = response.data;
          if(token){
            localStorage.setItem("token",token);
            updateUser(user);
            navigate("/dashboard");
          }
        } catch (error) {
          if(error.response && error.response.data.message){
            setError(error.response.data.message);
          }else{
            setError("Something went Wrong. Please try again");
          }
        }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'> Join us Today by entertaining your details below.</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image ={profilePic} setImage={setProfilePic}
          />


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({target})=>setFUllName(target.value)}
              label ="Full Name"
              placeholder="Aditi"
              type="text"
            />
          
            <Input
              value={email}
              onChange={({target})=>setEmail(target.value)}
              label ="Email Address"
              placeholder="aditi@example.com"
              type="text"
            />
          
            <div className='col-span-2' >
              <Input
              value={password}
              onChange={({target})=>setPassword(target.value)}
              label ="Password "
              placeholder="min 8 character"
              type="password"
            />
            </div>
            
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}


            <button type="submit" className="btn-primary">
              SignUp
            </button>
            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account?{""}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
        </form>
          
      </div>
    </AuthLayout>
  )
}

export default SignUp