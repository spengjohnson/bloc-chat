import React, { Component } from 'react'; 
import moment from 'moment'; 
import './MessageList.css'; 

class MessageList extends Component {
	constructor(props){
	super(props); 
	this.state = {
		messages: [], 
		value: '', 
		activeRoom: '', 
		username: '', 
		newMessage: ''
	}; 

	this.createMessage= this.createMessage.bind(this);  
	this.messagesRef = this.props.firebase.database().ref('messages'); 
	this.newMessages = this.props.firebase.database().ref('content'); 
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
			roomID: this.props.activeRoom.key, 
			username: this.props.user ? this.props.user.displayName : 'Guest', 
			newMessage: '', 
			sentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
			//may need to add property called sentAt that's being sent to Firebase.
		}); 
		this.setState({ value: ''})

	}

	sendMessage(event) {
		this.createMessage(this.messagesRef.push({
			message: event.target.value, 
		})); 
	}

	handleMessage(event) {
		this.setState({ value: event.target.value }); 
	}

	
	render() {
		return (
			console.log(this.props.activeRoom), 
			<div id="messages">{this.state.messages
				.filter((messages)=> this.props.activeRoom.key === messages.roomID)
				.map( (message, index ) =>
				<div key={index}>
    				<ul>{message.username} : {message.content} {message.sentAt}</ul>
    				</div>
    			)}
				<div id="roomID" >
					<label>
						New Message: 
							<textarea 
							placeholder="type new messages here" 
							value={this.state.value} 
							onChange= {(event) => this.handleMessage(event)}
							/>
					</label>
					<input type="submit" value="Submit" onClick= {() => this.createMessage()} /> 

				</div> 
			</div> 
			)
	}
}

export default MessageList; 