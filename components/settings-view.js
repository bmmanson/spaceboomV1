import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, AlertIOS } from 'react-native';

import { UsernameToggle } from './username-toggle';
import { SettingsAboutMe } from './settings-about-me';
import { UsernameButton } from './username-button';
import { getDataForSettings, sendAboutMe } from './../async';

class SettingsView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			aboutMe: 'downloading...',
			username: "",
			valid: true,
			displayRealIdentity: true
		};
	}

	componentWillMount () {
		getDataForSettings()
		.then((data) => {
			if (data) {
				this.setState({
					aboutMe: data.aboutMe,
					username: data.username,
					displayRealIdentity: data.displayRealIdentity
				});
			}
		})
	}

	render() {

		const sendAboutMeToServer = (aboutMe) => {
			sendAboutMe(aboutMe)
			.then((aboutMe) => {
				AlertIOS.alert("", "You have successfully updated your bio.");
			})
		}

		return (
			<View style={{flex: 1, backgroundColor: 'steelblue'}}>
				<View style={{flex: 1, marginHorizontal: 12, backgroundColor: 'white'}}>
					<View style={{height: 60, flexDirection: 'row'}}>
						<View style={{flex: .8}}>
							<TextInput
								style={{height: 60, marginLeft: 6, fontSize: 16}}
								onChangeText={(text) => this.setState({aboutMe: text})}
			        			value={this.state.aboutMe}
			        			placeholder={"About me"}
			        			placeholderTextColor={"#C7C7C7"}
			        			multiline={true}
			        			maxLength={125} />
						</View>
						<View style={{flex: .2, alignItems:'center', justifyContent:'center'}}>
							<View style={{borderRadius: 4,
										alignSelf: 'center',
										width: 50,
										padding: 3,
										backgroundColor: '#EEC900', alignItems:'center', justifyContent:'center'}}>
								<TouchableHighlight onPress={() => {
									sendAboutMeToServer(this.state.aboutMe)
									}} 
									style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
									<Text style={{fontWeight: 'bold', color: 'white'}}>
										SEND
									</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>
					<View style={{height: 40, flexDirection: 'row'}}>
						<View style={{flex: .8}}>
							<TextInput
									style={{height: 60, marginLeft: 6, fontSize: 16}}
									onChangeText={ (text) => {
										if (text.length < 25) {
											this.setState({username: text})
										}
										let re = /[^a-z0-9]/gi;
										if (text.length < 3 || text.match(re)) {
											this.setState({valid: false});
										} else {
											this.setState({valid: true});
										}
									}}
				        			placeholder={"Your username here:"}
									placeholderTextColor={"#C7C7C7"} 
									value={this.state.username} />
						</View>
						<View style={{flex: .2, alignItems:'center', justifyContent:'center'}}>
							<UsernameButton username={this.state} />
						</View>
					</View>
					
				</View>
			</View>
		);
	}
}

export { SettingsView };