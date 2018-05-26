import React, { Component } from 'react'; 

class RoomList extends Component {
	constructor(props) { 
		super(props);
		this.state = { rooms: [] }; 
	
	this.roomsRef = this.props.firebase.database().ref('rooms');

	} 

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val(); 
			room.key = snapshot.key; 
			this.setState ({ rooms: this.state.rooms.concat( room ) }); 
			console.log(this.state.rooms); 
		}); 
	}

	handleChange(event) {
		(event) => this.setState({value: event.target.value}); 
		//need to handle & display new text 
	}

	handleSubmit(event) { 
		(event) => this.state.value; 
		console.log("A new room was created"); 
		event.preventDefault(); 
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
    			<div key={index}>
    				<ul>{room.name}</ul>
    				</div>
			)}
				<form onSubmit={this.handleSubmit}>
					<label>
						Create Room: 
							<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" 
					createRoom /> 

				</form> 
			</div> 
		); 
	}
}




export default RoomList; 