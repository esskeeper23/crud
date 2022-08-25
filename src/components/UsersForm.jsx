import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const UsersForm = ({closeModal, setUpdateInfo, updateInfo, createNewUser, getAllUsers}) => {

    const defaultValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthday: ""
    }

    const {register, handleSubmit, reset} = useForm()

    useEffect(() => {
        if (updateInfo) {
            console.log(updateInfo)
            reset(updateInfo)
        }
    
    }, [updateInfo])

    const submit = data => {

        if (updateInfo) {
            const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}`
            axios.patch(URL, data)
              .then(res => {
                getAllUsers()
                closeModal()
              })
              .catch(err => console.log(err))
              reset(defaultValues)
              setUpdateInfo()
        }else {
            createNewUser(data)
            reset(defaultValues)
            closeModal()
        }
    }
    

  return (
    <div className='user-form'>
        <div onClick={closeModal} className='exit-modal'>X</div>
        <form onSubmit={handleSubmit(submit)}>
            <h2>{updateInfo ? "update user" : "New user"}</h2>
            <div>
                <label htmlFor="first-name">Name</label>
                <input {...register("first_name")} type="text" id='first-name'/>
            </div>
            <div>
                <label htmlFor="last-name">Last name</label>
                <input {...register("last_name")} type="text" id='last-name'/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" id='email'/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" id='password'/>
            </div>
            <div>
                <label htmlFor="birthday">Birthday</label>
                <input {...register("birthday")} type="date" id='birthday'/>
            </div>
            <button type='submit'>{updateInfo ? "update user" : "add new user"}</button>
        </form>
    </div>
  )
}

export default UsersForm