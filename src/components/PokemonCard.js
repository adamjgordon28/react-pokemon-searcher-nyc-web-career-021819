import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    frontSprite: true
  }

  toggleSprite = () => {
    this.setState({
      frontSprite: !this.state.frontSprite
    })
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img style = {{height: "5em"}, {width: "5em"}} onClick = {this.toggleSprite} src={this.state.frontSprite ? this.props.poke.sprites.front : this.props.poke.sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">Name: {this.props.poke.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              <div>HP: {this.props.poke.stats[5].value}</div>
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
