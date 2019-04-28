import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'


class PokemonIndex extends React.Component {
  state = {
    pokemon: [],
    pokeSearch: "",
    sortedByHP: false
  }

  pokemonSearch = (pokemonArray, searchTerm) => {
  let filteredArray = pokemonArray.filter((poke) => {
      return poke.name.includes(searchTerm)
    })
    return filteredArray
  }

  pokeFilter = (value) => {
    this.setState({
      pokeSearch: value
    })
  }

  pokeFetch = () => {
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(data => {
      this.setState({
        pokemon: data
      })
    })
  }

  createPokemon = (poke) => {
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: poke.name,
        stats: [{},{},{},{},{}, {name: "HP", value: poke.hp}],
        sprites: {front: poke.frontUrl, back: poke.backUrl}
      })
    })
    .then(res => res.json())
    .then(data => {
      let newPokemonArray = [...this.state.pokemon, data]
      this.setState({
        pokemon: newPokemonArray
      })
    })
  }

  sortByHP = (pokemonArray) => {
  let hpSortedPokemon =
    pokemonArray.sort(function(a, b) {
      return b.stats[5].value - a.stats[5].value;
    })
    return hpSortedPokemon
  }

 passDownPokemonList = () => {
   if (this.state.pokeSearch && this.state.sortedByHP){
     return this.pokemonSearch(this.sortByHP(this.state.pokemon), this.state.pokeSearch)
   }
   else if(this.state.pokeSearch && !this.state.sortedByHP){
     return this.pokemonSearch(this.state.pokemon, this.state.pokeSearch)
   }
   else if (!this.state.pokeSearch && this.state.sortedByHP){
     return this.sortByHP(this.state.pokemon)
   }
   else {
     return this.state.pokemon
   }
 }

 switchSortedByHP = () => {
   if (!this.state.sortedByHP){
     this.setState({
       sortedByHP: true
     })
   }
   else {
     let idSortedPokemon = this.state.pokemon.sort(function(a, b) {
       return a.id - b.id;
     })
     this.setState({
       pokemon: idSortedPokemon,
       sortedByHP: false
     })
   }
 }


  componentDidMount = () => {
    this.pokeFetch()
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={((ev)=> this.pokeFilter(ev.target.value))} showNoResults={false} />
        <br />
        <button className="ui primary button" onClick = {this.switchSortedByHP}>Sort By HP!</button>
        <br />
        <br />
        <PokemonForm createPokemon={this.createPokemon}/>
        <br />
        <PokemonCollection pokemon={this.passDownPokemonList()} />
      </div>
    )
  }
}

export default PokemonIndex
