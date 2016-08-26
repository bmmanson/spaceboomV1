import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

class MessageCounter extends Component {

	render () {

		const textForComponent = function (filter) {
			if (filter === "DISCOVERED") {
				return "Total Messages Found: ";
			} else if (filter === "SENT") {
				return "Total Messages Submitted: ";
			}
		}

		return (
			<View style={{flex: 1, backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontStyle: 'italic', textAlign: 'center'}}>
					{textForComponent(this.props.filter)} 
					<Text style={{fontStyle: 'normal', fontWeight: 'bold'}}>
						{this.props.messageCount}
					</Text>
				</Text>
			</View>
		);
	}
}

export { MessageCounter };