import React, { Component } from 'react';
import { Text, View, NavigatorIOS, TextInput } from 'react-native';

import { MessageHeader } from './message-header';
import { SubmitMessageButton } from './submit-message-button';
import { Map } from './map';

import { styles } from './../styles/main';

import { store } from './../store.js';
import { updateNewMessageText } from './../actions/';
import { connect } from 'react-redux';

class NewMessage extends Component {

	render(){

		return (
			<View style={styles.container}>
				<Map height={5}/>
				<MessageHeader 
					authorPic={'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469'}
					author={} />
				<TextInput style={{flex: 6, fontSize: 16, marginHorizontal: 10}} 
				placeholder={"Type your message here, then press submit. Anyone with Spaceboom who comes to this location will be able to read it!"}
				multiline={true}
				keyboardType={'default'} 
				onChangeText={(text) => store.dispatch(updateNewMessageText(text))}
				value={this.props.text} />
				<SubmitMessageButton messageText={this.props.text} />
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		text: state.currentSession.newMessageText
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