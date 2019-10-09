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
                <ul>
                <a
                    style={{color: 'white'}}
                    onClick={() => this.props.publish()}
                    href="#">
                    publish
                </a>
                <a
                    style={{color: 'white'}}
                    onClick={() => this.props.goHome()}
                    href="#">
                    go Back
                </a>
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
                                    # {room[1].name} {room[1].id}
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
