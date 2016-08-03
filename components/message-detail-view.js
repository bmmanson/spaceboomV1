import React, { Component } from 'react';
import { Text, View, MapView } from 'react-native';

import { styles } from './../styles/main';
import { Map } from './map';
import { MessageHeader } from './message-header';

class MessageDetailView extends Component {
	render () {
		return (
			<View style={styles.container}>
				<MapView style={{flex: 5}}
						showUsersLocation={false}
						scrollEnabled={false}
						zoomEnabled={false} 
						region={{latitude: this.props.message.locationCoords[0], 
								longitude: this.props.message.locationCoords[1],
								latitudeDelta: 0.005,
								longitudeDelta: 0.005}} />
				<MessageHeader 
					author={this.props.message.author} 
					locationName={this.props.message.locationName}
					authorPic={this.props.message.authorPic} />
					<Text style={{flex: 6, fontSize: 16, marginHorizontal: 10}}>
						{this.props.message.body}
					</Text>
			</View>
		);
	}
}

export { MessageDetailView };