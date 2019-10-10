import React, { Component } from 'react'

class RoomList extends Component {
  componentDidMount(){
    console.log("Mounted with Rooms: ", this.props.rooms);
  }
    render () {
      console.log(this.props.rooms, " inside")
        const orderedRooms = this.props.rooms
        return (
            <div className="rooms-list">
            <hr />
            <br />
            <li>
              <a
                  style={{color: 'white'}}
                  onClick={() => this.props.publish()}
                  href="#">
                  publish
              </a>
            </li>
            <li>
              <a
                  style={{color: 'white'}}
                  onClick={() => this.props.goHome()}
                  href="#">
                  go Back
              </a>
            </li>
              <br />
              <hr />
              <br />
                <ul>
                <h3>Your rooms:</h3>
                    {Object.entries(this.props.roomTest).map(room => {
                      console.log("ORDERED ROOM: ", room[1].name);
                        const active = room[1].id === this.props.roomId ? 'active' : '';
                        return (
                            <li key={room[1].id} className={"room " + active}>
                                <a
                                    style={{color: 'white'}}
                                    onClick={() => this.props.subscribeToRoom(room[1].id)}
                                    href="#">
                                    * {room[1].name}
                                </a>
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }
}

export default RoomList
