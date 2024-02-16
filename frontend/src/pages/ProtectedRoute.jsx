import { Navigate } from "react-router"


const ProtectedRoute = ({children}) => {
  
  const user = localStorage.getItem('user');

  return (
    <>
      {
        user?children:<Navigate to="/login"/>
      }    
    </>
  )
}

export default ProtectedRoute
