import React, { Component } from 'react'

class LibraryStory extends Component {
  render() {
    return (
    <div>
    <h1> {this.props.story.title} </h1>
    <hr />
    {this.props.story.body.split("\n").map((x,id) => {
      return <p key={id}> {x} </p>
    })}

    </div>
  )
  }
}
export default LibraryStory
