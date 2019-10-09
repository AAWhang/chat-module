import React, {Component } from 'react'


class StoryLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bodyScreen: 'libraryList'
    }
    this.backToList = this.backToList.bind(this)
  }

  backToList() {
    this.setState({
      bodyScreen: 'LibraryList'
    })
  }


  render() {
    const styles = {

    }


        return (
          <div>
            {this.props.storyLibrary.map((x, id) => (
              <div key={id}>
              <h1>{x.title}</h1>
               {x.body.split('\n').map((y, id) => {

               return <p key={id}>{y}</p>})}
               <hr />
                           {console.log(x.body)}
               </div>
            ))}

          </div>

      )
      //       if (this.state.bodyScreen === 'LibraryList') {
      // }
      // if (this.state.bodyScreen === 'StoryScreen') {
      //
      // }
  }
}

export default StoryLibrary
