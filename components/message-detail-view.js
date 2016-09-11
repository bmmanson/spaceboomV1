import React, { Component } from 'react';
import { Text, View, MapView, ScrollView } from 'react-native';

import { styles } from './../styles/main';
import { DeleteMessageButton } from './delete-message-button';
import { Message } from './message';
import { Comments } from './comments';

class MessageDetailView extends Component {

	render () {

		return (
			<View style={{flex: 1}}>

			<ScrollView style={{flex: 7, backgroundColor: '#E6E6FA'}}> 
				<Message message={this.props.message} />
				<Comments comments={this.props.message.comments} />
			</ScrollView>
			<MapView style={{flex: 3, justifyContent: 'space-between'}}
						showUsersLocation={false}
						scrollEnabled={false}
						zoomEnabled={false} 
						region={{latitude: this.props.message.latitude, 
								longitude: this.props.message.longitude,
								latitudeDelta: 0.005,
								longitudeDelta: 0.005}} />
			<DeleteMessageButton message={this.props.message}/>
			</View>
		);
	}
}

export { MessageDetailView };