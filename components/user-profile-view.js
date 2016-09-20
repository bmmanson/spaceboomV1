import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import { 
	getUserInfoForProfileFromServer, 
	getDiscoveredUsersFromServer 
} from './../async/';

import { comments } from './comments';
import { CommentReply } from './comment-reply';

let Dimensions = require('Dimensions');
let windowSize = Dimensions.get('window');

class UserProfileView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			downloadComplete: false,
			user: {
				id: 'downloading...',
				name: "downloading...",
				userprofile: {
					timesViewed: '??',
					messagesDiscovered: '??',
					messagesSent: '??',
					aboutMe: '??'
				},
			},
		};
	}

	componentWillMount() {
		getUserInfoForProfileFromServer(this.props.userId)
		.then( (user) => {
			if (user) {
				this.setState({
					downloadComplete: true,
					user
				});
			}
		});

		getDiscoveredUsersFromServer(this.props.userId)
		.then( (discoveredUsers) => {
			if (discoveredUsers) {
				this.setState({
					discoveredUsers
				})
			}
		})
		//separate http request for comments
	}

	render() {

		return (
		<View style={{flex: 1}}>
		<ScrollView style={{flex: 1, backgroundColor: '#D9D9D9'}}>
			<View style={{flex: 1, 
					backgroundColor: '#FAFAFA', 
					borderBottomColor: '#DBDBDB',
					backgroundColor: '#F5F5F5', 
					borderTopWidth: 1,
					borderBottomWidth: 3}}>
				<View style={{flex: 1, alignItems: 'stretch', backgroundColor: 'blue'}}>
					{displayProfilePicture(this.state)}
				</View>
				<View style={{minHeight: 120, 
					backgroundColor: '#FAFAFA',
					}}>
					<View style={{flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 4}}>
						<View style={{flexDirection: 'row'}}>
							<View style={{flex: .8}}>
								<Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 2, marginTop: 0}}>
									{this.state.user.name}
								</Text>
								<Text style={{fontSize: 12}}>
									Profile Views: {this.state.user.userprofile.timesViewed}
								</Text>
								<Text style={{fontSize: 12}}>
									Messages Found: {this.state.user.userprofile.messagesDiscovered}
								</Text>
								<Text style={{fontSize: 12}}>
									Messages Posted: {this.state.user.userprofile.messagesSent}
								</Text>
							</View>
							<View style={{flex: .2}}>
								<View style={{
									borderRadius: 3,
									borderStyle: "solid",
									borderWidth: 2,
									borderColor: '#B9D3EE',
									backgroundColor: '#F0F8FF',
									justifyContent: 'center', 
							 		alignItems: 'center',
							 		height: 28
								}}>
									<Text style={{fontWeight: 'bold', color: '#6C7B8B', fontSize: 10}}>
										SETTINGS
									</Text>
								</View>
							</View>
						</View>
						<View style={{
								marginTop: 6, 
								paddingBottom: 6,
								marginHorizontal: 10,
								borderStyle: 'solid',
								borderBottomColor: '#EDEDED', 
								borderBottomWidth: 2,
								minHeight: 60,
							}}>
							<Text style={{fontWeight: 'bold', marginBottom: 2}}>
								About me:
							</Text>
							<Text>
								{this.state.user.userprofile.aboutMe}
							</Text>
						</View>
					</View>
				</View>
				<View style={{
					height: 100, 
					backgroundColor: '#FAFAFA', 
					marginHorizontal: 4}}>
					<Text style={{textAlign: 'center', color: '#BABABA', marginVertical: 2}}>
						1 Discovered User:
					</Text>
					<View style={{marginVertical: 4}}>
						<Image source={require('./../img/ben_profile.jpg')} 
						style={{height: 52, width: 52, borderRadius: 26, alignSelf: 'center'}} />
						<Text style={{textAlign: 'center', fontSize: 12, color: '#C9C9C9', marginTop: 6, fontStyle: 'italic'}}>
							Ben
						</Text>
					</View>
				</View>
			</View>
	    </ScrollView>
	    <CommentReply message={this.props.message} />
	    </View>
		);
	}
}

const displayProfilePicture = function(state) {
	if (state.downloadComplete) {
		return (
			<View style={{flex: 1}}>
				<Image source={{uri: state.user.userprofile.profilePic}} style={{height: windowSize.width, width: windowSize.width}} />
			</View>
		);
	} else {
		return (
			<View style={{height: windowSize.width, width: windowSize.width}}>
			<Image source={require('./../img/spinner.gif')}
							style={{height: 32, width: 32, margin: 10, alignSelf: 'center'}} />
			</View>
		);
	}
}

export { UserProfileView };