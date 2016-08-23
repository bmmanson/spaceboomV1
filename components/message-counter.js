import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

class MessageCounter extends Component {

	render () {

		const textForComponent = function (filter) {
			if (filter === "DISCOVERED") {
				return "Total Messages Found:"
			} else if (filter === "SENT") {
				return "Total Messages Submitted:"
			}
		}

		return (
			<View style={{flex: 1}}>
				<Text>
					{textForComponent(this.props.filter)} 
					<Text>
						{this.props.messageCount}
					</Text>
				</Text>
			</View>
		);
	}
}

export { MessageCounter };