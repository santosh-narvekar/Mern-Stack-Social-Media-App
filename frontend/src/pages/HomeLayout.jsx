
import {  Outlet } from "react-router-dom";
import {Navbar,SideNav} from './../components'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../features/userFeatures";
import { getTrendingTopics } from "../../features/postFeatures";
const HomeLayout = () => {
  const {_id}=useSelector(state=>state.loggedIn.loggedInUser)
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(getLoggedInUser(_id));
     dispatch(getTrendingTopics());
  },[])

  return (
    <>
    <Navbar/>
    <SideNav />
    <section className="absolute 
    lg:left-96
    sm:left-72
    top-20
    sm:w-auto
    w-screen
    flex 
    sm:justify-start
    justify-center
     ">
    <Outlet />
    </section>
    </>
  )
}

export default HomeLayout
