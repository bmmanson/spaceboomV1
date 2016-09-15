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

			<ScrollView style={{flex: 10, backgroundColor: '#D9D9D9'}}> 
				
				<View style={{
					marginTop: 10,
					marginBottom: 10,
					shadowOpacity: 0.8,
					shadowRadius: 2,
					shadowOffset: {
						width: 1,
						height: 1}}}>
					<Message message={this.props.message} />
					<Comments comments={this.props.message.comments} />
				</View>
				<View style={{height: 240, marginVertical: 12}}>
					<MapView style={{flex: 1, 
						justifyContent: 'space-between',
					shadowOpacity: 0.8,
					shadowRadius: 2,
					shadowOffset: {
						width: 1,
						height: 1}}}
								showUsersLocation={false}
								scrollEnabled={false}
								zoomEnabled={false} 
								region={{latitude: this.props.message.latitude, 
										longitude: this.props.message.longitude,
										latitudeDelta: 0.005,
										longitudeDelta: 0.005}} />
				</View>
				<DeleteMessageButton message={this.props.message}/>
			</ScrollView>
			</View>
		);
	}
}

export { MessageDetailView };