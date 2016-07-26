import React, { Component } from 'react';
import { Text, View, NavigatorIOS, TextInput } from 'react-native';

import { MenuButton } from './menu-button';
import { Map } from './map';

import { styles } from './../styles/main';
import { MessageHeader } from './message-header';

class NewMessageView extends Component {
	_handleBackPress() {
		this.props.navigator.pop();
	}	

	render(){

		return (
			<View style={styles.container}>
				<Map height={5}/>
				<MessageHeader />
					<TextInput style={{flex: 6, fontSize: 16, marginHorizontal: 10}} 
					placeholder={"Type your message here, then press submit. Anyone with Spaceboom who comes to this location will be able to read it!"}
					multiline={true}
					keyboardType={'default'} />
				<MenuButton buttonText={"Submit"} 
	        	buttonColor={"skyblue"}
	        	buttonAction={() => this._handleBackPress()} />
			</View>
		);
	}
}

export { NewMessageView };