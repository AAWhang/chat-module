import React, { Component } from 'react'

class LibraryHeader extends Component {
render() {
  return (
    <div style={{backgroundColor: '#F5F5F5', padding: '1%'}}>
      <a
          onClick={() => this.props.backToList()}
          href="#">
          List
      </a>
      <br />
      <a
          onClick={() => this.props.goHome()}
          href="#">
          Home
      </a>
    </div>
  )
}
}

export default LibraryHeader
