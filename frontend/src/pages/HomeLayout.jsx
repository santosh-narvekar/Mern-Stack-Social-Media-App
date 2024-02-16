
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
    <section className="absolute top-20 lg:left-96 md:left-72 sm:left-72 xs:left-56 xl:ml-8  ml-4   bg-base-100   ">
    <Outlet />
    </section>
    </>
  )
}

export default HomeLayout
