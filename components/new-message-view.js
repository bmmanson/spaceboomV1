import React, { Component } from 'react';
import { Text, View, NavigatorIOS, TextInput } from 'react-native';

import { SubmitMessageButton } from './submit-message-button';
import { Map } from './map';

import { styles } from './../styles/main';
import { MessageHeader } from './message-header';


class NewMessageView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	render(){

		return (
			<View style={styles.container}>
				<Map height={5}/>
				<MessageHeader authorPic={'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469'}/>
					<TextInput style={{flex: 6, fontSize: 16, marginHorizontal: 10}} 
					placeholder={"Type your message here, then press submit. Anyone with Spaceboom who comes to this location will be able to read it!"}
					multiline={true}
					keyboardType={'default'} 
					onChangeText={(text) => this.setState({text})}
					value={this.state.text} />
				<SubmitMessageButton messageText={this.state.text} />
			</View>
		);
	}
}

export { NewMessageView };