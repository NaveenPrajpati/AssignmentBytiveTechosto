import React, { createContext, useContext } from 'react'
import { useEffect } from 'react'

import { useState } from 'react'
import { useNavigate, Navigate, Link, NavLink } from 'react-router-dom'
import { deleteUser, getUsers, updateUser } from '../service/userService'
import { toast } from 'react-hot-toast'
import { PhoneOutlined, MailOutlined, GlobalOutlined, HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default function UserList() {

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('all');
    const[edituser,setEdituser]=useState(false);
    const[newUser,setNewUser]=useState({});

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
         {<div className=' absolute'> <h1 className='text-2xl font-semibold mx-auto w-fit' >
                UserList
            </h1>

            <div className='flex gap-2 flex-wrap'>
        {userData?.map((item)=>(
            <div className=' m-5 border border-slate-200 w-[400px] '>
            <img src={`https://avatars.dicebear.com/v2/avataaars/{{${item.name}}}.svg?options[mood][]=happy`} alt="" className='w-full h-[150px] bg-gray-100'/>
                <p className='ml-5 mt-5 font-semibold text-black'>{item.name}</p>
                <p className='ml-5 flex items-center gap-2'><MailOutlined /> {item.email}</p>
                <p className='ml-5 flex items-center gap-2'><PhoneOutlined /> {item.phone}</p>
                <p className='ml-5 mb-5 flex items-center gap-2'><GlobalOutlined /> {item.website}</p>
                
                <div className='flex justify-between  mt-5 bg-gray-100 border-t-slate-200 border'>
                <button className=' text-red-500  p-1  w-full' onClick={() =>handleDelete(item._id)}><HeartOutlined /></button>
                <button className='   text-slate-500 hover:text-blue-500 w-full' onClick={()=>handleUpdate(item)}><EditOutlined /></button>
                
                <button className=' text-slate-500 hover:text-blue-500 w-full' onClick={() =>handleDelete(item._id)}><DeleteOutlined /></button>
                </div>
               
            </div>
        ))}
       </div>
       </div>
       }
       {edituser &&  <div className=' absolute left-10 top-10 bg-white p-5'>
        <form onSubmit={updateNewUser} className='w-[600px] mx-auto'>
         <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">User Information</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      
             
              <div className="">
              Name:<input
                  type="text"
                  name="name"
                  required
                  value={newUser.name}
                  onChange={handleChange}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
      

            

            <div className="sm:col-span-4">
              
            Email: <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  required
                  value={newUser.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
     

            <div className="sm:col-span-2">
          
              Phone:<div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  value={newUser.phone}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
             
             website: <div className="mt-2">
               <input
                 name="website"
                 required
                 value={newUser.website}
                 onChange={handleChange}
                 type="text"
                 autoComplete="email"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{setEdituser(false)}}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Update
        </button>
      </div>


    </form>



       </div> }


        </div>
    )
    
       }