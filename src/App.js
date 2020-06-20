import React, { useState } from 'react';
import './App.css'
import "firebase/auth";
import * as firebase from "firebase/app";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const App = () => {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    photo: '',
    email: '',
  })

  const style = {color: 'blue',};
  const button = {padding: '10px 50px',  backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '7px', cursor: 'pointer'}

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
  firebase.auth().signInWithPopup(provider)
   .then(response =>{
      const{displayName, photoURL, email} = response.user;
      const signedInUSer = {
        isSignedIn: true,
        photo: photoURL,
        name: displayName,
        email: email,
      }
      setUser(signedInUSer);
   })
   .catch(error =>{

   })
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res =>{
      const signedOutuser = 
      {isSignedIn: false,
      name: '',
      photo: '',
      email: '',
      }
      setUser(signedOutuser);
    })
    .catch(error =>{

    })
  }

  return (
    <div className="App">
   

        <h1 style={style}>Welcome to Fire Test</h1> 
          {
            user.isSignedIn ?  <button style={button} onClick={handleSignOut} >Sign out</button> :
            <button style={button} onClick={handleSignIn} >Sign In</button>
          }
          <br/>
          {
            user.isSignedIn &&
            <div>
              <img src={user.photo} alt=""></img>
                <p>{user.name}</p> 
                <p>{user.email}</p>
            </div>
          }

    </div>
  );
};

export default App;