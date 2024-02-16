
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import { ExplorePosts,FeedPosts,Chats,SearchPage,Profile,HomeLayout, CommentLayout,PostPage,UpdatePassword,TrendingPagePosts, MediumScreenTrendingPage} from './pages';
import UpdateProfile from './pages/UpdateProfile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CreatePostPage from './pages/CreatePostPage';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './pages/ProtectedRoute';
import VisitedUserProfile from './pages/VisitedUserProfile';
import MessageContainer from './components/MessageContainer';
import LikesPage from './pages/LikesPage';
import FollowersFollowing from './pages/FollowersFollowing';

const router = createBrowserRouter([
  {
    path:'/signUp',
    element:<SignUp />
  },
  {
    path:'/login',
    element:<Login />
  },
    {
      path:'/',
      element:
      <ProtectedRoute>
      <HomeLayout />
    </ProtectedRoute>,
    children:[
      {
        index:true,
        element:<FeedPosts/>
      },
     {
      path:'updatePassword',
      element:<UpdatePassword />
    },
    {
        path:'trending/:trendingTopic',
        element:<TrendingPagePosts/>
    },
   {
      path:'explore',
      element:<ExplorePosts />,
   },
   {
    path:'postLikes/:postId',
    element:<LikesPage/>
   },
    {
      path:'chats',
      element:<Chats/>,
      children:[
        {
          path:'messages/:id',
          element:<MessageContainer/>
        }
      ]
    },
    {
      path:'searchPage',
      element:<SearchPage/>
    },
    {
      path:'createNewPost',
      element:<CreatePostPage/>
    },
    {
      path:'post/:postId/comments',
      element:<CommentLayout/>
    },
    {
      path:'trending',
      element:<MediumScreenTrendingPage />
    },
    {
      path:'profile/:userId/',
      element:<VisitedUserProfile />,
      children:[
        {
          path:'post/:postId',
          element:<PostPage />
        }
      ]
    },
    {
      path:':followersfollowing/:id',
      element:<FollowersFollowing />
      },
    {
      path:'/profile/:loggedInUserId/loggedInUser',
      element:<Profile/>,
      children:[
        {
          path:'post/:postId/',
          element:<PostPage />,
        },
        {
          path:':updateProfile',
          element:<UpdateProfile/>
        }
      ]
    }

  ]}]);

function App(){
  return (
    <>
    <ToastContainer position='top-center'/>
    <RouterProvider router={router} />
    </>
  )
}

export default App
