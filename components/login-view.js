import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { LoginManager } from 'react-native-fbsdk';

//import { styles } from './../styles/main';
import { FBLogin } from './fb-login';

import { store } from './../store';
import { deleteAllMessages, deleteAllComments } from './../actions/';

class Login extends Component {

	componentWillMount() {
		LoginManager.logOut();
		store.dispatch(deleteAllMessages());
		store.dispatch(deleteAllComments());
	}

	render(){
		return (
			<View style={{flex: 1, backgroundColor: 'steelblue'}}>
				<View style={{flex: 4}} />
				<View style={{flex: 4, alignItems:'center',
        			justifyContent:'center'}}>
				<Image source={require('./../img/logo.png')}
						style={{height: 110, 
								width: 110}} />
				</View>
				<View style={{flex: 1}} >
					<Text style={{textAlign: 'center', color: 'white', fontSize: 56}}>
						spaceboom
					</Text>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
						a location-based messaging app
					</Text>
				</View>
				<View style={{flex: 9, alignItems:'center',
        			justifyContent:'center'}}>
					{currentlyDownloading(this.props.currentSession)}
				</View>
				<View style={{alignItems:'center',
        			justifyContent:'center'}}>
					<FBLogin />
				</View>
				<View style={{flex: 1}} />
				<View style={{flex: 1}}>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
						created by Ben Manson, 2016
					</Text>
				</View>
				<View style={{flex: 1}} />
			</View>
		);
	}
}

const currentlyDownloading = (state) => {
	if (state.loggingInOnAppLaunch) {
		return (
			<View style={{flex: 1, alignItems:'center',
        			justifyContent:'center'}}>
				<View style={{flex: .8, 
					alignItems:'center',
        			justifyContent:'center'}}>
	        		<View style={{
	        			backgroundColor: '#F5F5F5',
	        			borderStyle: 'solid',
	        			borderWidth: 2,
	        			borderColor: '#BABABA',
	        			borderRadius: 5

	        		}}>
					<Image source={require('./../img/spinner.gif')}
					style={{height: 32, 
							width: 32,
							margin: 4}} />
					</View>
				</View>
				<View style={{flex: .2}}>
				<Text style={{color: 'white'}}>
					Logging in...
				</Text>
				</View>
			</View>
		);
	} else {
		return (<View />);
	}
}

const mapStateToProps = (state) => {
	return {
		currentSession: state.currentSession,
	};
}

const LoginView = connect(
	mapStateToProps
)(Login);

export { LoginView };