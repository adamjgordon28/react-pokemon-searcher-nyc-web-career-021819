import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newPokemon = {}
    newPokemon.name=this.state.name
    newPokemon.hp=this.state.hp
    newPokemon.frontUrl = this.state.frontUrl
    newPokemon.backUrl = this.state.backUrl
    this.props.createPokemon(newPokemon)
  }

  updateFormState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.updateFormState}/>
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.updateFormState}/>
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.updateFormState}/>
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.updateFormState}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
