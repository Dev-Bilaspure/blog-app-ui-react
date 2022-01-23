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

const App = () => {
  const [user, setUser] = useState(false);
  // const navigate = useNavigate();
  return (
    <>
      <BrowserRouter>
        <Navbar user={user}/>
        <ScrollToTop />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/write' element={user ? <Write /> : <Navigate to='/signin' state={{from: '/write'}}/>} />
          <Route exact path='/blog/:id' element={<Blog user={user}/>} />
          <Route exact path='/profile' element={<ProfilePage user={user}/>} />
          <Route exact path='/signin' element={!user ? <SignInAndSignUp setUser={setUser} val={0}/> : <Navigate to='/' />} />
          <Route exact path='/signup' element={!user ? <SignInAndSignUp setUser={setUser} val={1}/> : <Navigate to='/' />} />
          <Route exact path='/settings' element={user ? <Settings /> : <Navigate to='/signin' state={{from: '/settings'}}/>} />
          <Route exact path='/draft' element={user ? <MyStories val={0}/> : <Navigate to='/signin' state={{from: '/draft'}}/>} />
          <Route exact path='/published' element={user ? <MyStories val={1}/> : <Navigate to='/signin' state={{from: '/published'}}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
