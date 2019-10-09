import React, {Component } from 'react'
import LibraryHeader from './components/LibraryHeader'
import LibraryList from './components/LibraryList'
import LibraryStory from './components/LibraryStory'


class StoryLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bodyScreen: 'libraryList',
      currentStory: {}
    }
    this.backToList = this.backToList.bind(this)
    this.setStory = this.setStory.bind(this)
  }

  setStory(story) {
    this.setState({
      currentStory: story,
      bodyScreen: 'libraryStory'
    })
  }

  backToList() {
    this.setState({
      bodyScreen: 'libraryList'
    })
  }


  render() {
    if (this.state.bodyScreen === 'libraryList') {
        return (
          <div>
          <LibraryHeader backToList={this.backToList} />
          <LibraryList stoLib={this.props.SLibrary} setStory={this.setStory} />
          </div>
      )}
    else if (this.state.bodyScreen === 'libraryStory') {
      return (
        <div>
        <LibraryHeader backToList={this.backToList}  />
        <LibraryStory story={this.state.currentStory} />
        </div>
    )}
  }
}

export default StoryLibrary
