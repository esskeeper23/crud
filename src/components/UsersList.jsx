import React from 'react'
import axios from 'axios'

const UsersList = ({user, getAllUsers, setUpdateInfo, openModal}) => {

    const deleteUser = id => {
        const URL = `https://users-crud1.herokuapp.com/users/${id}/`
        axios.delete(URL)
          .then(res => {
            console.log(res.data)
            getAllUsers()
          })
          .catch(err => console.log(err))
    }

    const updateInfo = () => {
        setUpdateInfo(user)
        openModal()
    }

  return (
    <div className='users'>
        <h2>{user.first_name} {user.last_name}</h2>
        <hr />
        <p>Email</p>
        <p>{user.email}</p>
        <p>Birthday</p>
        <p>{user.birthday}</p>
        <hr />
        <div className='user-btn-container'>
            <button onClick={() => deleteUser(user.id)}>delete</button>
            <button onClick={updateInfo}>update</button>
        </div>
    </div>
  )
}

export default UsersList