import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { AuthorPic } from './author-pic';

class MessageHeader extends Component {
	render () {
		return (
			<View style={{height: 50, 
				flexDirection: 'row', 
				marginHorizontal: 10, 
				marginTop: 10}}>
				<AuthorPic message={this.props.message} size={48} />
				<View style={{marginLeft: 4}}>
					<Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 16}}>
						{this.props.message.author}
					</Text>
					<Text style={{fontSize: 14, marginTop: 3}}>
						{this.props.message.locationName}
					</Text>
				</View>
			</View>);
	}
}

export {MessageHeader};