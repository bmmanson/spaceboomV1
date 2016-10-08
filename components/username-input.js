import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';

import { UsernameButton } from './username-button';

class UsernameInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text:'',
			valid: false
		};
	}

	render() {

		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: .8}}>
					<TextInput
						style={{height: 30, marginTop: 4, marginLeft: 6, marginTop: 8}} 
						placeholder={"Your username here:"}
						placeholderTextColor={"#C7C7C7"}
						value={this.state.text}
						onChangeText={(text) => {
							if (text.length < 24) {
								this.setState({text})
							}
							let re = /[^a-z0-9]/gi;
							if (text.length === 0 || text.match(re)) {
								this.setState({valid: false});
							} else {
								this.setState({valid: true});
							}
						}} />
				</View>
				<View style={{flex: .2, 
							alignItems:'center',
							justifyContent:'center'}}>
					<UsernameButton username={this.state} />
				</View>
			</View>
		);
	}
}

export { UsernameInput };
