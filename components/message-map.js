import React, { Component } from 'react';
import { Text, View, MapView, StyleSheet } from 'react-native';

class MessageMap extends Component {

	render () {
		return (
		<View style={styles.view}>
			<View style={styles.locationInformation}>
				<View style={{flex: .3}}>
					<Text style={styles.locationTextTitle}>
						Location:
					</Text>
				</View>
				<View style={{flex: .7}}>
					<Text style={styles.locationText}>
						{this.props.message.city}
						{" "}
					</Text>
					<Text style={styles.locationText}>
						{this.props.message.locationName}
					</Text>
				</View>
			</View>
			<MapView style={styles.map}
						showUsersLocation={false}
						scrollEnabled={false}
						zoomEnabled={true} 
						region={{latitude: this.props.message.latitude, 
								longitude: this.props.message.longitude,
								latitudeDelta: 0.003,
								longitudeDelta: 0.003}} />
		</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		height: 240, 
		backgroundColor: '#FAFAFA', 
		borderTopColor: '#DBDBDB', 
		borderTopWidth: 3, 
		borderStyle: 'solid'
	},
	locationInformation: {
		flexDirection: "row", 
		borderStyle: 'solid', 
		borderTopColor: '#E8E8E8', 
		borderTopWidth: 1,
		borderBottomColor: '#E8E8E8',
		borderBottomWidth: 1,
		marginVertical: 8,
		marginHorizontal: 12
	},
	locationTextTitle: {
		textAlign: 'left', 
		fontWeight: 'bold', 
		marginTop: 6
	},
	locationText: {
		textAlign: 'right',
		fontSize: 12
	},
	map: {
		flex: 1, 
		justifyContent: 'space-between',
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			width: 1,
			height: 1},
		margin: 12,
		marginTop: 6,
		borderRadius: 5, 
		borderStyle: 'solid', 
		borderColor: '#B0B0B0', 
		borderWidth: 2,
	}
})

export { MessageMap };