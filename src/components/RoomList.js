import React, { Component } from 'react'; 

class RoomList extends Component {
	constructor(props) { 
		super(props);
		this.state = { 
			rooms: [], 
			value:'' 
		}; 
	
	this.roomsRef = this.props.firebase.database().ref('rooms');

	}; 

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val(); 
			room.key = snapshot.key; 
			this.setState ({ rooms: this.state.rooms.concat( room ) }); 
			console.log(this.state.rooms); 
		}); 
	}

	handleChange(event) {
		this.setState({value: event.target.value}); 
	}

	handleSubmit(event) { 
		event.preventDefault(); 
		this.createRoom(this.state.value);
		this.setState({value: ""});
	}

	createRoom(newRoomName) {
		console.log(newRoomName); 
		this.roomsRef.push({
			name: newRoomName,  
		
		}); 
	}


	render() {
		return (
			<div id="roomlist">{this.state.rooms.map( (room, index) => 
    			<ul key={index}>
    				<li onClick={(room) => this.changeActiveRoom(this.state.activeRoom)}</li>
    				</ul>
			)}
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label>
						Create Room: 
							<input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
					</label>
					<input type="submit" value="Submit" /> 

				</form> 
			</div> 
		); 
	}
}




export default RoomList; 