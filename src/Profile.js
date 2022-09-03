import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import { getFirestore } from "firebase/firestore";
//import { doc, getDoc} from "firebase/firestore";
import { collection, query , where, getDocs} from "firebase/firestore";
import {useState} from 'react'

import {app} from "./firebase";




function Profile() {

    const [username, setUsername] = useState("");
    const db = getFirestore(app);
    const {currentUser} = useAuthValue()

    async function getUsername() {

        let dbUsername;
        const q = query(collection(db, "users"), where("email", "==", currentUser.email ));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dbUsername =  doc.data()["username"]
            setUsername(dbUsername)
        });

    }

    getUsername();
    console.log(username)


  return (
    <div className='center'>
      <div className='profile'>
        <h1>Profile</h1>
        <p><strong>Username: </strong>{username}</p>
        <span onClick={() =>
            signOut(auth)}
        >Sign Out</span>
      </div>
    </div>
  )
}

export default Profile