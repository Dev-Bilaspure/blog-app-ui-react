import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Blog from './Pages/Blog/Blog';
import Write from './Pages/Write/Write';
import ScrollToTop from './components/ScrollToTop';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SignInAndSignUp from './Pages/SignInAndSignUp/SignInAndSignUp';
import Settings from './Pages/Settings/Settings';
import MyStories from './Pages/MyStories/MyStories';
import TagPage from './Pages/TagPage/TagPage';
import BookmarkPosts from './Pages/BookmarkPosts/BookmarkPosts';
import LikedPostsPage from './Pages/LikedPostsPage/LikedPostsPage';

const App = () => {
  const [user, setUser] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar user={user}/>
        <ScrollToTop />
        <Routes>
          <Route exact path='/' element={<Home user={user}/>} />
          <Route exact path='/write' element={user ? <Write /> : <Navigate to='/signin' state={{from: '/write'}}/>} />
          <Route exact path='/blog/:id' element={<Blog user={user}/>} />
          <Route exact path='/profile' element={<ProfilePage user={user}/>} />
          <Route exact path='/signin' element={!user ? <SignInAndSignUp setUser={setUser} val={0}/> : <Navigate to='/' />} />
          <Route exact path='/signup' element={!user ? <SignInAndSignUp setUser={setUser} val={1}/> : <Navigate to='/' />} />
          <Route exact path='/settings' element={user ? <Settings /> : <Navigate to='/signin' state={{from: '/settings'}}/>} />
          <Route exact path='/draft' element={user ? <MyStories val={0}/> : <Navigate to='/signin' state={{from: '/draft'}}/>} />
          <Route exact path='/published' element={user ? <MyStories val={1}/> : <Navigate to='/signin' state={{from: '/published'}}/>} />
          <Route exact path='/tag/:category' element={<TagPage />} />
          <Route exact path='/bookmark' element={user ? <BookmarkPosts /> : <Navigate to='/signin' state={{from: '/bookmark'}}/>} />
          <Route exact path='/liked' element={user ? <LikedPostsPage /> : <Navigate to='/signin' state={{from: '/liked'}}/>} />
          
          
          {/* <Route exact path='/' element={<Home />} />
          <Route exact path='/:username' element={<Profile page={'home'}/>} />
          <Route exact path='/:username/followers' element={<Profile page={'followers'}/>} />
          <Route exact path='/:username/followings' element={<Profile page={'followings'}/>} />

          <Route exact path='/me' element={<Navigate to='/:username'/>} />
          <Route exact path='/me/mystories' element={<Navigate to='/mystories/draft' />} />
          <Route exact path='/me/mystories/draft' element={<MyStories val={0} />} />
          <Route exact path='/me/mystories/pubished' element={<MyStories val={1} />} />

          <Route exact path='/signin' element={!user ? <SignInAndSignUp setUser={setUser} val={0}/> : <Navigate to='/' />} />
          <Route exact path='/signup' element={!user ? <SignInAndSignUp setUser={setUser} val={1}/> : <Navigate to='/' />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
