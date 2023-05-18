import { Routes,Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  ActivationAccount,
  Homepage,
  Login,
  Main,
  Register,
  Profilepage,
  PostDetail,
  OtherUserProfile
} from './pages';


const App = () => {
  return (
    <React.Fragment>
      <Routes>
        
        <Route path="/auth/login" element={<Login/>}></Route>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/confirm-email/:code" element={<ActivationAccount/>}/>

        <Route path="/" element={<Main/>}>
        <Route index element={<Homepage/>}/>
        <Route path="/profile/:id" element={<Profilepage/>}/>
        <Route path="/user/:id" element={<OtherUserProfile/>}/>
        <Route path="/post/:postId" element={<PostDetail/>}/>

        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
