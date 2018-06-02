import React, { Component } from 'react'; 

class MessageList extends Component {
	constructor(props){
	super(props); 
	this.state = {
		messages: [], 
		value: '', 
		activeRoom: '', 
		username: ''
	}; 

	this.createMessage= this.createMessage.bind(this);  
	this.messagesRef = this.props.firebase.database().ref('messages');
	}; 

	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val(); 
			message.key = snapshot.key; 
			this.setState ({ messages: this.state.messages.concat( message ) })
		}); 
	}

	createMessage(messages) {
		this.messagesRef.push({
			content: this.state.value, 
			roomID: this.props.handleActiveRoom.key, 
			username: this.props.user.displayName, 
			newMessage: ''
		}); 
	}

	sentAt() {
		this.props.firebase.database().ref("sessions"); 
		this.sessionsRef.push({
			startedAt: this.props.firebase.database.ServerValue.TIMESTAMP	
		}); 
		
	}

	
	render() {
		return (

			<div id="messages">{this.state.messages
				.filter((messages)=> this.props.activeRoom.key === messages.roomID)
				.map( (message, index ) =>
				<div key={index}>
    				<ul>{message.content}</ul>
    				</div>
    			)}
				<div id="roomID" >
					<label>
						Chat: 
							<textarea value={this.state.value} />
					</label>
					<input type="submit" value="Submit" /> 

				</div> 
			</div> 
			)
	}
}

export default MessageList; 