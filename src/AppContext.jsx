import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import MyPokemons from "./pages/MyPokemons";
import { json } from "react-router-dom";

const URL = 'https://pokeapi.co/api/v2/pokemon/'

function checkLS() {
    return localStorage.getItem('LSUsers') ? JSON.parse(localStorage.getItem('LSUsers')) : []
}

export const appContext = createContext()
export function AppProvider({children}) {
    const [allUsersLS,setAllUsersLS] = useState(checkLS())
    const [loggedIn,setLoggedIn] = useState(false)
    const [user,setUser] = useState({name: '', surname: '', password: ''})
    const [createdUser,setCreatedUser] = useState({name: '', surname: '', password: '',confirmPassword: '', myPokemons: []})
    const [signingIn,setSigningIn] = useState(true)
    const [signingUp,setSigningUp] = useState(false)
    const [loading,setLoading] = useState(false)
    const [errorFetch,setErrorFetch] = useState(false)
    const [searchedPokemon,setSearchedPokemon] = useState({})
    const [haveData,setHaveData] = useState(false)
    const searchPokemonRef = useRef()
    
    console.log(user)
    console.log(createdUser)

    function addPokemonToUser() {
        const userPokemons = allUsersLS.map(lsuser => {
            if(lsuser.name === user.name) {
                if(lsuser.surname === user.surname) {
                    if(lsuser.password === user.password) {
                        return {...lsuser,myPokemons:[...lsuser.myPokemons, {...searchedPokemon,id: Math.floor(Math.random() * 10000)}]}
                    }
                }
            } else {
                return lsuser
            }
        })
        setSearchedPokemon(null)
        setAllUsersLS([...userPokemons])
        localStorage.setItem('LSUsers', JSON.stringify(allUsersLS))
    }

    function fetchingPokemon() {
        setLoading(true)
        setHaveData(false)
        const searchPokemon = searchPokemonRef.current.value.toLowerCase()

        if(!searchPokemon) {
            setLoading(false)
            return 
        }

        fetch(`${URL}${searchPokemon}`)
        .then(res => {
            if(res.status === 404) {
                setLoading(false)
                setErrorFetch(true)
            } else {
                setLoading(false)
                return res.json()
            }
        })
        .then(data => {
            console.log(data)
            if(!data) {
                setHaveData(false)
            } else {
                setHaveData(true)
                const pokemonData = {...data,isFav: false}
                setSearchedPokemon(pokemonData)
            }
        })
        .catch(error => {
            console.log(error)
        })
        searchPokemonRef.current.value = ''
    }

    return (
        <appContext.Provider value={{addPokemonToUser, allUsersLS, setAllUsersLS, haveData,searchedPokemon, setSearchedPokemon, errorFetch, setErrorFetch, searchPokemonRef, fetchingPokemon, loading, signingIn, setSigningIn, signingUp, setSigningUp, loggedIn, setLoggedIn, user, setUser, createdUser, setCreatedUser}}>
            {children}
        </appContext.Provider>
    )
}

export function UseAppContext() {
    return useContext(appContext)
}
