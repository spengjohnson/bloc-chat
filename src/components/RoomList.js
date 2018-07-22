import React, { Component } from 'react'; 
import './RoomList.css'; 

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
			//console.log(this.state.rooms); 
		}); 
	    this.roomsRef.on("child_removed", snapshot => {
      		let newRooms = this.state.rooms.filter(
        	room => this.props.activeRoom.key !== room.key
      		);
      	this.setState({ rooms: newRooms });
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

	deleteRoom() {
		this.roomsRef.child(this.props.activeRoom.key).remove();
	}

	render() {
		
		return (
			<div id="roomlist">{this.state.rooms.map( (room, index) => 
    			<ul key={index}>
    				<li onClick={() => this.props.changeActiveRoom(room)}>{ room.name }<hr/>
    				{if ({room.name}===activeRoom) {
	    					<strong>{room.name}</strong>
	    					}
	    					else{
	    						{room.name}
	    					}
	    				}
	    				{isActiveRoom ? yes : no }
	    			</li>
	    				
    			</ul>
			)}
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label>
							<input type="text" value={this.state.value} placeholder= "create new room" onChange={(e) => this.handleChange(e)} />
					</label>

					<input type="submit" value="Submit" /> 

				</form> 
				<button name ="Delete" onClick={ this.deleteRoom.bind(this) }> Delete Room </button>
			</div> 
		); 
	}
}




export default RoomList; 