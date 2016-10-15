import React, { Component } from 'react';
import { Text, View, Switch, StyleSheet, AlertIOS } from 'react-native';
import { toggleNameDisplayedOnServer } from './../async/';

class UsernameToggle extends Component {

	constructor(props) {
		super(props);
		this.state = {displayRealIdentity: true};
	}

	render() {

		const textColor = (canContinue) => {
			if (canContinue) {
				return styles.text;
			} else {
				return [styles.text, styles.pending];
			}
		}

		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: .8}}>
					<Text style={textColor(this.props.userCanContinue)}>
					Display name from Facebook
					</Text>
				</View>
				<View style={{flex: .2, alignItems:'center',
							justifyContent:'center'}}>
					<Switch
						onTintColor="#EEC900" 
						onValueChange={(value) => {
							this.setState({displayRealIdentity: value});
							toggleNameDisplayedOnServer(value)
							.then((data) => {
								AlertIOS.alert("Success!");								
							})
						}}
						value={this.state.displayRealIdentity}
						disabled={!this.props.userCanContinue} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		flex: 1, 
		fontSize: 16, 
		marginLeft: 8, 
		marginTop: 12
	},
	pending: {
		color: '#B8B8B8'
	}
});

export { UsernameToggle };