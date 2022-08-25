import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createNewUser = data => {
    const URL = 'https://users-crud1.herokuapp.com/users/'

    axios.post(URL, data)
      .then(res =>{
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

 
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  console.log(users)
  

  return (
    <div className="App">
      <header>
        <h1>Users</h1>
        <button onClick={openModal}>
            Create new user
        </button>
      </header>

      <div className={isModalOpen ? 'modal' : 'hide-modal'}>
        <UsersForm
        closeModal={closeModal}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
        createNewUser={createNewUser}
        getAllUsers={getAllUsers}
         />
      </div>

      <div className='user-list'>
        { 
          users?.map(user => (
            
              <UsersList 
                key={user.id}
                user={user}
                getAllUsers={getAllUsers}
                setUpdateInfo={setUpdateInfo}
                openModal={openModal}
              />      
            
          ))
        }
      </div>  
    </div>
  )
}

export default App
