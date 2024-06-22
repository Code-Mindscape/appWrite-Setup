import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.service'
import { login, logout } from './store/auth.slice'



function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()
  useEffect(()=>{
    authService.getcurrentUser()
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])


  return !loading? (
  <div className='min-h-screen w-full text-zinc-100 flex items-center justify-center bg-zinc-900'>Hello</div>
  ): null

}

export default App
