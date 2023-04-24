import React, { useState } from "react";
import { UseAppContext } from "../AppContext";
import {MdCatchingPokemon} from 'react-icons/md'

export default function Pokemon() {
    const {searchedPokemon,addPokemonToUser} = UseAppContext()
    console.log(searchedPokemon)
    
    if(!searchedPokemon) {
        return null
    }

    const name = searchedPokemon.name.slice(0,1).toUpperCase() + searchedPokemon.name.slice(1,searchedPokemon.name.length)
    const stats = searchedPokemon.stats.map(obj => ({[obj.stat.name]: obj.base_stat}))
    console.log(stats)


    return (
        <div className="pokemon__container">
            <div className="image__container">
                <div>
                    <img src={searchedPokemon.sprites.front_default} alt="" />
                </div>
            </div>
            <div className="info__container">
               <div className="heading__container">
                    <div>
                        <h1>You found <span>{name}</span> !</h1>
                        <h3>Base experience: <span>{searchedPokemon.base_experience}</span></h3>
                        <h3>Type: <span>{searchedPokemon.types[0].type.name}</span></h3>
                        <h3>Weight: <span>{searchedPokemon.weight}</span></h3>
                    </div>
                    <div className="pickup__container">
                        <h1>PickUp!</h1>
                        <MdCatchingPokemon onClick={addPokemonToUser} className="icon"/>
                    </div>
               </div>
                <div className="stats__container">
                    {stats.map((stat,i) => {
                        return <div key={i}>
                            <h3>{Object.keys(stat)}</h3>
                            <h3><span>{Object.values(stat)}</span></h3>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}