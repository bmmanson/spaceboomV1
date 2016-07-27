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
						region={{latitude: this.props.locationCoords[0], 
								longitude: this.props.locationCoords[1],
								latitudeDelta: 0.005,
								longitudeDelta: 0.005}} />
				<MessageHeader 
					author={this.props.author} 
					locationName={this.props.locationName}
					authorPic={this.props.authorPic} />
					<Text style={{flex: 6, fontSize: 16, marginHorizontal: 10}}>
						{this.props.body}
					</Text>
			</View>
		);
	}
}

export { MessageDetailView };