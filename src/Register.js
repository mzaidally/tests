import {useState} from 'react'

import './forms.css'
import {app, auth} from './firebase'
//import { doc, getDoc } from "firebase/firestore";
import {useHistory, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useAuthValue} from './AuthContext'
import {addDoc, collection, getFirestore } from "firebase/firestore";
//import firebase from "firebase/compat/app";


function Register() {

  const [email, setEmail] = useState('')
  // const [takenUsernames] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const {setTimeActive} = useAuthValue()
  // const num = 1;
  const db = getFirestore(app);


  function addToUsersTable(username, email) {

    try {
      const docRef =  addDoc(collection(db, "users"), {
        username: username,
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }


  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  // const fetchTakenData = async () => {

  //   let takenUsernamesAsync = []

  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {

  //     takenUsernamesAsync.push(doc.data()['username'])
  //   });
  //   setTakenUsernames(takenUsernamesAsync);



  // }

  // const validateUsername = (uName) => {
  //   let isValid = true


  //     console.log(takenUsernames)
  //     for (let i = 0; i < takenUsernames.length; ++i)
  //     {
  //       if (uName === takenUsernames[i])
  //       {
  //         console.log("is equal")
  //         isValid = false
  //         setError('Username already taken')
  //       }
  //     }

  //     console.log(isValid)
  //     return isValid



  // }





  const register = e => {
    e.preventDefault()
    setError('')


    //validateUsername("userm4")
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)


        .then((res) => {
          setTimeActive(true)
          history.push('/verify-email')
          })
        .catch(err => setError(err.message))

      addToUsersTable(username, email)

    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input
              type='username'
              value={username}
              required
              placeholder='Enter a new username'
              onChange={e => setUsername(e.target.value)}
              />

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register