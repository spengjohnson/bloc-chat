import React, { Component } from 'react'; 

class User extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			email: '', 
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
		this.props.firebase.auth().signOut();		
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
  		this.props.user;
		});
	}

	render() {
		return (
			<div className="login">
				<button onClick={() => this.login()}>Sign-in</button> 
				<button onClick={() => this.signOut()}>Sign-out</button>
			</div> 
			)
	}
}

export default User; 