import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'
import Library from './Library'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen',
      storyLibrary: [{
        title: 'Ultimate Love Story',
        tags: ['Erotic', 'Hot', 'Sexy', 'Sensual'],
        body: "There was a boy who lived in a cave. He was very lonely and wished for a girlfriend. \n A magical fairy came into the cave one day. The fairy was a big testosterone emmitting man with the name Louie. He threw the boy a magic internet box calling it stupid nerd shit and promptly left. \n The boy used the magic box and tried to find someone to fill his loneliness. As much as he tried he couldn\'t find a suitable member of the opposite gender. \n He searched up and down, left and right, .com and .net, even .pizza and .ninja. He searched the entire world wide web and even the dark web. \n He searched and searched and searched. Then he searched in the last place he could think of. He searched within himself. He realized that the answer was within himself. With a grin, and newly gained knowledge, he named his right hand Vanessa and his left hand Stephanie. With his two new companions, he went off to bed to get to know them. Bibically."
      },
    {
      title: 'Big man, little coders.',
      tags: ['coding', 'height', 'tacos'],
      body: "Once there was a coder. This coder was big and strong. He was known as the strongest coder in the world. How did he achieve this? In his own words: \n Once my superior wasn't accepting my branch and I got frustrated so I used my height to intimidate him so he would merge my code into the master branch. I am not proud of this but thats what happun. Also another co worker was talking mad crap about python. I love python. I took it personally so I punched him so hard his nose inverted. I then picked him up and bench pressed him. My boss was so impressed that he began spotting me. We high fived so hard we needed to type our code with one hand for a month. It was very metal. "
    }],
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
      return <Library SLibrary={this.state.storyLibrary} />
    }
  }
}

export default App
