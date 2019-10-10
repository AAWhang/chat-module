import React, { Component } from 'react'

class UsernameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    const styles = {
      body: {
        backgroundColor: '#AAAAFF'
      },
      container: {
        width:'400px',
        height: '100vh',
        marginLeft: '40%',
        padding: '20px',
        backgroundColor: '#F0F0F0'
      },
      title: {
        align: 'center'
      }
    }
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <h1>Stories We Tell</h1>
          <br />
          <hr />
          <br />
          <h3>What is your username?</h3>
          <br />
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="abc1"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
          <br />
          <a
              onClick={() => this.props.toLibrary()}
              href="#">
              to Archive
          </a>
        </div>
      </div>
    )
  }
}

export default UsernameForm
