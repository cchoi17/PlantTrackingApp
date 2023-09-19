import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleSignUp = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert('User registered successfully!');
    } catch (error) {
      alert(`Error registering: ${error.message}`);
    }
  }

  const handleSignIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert('User logged in successfully!');
    } catch (error) {
      alert(`Error logging in: ${error.message}`);
    }
  }

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      alert('User logged out successfully!');
    } catch (error) {
      alert(`Error logging out: ${error.message}`);
    }
  }

  const getUserEmail = () => {
    return user ? user.email : null;
  }

  return (
    <AuthContext.Provider value={{ user, handleSignUp, handleSignIn, handleSignOut, getUserEmail}}>
      {children}
    </AuthContext.Provider>
  );
};
