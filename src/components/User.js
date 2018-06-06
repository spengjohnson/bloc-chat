import React, { Component } from 'react'; 

const displayName = ({value}) => <span>{value}</span> 

class User extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			email: '', 
			displayName: '', 
			newMessage: ''
		}; 
	
	this.provider = new this.props.firebase.auth.GoogleAuthProvider();
	this.userRef = this.props.firebase.database().ref('user');

	}

	login() {
		this.props.firebase.auth().signInWithPopup(this.provider).then(result => {
	    const token = result.credential.accessToken;
	    	console.log(token);
	    const user = result.user;
	    	console.log(user);
		}).catch(error => {
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    const email = error.email;
	    const credential = error.credential;
	});
}

	signOut() {
		this.props.firebase.auth().signOut().then(() => {console.log("sign out");
	})
		.catch(error => console.log(error)); 
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
  		this.props.setUser(user);
		});
	}



	render() {
		console.log(this.props.user); 
		return (
			<div className="login">
				<button onClick={() => this.login()}>Sign-in</button> 
				<button onClick={() => this.signOut()}>Sign-out</button>
				<div>UserID: {this.props.user ? this.props.user.displayName : 'Guest'} </div>
			</div> 
			); 
	}
}

export default User; 