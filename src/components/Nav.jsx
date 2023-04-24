import React from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { UseAppContext } from "../AppContext";

export default function Nav() {
    const {loggedIn,setLoggedIn,setSigningIn,setSigningUp,setUser,setSearchedPokemon} = UseAppContext()

    function signOut() {
        setSigningIn(true)
        setSigningUp(false)
        setLoggedIn(false)
        setUser({name: '',surname: '',password: ''})
        setSearchedPokemon(null)
    }

    return (
        <div className="nav__container">
            <h3>Pokemonnnnns!</h3>
            {loggedIn && <div className="links-cart__container">
                <div className="nav-links__container">
                    <Link className="link" to='/'>Search</Link>
                    <Link className="link" to='/mypokemons'>My Pokemons</Link>
                </div>
                <div className="cart__container">
                <Link className="link" to='/'><button onClick={signOut}>Sign Out</button></Link>
                </div>
            </div>}
        </div>
    )
}