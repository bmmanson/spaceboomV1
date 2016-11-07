import React, { Component } from 'react';
import { Text, 
	View, 
	ScrollView,
	NavigatorIOS, 
	TextInput,
	Keyboard, 
	Dimensions, 
	LayoutAnimation } from 'react-native';

import { NewMessageHeader } from './new-message-header';
import { Map } from './map';

import { styles } from './../styles/main';

import { getUserLocationName } from './../async';

import { store } from './../store.js';
import { updateNewMessageText } from './../actions/';
import { connect } from 'react-redux';

const maxChars = 450;

class NewMessage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			counter: maxChars,
			mapHeight: 4
		};
	}

	componentWillMount () {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));

		navigator.geolocation.getCurrentPosition(
			function (initialPosition) {
				let latitude = parseFloat(initialPosition.coords.latitude); 
				let longitude = parseFloat(initialPosition.coords.longitude);
				getUserLocationName(latitude, longitude);
			},
			(error) => alert(error.message),
			{enableHighAccuracy: true}
		)
	}

	componentWillUnmount () {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	keyboardDidShow (e) {
		this.setState({
			mapHeight: .75,
		});
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	}
  
	keyboardDidHide (e) {
		this.setState({
			mapHeight: 4,
		});
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	} 

	render(){

		return (
			<View style={styles.container}>
				<Map height={this.state.mapHeight}/>
				<NewMessageHeader 
					currentSession={this.props.currentSession} 
					messageText={this.props.text}
					counter={this.state.counter} />
				<TextInput style={{flex: 6, fontSize: 16, marginHorizontal: 10}} 
				placeholder={"Type your message here, then press the send button. Anyone with Spaceboom who comes to this location will be able to read it!"}
				multiline={true}
				keyboardType={'default'} 
				onChangeText={(text) => {
					store.dispatch(updateNewMessageText(text));
					this.setState({counter: maxChars - text.length});
				}}
				maxLength={maxChars}
				value={this.props.text} />
				
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		text: state.currentSession.newMessageText,
		currentSession: state.currentSession
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeText: (text) => {dispatch(updateNewMessageText(text))}
	}
}

const NewMessageView = connect(
	mapStateToProps,
	mapDispatchToProps
)(NewMessage);

export { NewMessageView };