import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import { 
	getUserInfoForProfileFromServer, 
	getDiscoveredUsersFromServer 
} from './../async/';

import { comments } from './comments';
import { UserProfileDiscoveredUsers } from './user-profile-discovered-users';
import { CommentReply } from './comment-reply';

let Dimensions = require('Dimensions');
let windowSize = Dimensions.get('window');

class UserProfileView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			discoveredUsers: [],
			downloadComplete: false,
			user: {
				id: 'downloading...',
				name: "downloading...",
				userprofile: {
					timesViewed: '??',
					messagesDiscovered: '??',
					messagesSent: '??',
					aboutMe: '??',
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
			console.log("DISCOVERED USERS FROM PROFILE VIEW", discoveredUsers);
			if (discoveredUsers) {
				this.setState({
					discoveredUsers
				})
			}
		})
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
				<View style={{minHeight: 80, 
					backgroundColor: '#FAFAFA',
					}}>
					<View style={{flex: 1, marginLeft: 18, marginRight: 18, marginTop: 18, marginBottom: 4}}>
						<View style={{flexDirection: 'row'}}>
							<View style={{flex: .8}}>
								<Text style={{fontWeight: 'bold', color: '#1C86EE', fontSize: 16, marginBottom: 0, marginTop: 0}}>
									{this.state.user.name}
								</Text>
								<Text style={{fontSize: 12}}>
									Profile Views: {this.state.user.userprofile.timesViewed}
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
							 		height: 28,
							 		marginTop: 0
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
								marginHorizontal: 0,
								minHeight: 8,
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
				<UserProfileDiscoveredUsers discoveredUsers={this.state.discoveredUsers} />
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

/*
<Text style={{fontSize: 12, textAlign: 'right'}}>
	Messages Found: {this.state.user.userprofile.messagesDiscovered}
</Text>
<Text style={{fontSize: 12, textAlign: 'right'}}>
	Messages Posted: {this.state.user.userprofile.messagesSent}
</Text>
*/