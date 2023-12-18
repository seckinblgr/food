"use client"
import React ,{useEffect, useState} from 'react'
import UserTabs from "/src/components/layout/Tabs";
import { useProfile } from "/src/components/UseProfile";
import UserForm from "/src/components/layout/UserForm"
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';


const EditUserPage = () => {
    const { data, loading } = useProfile();
    const [user,setUser] = useState(null)
    const {id} = useParams()

   useEffect(() => {
    fetch("/api/profile?_id="+id).then(res => {
      res.json().then(user => {
       setUser(user)
      })
    })
   }, [])
   
    
     const handleSaveButtonClick =  async( e, data) => {
     e.preventDefault();
      const promise = new Promise (async(res, rej) => {
      const response = await fetch("/api/profile", {
          method: "PUT",
          headers: {"Content-Type " : "application/json"},
          body: JSON.stringify({...data,_id:id}),
        })
        if(response.ok){
          res()
        }else{
          rej()
        }
      })
     await toast.promise(promise,{
        loading:"Saving user...",
        success:"Succesfully saved !",
        error:"Could not saved !",
      })
    }

    if (loading) {
        return (
          <p className="flex justify-center text-primary items-center mx-auto my-4">
            Loading user info !
          </p>
        );
      }
      if (!data.admin) {
        return (
          <p className="flex justify-center text-primary items-center mx-auto my-4">
            Not an admin !
          </p>
        );
      }


  return (
    <section className='mt-8  max-w-xl mx-auto'> 
      <UserTabs isAdmin={true}/>
        <div className='mt-8'>
            <UserForm user = {user}  onSave={handleSaveButtonClick}/>
        </div>
    </section>
  )
}

export default EditUserPage