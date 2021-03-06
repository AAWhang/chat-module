import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import RoomList from './components/RoomList'


class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      roomId: null,
      joinableRooms: [],
      joinedRooms: {},
      publish: ""
    }
      this.sendMessage = this.sendMessage.bind(this)
      this.sendTypingEvent = this.sendTypingEvent.bind(this)
      this.subscribeToRoom = this.subscribeToRoom.bind(this)
      this.getRooms = this.getRooms.bind(this)
      this.createRoom = this.createRoom.bind(this)
      this.publish = this.publish.bind(this)
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  publish() {
    this.state.publish = "";
    this.state.messages.map(x => this.state.publish += x.text + "\n")
    let output = {
      title: "Presentation Room",
      tags: ["test"],
      body: this.state.publish
    }
    this.props.addStory(output)
    console.log(this.state.publish)
    console.log(this.state.currentUser)
    console.log("user.roomStore.rooms: ",this.state.currentUser.roomStore.rooms);
    let newArr = Object.entries(this.state.currentUser.roomStore.rooms).map((e) => ( { [e[0]]: e[1] } ));
    console.log("JoinableRooms array: ",newArr);
  }

  createRoom(name) {  // Rooms
    this.state.currentUser.createRoom({
        name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom: ', err))
  }

  getRooms() {
      this.state.currentUser.getJoinableRooms({ userId: this.state.currentUser.id })
      .then(joinableRooms => {
          this.setState({
              joinableRooms,
              joinedRooms: this.state.currentUser.roomStore.rooms
          })
      })
      .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId) {
      this.setState({ messages: [],
      roomId: roomId
      })
      console.log(this.state.currentUser)
      this.state.currentUser.subscribeToRoom({

      roomId: roomId,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
          })
        },
          onUserStartedTyping: user => {
            this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
            })
          },
          onUserStoppedTyping: user => {
            this.setState({
              usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                username => username !== user.name
              ),
            })
          },
          onPresenceChange: () => this.forceUpdate(),
      },
    })

      .then(room => {
          this.setState({
              roomId: room.id
          })
          this.getRooms()
      })
      .catch(err => console.log('error on subscribing to room: ', err))
  }


  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:d0a4e50e-9112-498d-abe9-b479af956a79',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        // url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d0a4e50e-9112-498d-abe9-b479af956a79/token',
        url: 'http://localhost:3001/auth',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
          return currentUser.subscribeToRoom({
            roomId: "3d11208e-5a66-49ae-8720-9c68bf0f9f5e",
            messageLimit: 100,
            hooks: {
              onMessage: message => {
                this.setState({
                  messages: [...this.state.messages, message],
                })
              },
                onUserStartedTyping: user => {
                  this.setState({
                      usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                  })
                },
                onUserStoppedTyping: user => {
                  this.setState({
                    usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                      username => username !== user.name
                    ),
                  })
                },
                onPresenceChange: () => this.forceUpdate(),
            },
          })
      })
      .then(currentRoom => {
        let newArr = Object.entries(this.state.currentUser.roomStore.rooms).map((e) => ( { [e[0]]: e[1] } ));

        this.setState({ currentRoom,
          joinableRooms: newArr,
          joinedRooms: this.state.currentUser.roomStore.rooms,
         })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '300px',
        flex: 'none',
        padding: '20',
        backgroundColor: '#2c303b',
        color: 'white',
      },
      chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
      },
    }

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
          />
          <RoomList
            subscribeToRoom={this.subscribeToRoom}
            rooms={[this.state.joinableRooms]}
            roomTest={this.state.joinedRooms}
            // rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            roomId={this.state.roomId}
            publish={this.publish}
            goHome={this.props.goHome}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
              />
              <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
              <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
