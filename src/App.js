import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'
import Library from './Library'
import { shelves } from './LibraryDummy'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen',
      storyLibrary: shelves,
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
    this.goHome = this.goHome.bind(this)
    this.toLibrary = this.toLibrary.bind(this)
    this.addStory = this.addStory.bind(this)
  }

  addStory(story) {
    let output = [...this.state.storyLibrary]
    output.push(story)
    this.setState({
      storyLibrary: output
    })
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(response => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    })
    .catch(error => console.error('error', error))
  }

  toLibrary() {
    this.setState({
      currentScreen: 'Library'
    })
  }

  goHome() {
    this.setState({
      currentScreen: 'WhatIsYourUsernameScreen'
    })
  }

  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} toLibrary={this.toLibrary} />
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} addStory={this.addStory} goHome={this.goHome} />
    }
    if (this.state.currentScreen === 'Library') {
      return <Library SLibrary={this.state.storyLibrary} goHome={this.goHome} />
    }
  }
}

export default App
