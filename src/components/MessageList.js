import React, { Component } from 'react'; 

class MessageList extends Component {
	constructor(props){
	super(props); 
	this.state = {
		messages: [], 
		value: '', 
		activeRoom: '', 
		username: { email }
	}; 

	this.createMessage= this.createMessage.bind(this); 
	this.handleActiveRoom = this.handleActiveRoom.bind(this); 
	this.messagesRef = this.props.firebase.database().ref('messages');
	}; 

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const message = snapshot.val(); 
			message.key = snapshot.key; 
			this.setState ({ messages: this.state.messages.concat( message ) })
		}); 
	}

	createMessage(messages) {
		this.messagesRef.push({
			content: this.state.value, 
			roomId: this.props.handleActiveRoom.key, 
			username: this.props.user.email, 
			newMessage: ''
		}); 
	}

	sentAt() {
		var sessionsRef= firebase.database().ref("sessions"); 
		sessionsRef.push({
			startedAt: firebase.database.ServerValue.TIMESTAMP	
		}); 
		
	}
	

	render() {
		return (
			<div id="messages">{this.state.messages.map( (messages, index ) =>
				<div key={index}>
    				<ul>{messages.name}</ul>
    				</div>
    			)}
				<form onClick={(e) => this.handleActiveRoom(e)}>
					<label>
						Chat: 
							<textarea value={this.state.value} />
					</label>
					<input type="submit" value="Submit" /> 

				</form> 
			</div> 
			)
	}
}

export default MessageList; 