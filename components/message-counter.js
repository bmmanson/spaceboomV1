import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

class MessageCounter extends Component {

	render () {

		const textForComponent = function (filter) {
			if (filter === "DISCOVERED") {
				return "Messages Found: ";
			} else if (filter === "SENT") {
				return "Messages Submitted: ";
			}
		}

		const backgroundStyle = function (filter) {
			if (filter === "DISCOVERED") {
				return [styles.container, styles.discovered];
			} else if (filter === "SENT") {
				return [styles.container, styles.sent];
			}
		}

		return (
			<View style={backgroundStyle(this.props.filter)}>
				<Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: 16}}>
					{textForComponent(this.props.filter)} 
					<Text style={{fontStyle: 'normal', fontWeight: 'bold', fontSize: 16}}>
						{this.props.messageCount}
					</Text>
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	discovered: {
		backgroundColor: 'steelblue'
	},
	sent: {
		backgroundColor: 'skyblue'
	}


})

export { MessageCounter };