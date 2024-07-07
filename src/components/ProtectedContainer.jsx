import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function ProtectedContainer({authentication = true,children}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const loginStatus = useSelector(state=>state.auth.status)

    useEffect(() => {
      if(authentication && loginStatus !== authentication){
         navigate('/login')
      }
      else if(!authentication && loginStatus !== authentication){
         navigate('/')
      }
      setLoading(false)
    }, [loginStatus,authentication,navigate])
    


  return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default ProtectedContainer