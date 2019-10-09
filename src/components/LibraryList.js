import React, { Component } from 'react'

class LibraryList extends Component {
  render() {
    let storyList = [...this.props.stoLib]
    return (
    <div>
    {storyList.map((story, id) => {
      return (
            <li key={id}>
                <a
                    onClick={() => this.props.setStory(story)}
                    href="#">
                    # {story.title}
                </a>
            </li>
        )
    })}
    </div>
  )
  }
}
export default LibraryList
