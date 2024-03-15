import { useState } from "react";
import { auth, googleProvider } from "../firebase"
import {createUserWithEmailAndPassword ,signInWithPopup,signOut, updateCurrentUser} from 'firebase/auth'


export const Auth =()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    console.log(auth?.currentUser?.photoURL);
    const signIn = async ()=>{
        try{
          await createUserWithEmailAndPassword(auth,email,password)
        }catch(err){
            console.log(err);
        }
        
    };
    const signInWithGoogle = async ()=>{
       try{
        await signInWithPopup(auth,googleProvider)
       }catch(err){
        console.log(err);
       }
    };
    const logOut = async()=>{
        try{
            await signOut(auth)
        }catch(err){
            console.log(err);
        }
    };


    return <div>
        <input placeholder="Email...." onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign In</button>

        <button onClick={signInWithGoogle}>Sign In With Google</button>

        <button onClick={logOut}>Logout</button>
    </div>
}