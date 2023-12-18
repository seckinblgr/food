"use client"
import React from 'react'
import EditableImage from "src/components/layout/EditableImage"
import {  useState } from "react";
import {useProfile} from "/src/components/UseProfile"

const UserForm = ({user,onSave}) => {

  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image|| "");
  const [phone, setPhone] = useState(user?.phone|| "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress|| "");
  const [postalCode, setPostalCode] = useState(user?.postalCode|| "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country|| "");
  const [admin ,setAdmin] = useState(user?.admin || false)
  const {data:loggedInUserData} = useProfile()


  return (
    <div className=" gap-4  md:flex">
    <div>
      <div className=" p-2 rounded-md relative ">
        <EditableImage link={image} setLink={setImage} />
      </div>
    </div>
    <form className=" grow " 
    onSubmit={(e) => onSave(e,{name:userName,admin,image,phone,streetAddress,postalCode,city,country})}> 
      <input
        type="text"
        placeholder="First and last name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input
        type="email"
        disabled
        value={user.email}
      ></input>
      <input
        placeholder="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      ></input>
      <input
        placeholder="Street Address"
        type="text"
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
      ></input>
      <div className="flex gap-4 -my-4">
        <input
          placeholder="Postal Code"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        ></input>
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
      </div>
      <input
        placeholder="Country"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      ></input>
      {loggedInUserData.admin && (
            <div className='mb-2'>
            <input value={"1"} onClick={e => setAdmin(e.target.checked)} checked={admin} id='adminCb' type='checkbox'></input>
            <label className=' p-2 ' htmlFor='adminCb'>Admin</label>
          </div>
      )}
  
      <button className="" type="submit" >
        Save
      </button>
    </form>
  </div>
  )
}

export default UserForm