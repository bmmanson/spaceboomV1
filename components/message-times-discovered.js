import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { getTimesDiscoveredForMessage } from './../async';

class MessageTimesDiscovered extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			timesDiscovered: 0
		}
	}

	componentWillMount() {
		getTimesDiscoveredForMessage(this.props.message.id)
		.then( (data) => {
			if (data) {
				this.setState({
					timesDiscovered: data.timesDiscovered
				});
			}
		});
	}

	render() {

		const displayTimesDiscovered = (timesDiscovered) => {
			if (timesDiscovered === 1) {
				return "Discovered 1 time.";
			} else {
				return "Discovered " + timesDiscovered + " times.";
			}
		}

		return (
			<View style={{
					height: 20,  
					marginHorizontal: 10,
					marginTop: 6,
					borderStyle: 'solid', 
					borderBottomColor: '#E8E8E8', 
					borderBottomWidth: 1, 
					borderTopColor: '#E8E8E8', 
					borderTopWidth: 1,
					justifyContent: 'center', 
			 		alignItems: 'center'
					}}>
				<Text style={{
				 	textAlign: 'left',
				 	marginVertical: 6,
				 	fontSize: 12
				}}>
					{displayTimesDiscovered(this.state.timesDiscovered)}
				</Text>
			</View>
		);
	}
}

export { MessageTimesDiscovered };