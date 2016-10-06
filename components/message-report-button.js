import React, { Component } from 'react';
import { Text, View, TouchableHighlight, AlertIOS } from 'react-native';
import { reportMessageToServer } from './../async';

class MessageReportButton extends Component {
	
	render() {

		const reportMessage = (message) => {
			AlertIOS.alert(
			"Report Message",
			"Do you want to flag this message as inappropriate? If you tap yes, a moderator will check whether this message or its comments contain inappropriate material.",
			[
			{
				text: "No",
				onPress: () => console.log("user didn't delete message"),
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => {
					reportMessageToServer(message.id)
					.then((data) => {
						AlertIOS.alert("", "You have successfully reported this message. A moderator will inspect it shortly and take action, if appropriate.");
					})
				}
			}
			])
		}

		return (
		<View style={{flex: 1, 
	 		justifyContent: 'center', 
	 		alignItems: 'center'
	 	}}>
	 		<TouchableHighlight
	 			style={{flex: 1,
	 			justifyContent: 'center', 
	 			alignItems: 'center'}}
	 			onPress={() => {reportMessage(this.props.message)}}>
		 	<Text style={{
		 		flexDirection: 'column',
		 		justifyContent: 'center',
				alignItems: 'center',
		 		textAlign: 'center', 
		 		fontWeight: 'bold', 
		 		color: '#7F7F7F',
		 		}}>
		 		Report
		 	</Text>
		 	</TouchableHighlight>
	 	</View>
		);
	}
}

export { MessageReportButton };