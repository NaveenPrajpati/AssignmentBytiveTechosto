import React, { createContext, useContext } from 'react'
import { useEffect } from 'react'

import { useState } from 'react'
import { useNavigate, Navigate, Link, NavLink } from 'react-router-dom'
import { deleteUser, getUsers, likeUser, updateUser } from '../service/userService'
import { toast } from 'react-hot-toast'
import { PhoneOutlined, MailOutlined, GlobalOutlined, HeartOutlined, EditOutlined, DeleteOutlined, HeartFilled, DeleteFilled, CloseOutlined } from '@ant-design/icons'
import { BeatLoader } from 'react-spinners'

export default function UserList() {

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('all');
    const[edituser,setEdituser]=useState(false);
    const[newUser,setNewUser]=useState({});
    const[like,setLike]=useState(false);

    const callApi=async()=>{
      await getUsers()
      .then(response =>{ setUserData(response.data.dat)
      setLoading(false)
      })
      .catch(error=>
           console.log(error))  

      }
       
    useEffect(() => {
      setLoading(true)
      callApi()
      }, [])
  

      //function to handle delete request
    function handleDelete(id) {
        deleteUser(id)
        .then(res=>{
            toast(res.data.message)
            callApi()
        })
        .catch(error=>{
            console.log(error)
        })
    }


 

    function handleLike(id){
      setLike(!like)
      likeUser(id,{like:!like})
      .then(res=>{
        callApi()
    })
    .catch(error=>{
        console.log(error)
    })
        
    }
    function handleUpdate(use){
        setEdituser(true)
        setNewUser(use);
    }
  

    function handleChange(event){
        const val=event.target.value;
        setNewUser({...newUser,[event.target.name]:val});
      }

 function updateNewUser(event){
  event.preventDefault()
     updateUser(newUser,newUser._id)
     .then((res)=>{
        console.log(res.data.message)
        toast('user updated successfully')
        setEdituser(false)
        callApi()
   
      })
      .catch(error=>console.log(error))
    }


    return (
        <div className='relative'>
        
         {<div className={` absolute ${edituser?'opacity-30 bg-slate-100':''}`}> 

            <div className='flex gap-2 flex-wrap'>
        {userData?userData.map((item)=>(
            <div className=' m-5 border border-slate-200 w-[400px] '>
            <img src={`https://avatars.dicebear.com/v2/avataaars/{{${item.name}}}.svg?options[mood][]=happy`} alt="" className='w-full h-[170px] bg-[#f5f5f5]'/>
                <p className='ml-5 mt-5 mb-2 font-semibold text-black'>{item.name}</p>
                <p className='ml-5 flex items-center gap-2'><MailOutlined /> {item.email}</p>
                <p className='ml-5 flex items-center gap-2'><PhoneOutlined /> {item.phone}</p>
                <p className='ml-5 mb-5 flex items-center gap-2'><GlobalOutlined /> {item.website}</p>
                
                <div className='flex justify-between  mt-5 bg-[#f5f5f5] border-t-slate-200 border'>
                <button className=' text-red-500 border-r-2 m-2  w-full' onClick={() =>handleLike(item._id)}>{item.like?<HeartFilled />:<HeartOutlined />}</button>
                <button className='   text-slate-500 border-r-2 m-2 hover:text-blue-500 w-full' onClick={()=>handleUpdate(item)}><EditOutlined /></button>
                
                <button className=' text-slate-500 hover:text-blue-500 w-full m-2' onClick={() =>handleDelete(item._id)}><DeleteFilled /></button>
                </div>
               
            </div>
        )):
<BeatLoader color="#36d7b7" className='' margin={10} />
        }
       </div>
       </div>
       }
       {edituser &&  <div className=' absolute   p-5  w-full'>
        <form onSubmit={updateNewUser} className='w-[600px] mx-auto bg-white mt-[100px] p-2 rounded-md'>
         <div className="border-b border-gray-900/10 flex justify-between items-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Basic Model</h2>
          <CloseOutlined onClick={()=>{setEdituser(false)}}/>
          </div>
          <div className="mt-10  ">
      
             
              <div className="flex items-center justify-center mt-2 gap-1">
              <u className='text-red-400 no-underline'>*</u>Name:<input
                  type="text"
                  name="name"
                  required
                  value={newUser.name}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className=" w-[60%] rounded-md border-2 py-1.5 text-gray-900  placeholder:text-gray-400" />
              </div>

              
             <div className="flex items-center justify-center mt-2 gap-1">
            <u className='text-red-400 no-underline'>*</u>Email: <input
                  name="email"
                  required
                  value={newUser.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  className=" w-[60%] rounded-md border-2 py-1.5 text-gray-900  placeholder:text-gray-400"/>
              </div>
    
     

  
          
             <div className="flex items-center justify-center mt-2 gap-1">
             <u className='text-red-400 no-underline'>*</u>Phone:<input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  value={newUser.phone}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  className=" w-[60%] rounded-md border-2 py-1.5 text-gray-900  placeholder:text-gray-400"
                />
              </div>

             
              <div className="flex items-center justify-center mt-2 gap-1">
              <u className='text-red-400 no-underline'>*</u>website:<input
                 name="website"
                 required
                 value={newUser.website}
                 onChange={handleChange}
                 type="text"
                 autoComplete="email"
                 className="w-[60%]  rounded-md border-2 py-1.5 text-gray-900  placeholder:text-gray-400"/>
             </div>
         

          </div>
        

        <div className="mt-6 flex item-center justify-end gap-x-5 border-t p-2">
        <button type="button" className="text-sm rounded-md font-semibold leading-6 text-slate-400 p-1 hover:border-blue-500 hover:text-blue-500 border-2" onClick={()=>{setEdituser(false)}}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Ok
        </button>
      </div>


    </form>



       </div> }


        </div>
    )
    
       }