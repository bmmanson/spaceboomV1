import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';

class UsernameToggle extends Component {

	//change with props later

	constructor(props) {
		super(props);
		this.state = {displayRealIdentity: true};
	}

	render() {

		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: .8}}>
					<Text style={{flex: 1, fontSize: 16, marginLeft: 8, marginTop: 12}}>
					Display identity from Facebook
					</Text>
				</View>
				<View style={{flex: .2, alignItems:'center',
							justifyContent:'center'}}>
					<Switch
						onTintColor="#EEC900" 
						onValueChange={(value) => this.setState({displayRealIdentity: value})}
						value={this.state.displayRealIdentity} />
				</View>
			</View>
		);
	}
}

export { UsernameToggle };