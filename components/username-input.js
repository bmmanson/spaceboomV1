import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';

class UsernameInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text:'',
			validUsername: false};
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
							if (text.length === 0) {
								this.setState({validUsername: false});
							} else {
								this.setState({validUsername: true});
							}
						}} />
				</View>
				<View style={{flex: .2, alignItems:'center',
			justifyContent:'center'}}>
					<View style={{borderRadius: 4,
								width: 50,
								padding: 3,
								backgroundColor: '#EEC900'}}>
						<TouchableHighlight onPress={()=>{}}>
							<Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
								SEND
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	}
}

export { UsernameInput };
