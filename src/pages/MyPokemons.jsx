import React from "react";
import { UseAppContext } from "../AppContext";
import { CgPokemon } from 'react-icons/cg'

export default function MyPokemons() {
    const {user, allUsersLS, setAllUsersLS} = UseAppContext()

    const i = allUsersLS.find(iuser => {
        if(iuser.name === user.name) {
            if(iuser.surname === user.surname) {
                if(iuser.password === user.password) {
                    return iuser
                }
            }
        }
    })

    function removePokemon(id) {
        const myPokemons = i.myPokemons.filter(pokemon => pokemon.id !== id)
        const newI = {...i,myPokemons: myPokemons}

        const newAllUsersLS = allUsersLS.map(oldUser => {
            if(oldUser.name === newI.name) {
                if(oldUser.surname === newI.surname) {
                    if(oldUser.password === newI.password) {
                        return newI
                    }
                }
            } else {
                return oldUser
            }
        })

        setAllUsersLS(newAllUsersLS)
        localStorage.setItem('LSUsers',JSON.stringify(allUsersLS))
    }

    if(!i.myPokemons.length) {
        return (
            <div className="noPokemons__container">
                <h1>You dont have <span>Pokemons</span> !</h1>
            </div>
        )
    }

    return (
        <div className="myPokemons__container">
            <h1>My <span>Pokemons</span></h1>
            <div className="myPokemons-cards__container">
                {i.myPokemons.map((pokemon) => {
                    return (
                        <div key={pokemon.id} className="pokemonCard__container pokemon__container">
                        <div className="image__container">
                            <div>
                                <img src={pokemon.sprites.front_default} alt="" />
                            </div>
                        </div>
                        <div className="info__container">
                           <div className="heading__container">
                                <div>
                                    <h1>Name: <span>{pokemon.name}</span></h1>
                                    <h3>Base experience: <span>{pokemon.base_experience}</span></h3>
                                    <h3>Type: <span>{pokemon.types[0].type.name}</span></h3>
                                    <h3>Weight: <span>{pokemon.weight}</span></h3>
                                </div>
                                <div className="pickup__container">
                                    <h1 onClick={() => removePokemon(pokemon.id)} >Bye <span>{pokemon.name}</span>!</h1>
                                </div>
                           </div>
                            <div className="stats__container">
                                {pokemon.stats.map((statss,i) => {
                                    return <div key={i}>
                                        <h3>{statss.stat.name}</h3>
                                        <h3><span>{statss.base_stat}</span></h3>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}