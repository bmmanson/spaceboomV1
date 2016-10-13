import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

import { getDataForSettings } from './../async';

class SettingsAboutMe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: this.props.aboutMe
		};
	}

	render () {
		return (
		<View style={{flexDirection: 'column'}}>
			<View style={{flex: .8}}>
				<TextInput
					style={{height: 40, marginLeft: 6}}
					onChangeText={(text) => this.setState({text})}
        			value={this.state.text}
        			placeholder={"About me"} />
        		<Text>
        			{this.props.aboutMe}
        		</Text>
			</View>
			<View style={{flex: .2}}>

			</View>
		</View>
		);
	}

}

export { SettingsAboutMe };