import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { UsernameInput } from './username-input';
import { UsernameToggle } from './username-toggle';
import { UsernameContinueButton } from './username-continue-button';

class NewUsername extends Component {

	render () {
		return (
			<View style={{flex: 1, backgroundColor: 'steelblue'}}>
				<View style={{flex: 1}} />
				<View style={{flex: 2, alignItems:'center',
        			justifyContent:'center'}}>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 16, marginBottom: 6}}>
						Hello, {this.props.firstName}! Welcome to Spaceboom!
					</Text>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 6}}>
						Choose a username:
					</Text>
				</View>
				<View style={{flex: .2}} />
				<View style={{flex: 2.5, 
							backgroundColor: 'white', 
							marginHorizontal: 18,
							borderStyle: 'solid',
							borderWidth: 1,
							borderColor: '#A8A8A8',
							borderRadius: 5}}>
					<View style={{flex: 1, borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor:'#CFCFCF'}}>
						<UsernameInput 
							userCanContinue={this.props.userCanContinue} />
					</View>
					<View style={{flex: 1}}>
						<UsernameToggle 
							userCanContinue={this.props.userCanContinue} />
					</View>
				</View>
				<View style={{flex: 1}} />
				<View style={{flex: 3, alignItems:'center',
    			justifyContent:'center'}}>
					<Image source={require('./../img/logo.png')}
						style={{height: 56, 
								width: 56}} />
					<Text style={{textAlign: 'center', color: 'white', fontSize: 36}}>
						spaceboom
					</Text>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>
						a location-based messaging app
					</Text>
				</View>
				<View style={{flex: 2, alignItems:'center',
    			justifyContent:'center'}}>
					<UsernameContinueButton 
						userCanContinue={this.props.userCanContinue} />
				</View>
				<View style={{flex: 8}} />
			</View>
		);
	}
}

const userStatus = (currentSession) => {
	if (currentSession["username"] === "NULL" || currentSession["username"] === null) {
		return false;
	} else {
		return true;	
	} 
}

const mapStateToProps = (state) => {
	return {
		userCanContinue: userStatus(state.currentSession),
		firstName: state.currentSession.facebookName.split(' ')[0],
	};
}

const NewUsernameView = connect(
	mapStateToProps
)(NewUsername);


export { NewUsernameView };