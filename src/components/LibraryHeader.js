import React, { Component } from 'react'

class LibraryHeader extends Component {
render() {
  return (
    <div>
      <a
          onClick={() => this.props.backToList()}
          href="#">
          List
      </a>
    </div>
  )
}
}

export default LibraryHeader
