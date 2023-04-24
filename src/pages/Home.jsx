import React, { useEffect, useState } from "react";
import { UseAppContext } from "../AppContext";
import ReactDOM from "react-dom";
import { Link, json } from "react-router-dom";
import {SiPokemon} from 'react-icons/si'
import {MdOutlineCatchingPokemon} from  'react-icons/md'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pokemon from "../components/Pokemon";

export default function Home() {
    const {allUsersLS, setAllUsersLS, haveData, errorFetch,setErrorFetch, loading,searchPokemonRef, fetchingPokemon, setLoggedIn,user,setUser,createdUser,setCreatedUser,signingIn,setSigningIn,signingUp,setSigningUp} = UseAppContext()
    const [modalAlert,setModalAlert] = useState({text:'',color: '',showModal: false})

    const stringifyCreatedUser = JSON.stringify(createdUser)
    const stringifyAllUsersLS = allUsersLS.map(user => JSON.stringify(user))
    const date = new Date()
    const today = date.toDateString()

    function checkUserExistFunc() {
        const stringifyUser = JSON.stringify(user)
        const onlyPasswordsUsers = allUsersLS.map(oldUser => {
            return JSON.stringify({name: oldUser.name,surname:oldUser.surname,password:oldUser.password})
        })

        if(onlyPasswordsUsers.includes(stringifyUser)) {
            setLoggedIn(true)
            setSigningIn(false)
        } else {
            modalAlertFunc('Try again!', 'red',true)
            removeModal()
            clearSignIn()
        }
    }

    function signUpUserFunc() {
        if(!createdUser.name || !createdUser.surname || !createdUser.password || !createdUser.confirmPassword) {
            clearSignUp()
            modalAlertFunc('Try again!','red',true)
            removeModal()
        } else if(createdUser.password !== createdUser.confirmPassword) {
            clearSignUp()
            modalAlertFunc('Password unmatched!',`red`,true)
            removeModal()
        } else if(createdUser.password.length < 6) {
            modalAlertFunc('Password need 6 chars!','red',true)
            clearSignUp()
            removeModal()
        } else if(stringifyAllUsersLS.includes(stringifyCreatedUser)){
            modalAlertFunc('User already exist!', 'red', true)
            removeModal()
            clearSignUp()
        }else {
            setAllUsersLS([...allUsersLS,createdUser])
            modalAlertFunc('Account created!', 'yellowgreen', true)
            removeModal()
            setSigningUp(false)
            clearSignUp()
        }
    }

    function removeModal() {
        setTimeout(() => {
            setModalAlert({text:'',color: '',showModal: false})
        },2000)
    }

    function clearSignUp() {
        setCreatedUser({name: '', surname: '', password: '',confirmPassword: '',myPokemons:[]})
    }

    function clearSignIn() {
        setUser({name: '', surname: '', password: ''})
    }

    function modalAlertFunc(text,color,showModal) {
        setModalAlert({text,color,showModal})
    }

    localStorage.setItem('LSUsers',JSON.stringify(allUsersLS))

    useEffect(() => {
        modalAlertFunc({text:'',color: '',showModal: false})
    },[loading])


    if(modalAlert.showModal) {
        return ReactDOM.createPortal(
            <div className="modalAlert__container">
                <h3 style={{color: modalAlert.color}}>{modalAlert.text}</h3>
            </div>, document.getElementById('portal')
        )
    }

    if(loading) {
        modalAlertFunc('Searching...','green',true)
    }

    if(errorFetch) {
        modalAlertFunc('Cant find Pokemon!','red',true)
        setTimeout(() => {
            setErrorFetch(false)
            setModalAlert({text:'',color: '',showModal: false})
        },2000)
    }

    if(signingUp) {
        return (
            <div className="signUp__container">
                <h3>Sign Up</h3>
                <div className="form">
                    <div className="name__container">
                        <label htmlFor="name">Name</label>
                        <input value={createdUser.name} id='name' type="text" onChange={(e) => setCreatedUser({...createdUser, name: e.target.value})}/>
                    </div>
                    <div className="surname__container">
                        <label htmlFor="Name">Surname</label>
                        <input value={createdUser.surname} id='surname' type="text"  onChange={(e) => setCreatedUser({...createdUser, surname: e.target.value})}/>
                    </div>
                    <div className="password__container">
                        <label htmlFor="password">Password</label>
                        <input value={createdUser.password} id="password" type="password"  onChange={(e) => setCreatedUser({...createdUser, password: e.target.value})}/>
                    </div>
                    <div className="confirmPassword__container">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input value={createdUser.confirmPassword} id="confirmPassword" type="password" onChange={(e) => setCreatedUser({...createdUser, confirmPassword: e.target.value})}/>
                    </div>
                </div>
                <div className="signIn-buttons__container">
                    <button onClick={signUpUserFunc}>Sign Up</button>
                    <button onClick={() => setSigningUp(false)}>Back</button>
                </div>
            </div>
        )
    }

    if(signingIn) {
        return (
            <div className="signIn__container">
                <h3>Sign In</h3>
                <div className="form">
                    <div className="name__container">
                        <label htmlFor="name">Name</label>
                        <input value={user.name} id='name' type="text" onChange={(e) => setUser({...user,name: e.target.value})}/>
                    </div>
                    <div className="surname__container">
                        <label htmlFor="Name">Surname</label>
                        <input value={user.surname} id='surname' type="text"  onChange={(e) => setUser({...user,surname: e.target.value})}/>
                    </div>
                    <div className="password__container">
                        <label htmlFor="password">Password</label>
                        <input value={user.password} id="password" type="password"  onChange={(e) => setUser({...user,password: e.target.value})}/>
                    </div>
                </div>
                <div className="signIn-buttons__container">
                    <button onClick={checkUserExistFunc}>Sign in</button>
                    <button onClick={() => setSigningUp(true)}>Sign Up</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="home__container">
            <div className="welcome__container">
                <h3>Welcome <span>{user.name}</span> !</h3>
                <h2>{today}</h2>
            </div>
            <div className="fetching__container">
                <h1>Find your favourite <span>Pokemon</span> !</h1>
                <div className="input__container">
                    <input placeholder='Search pokemon!' ref={searchPokemonRef} type="text" />
                    <button onClick={fetchingPokemon}><MdOutlineCatchingPokemon className="icon"/></button>
                </div>
            </div>

            {haveData && 
            <Pokemon />
            }

        </div>
    )
}