import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { MessageHeader } from './message-header';

class Message extends Component {
	render () {
		return (
			<View style={{flex: 7, 
				borderStyle: 'solid', 
				borderColor: '#303030', 
				backgroundColor: '#FAFAFA', 
				borderWidth: 1, 
				borderRadius: 3, 
				margin: 10,
				marginTop: 2,
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: {
					width: 1,
					height: 1
				}}}>
				<MessageHeader 
					author={this.props.message.author} 
					locationName={this.props.message.locationName}
					authorPic={this.props.message.authorPic} />
				<Text style={{flex: 3, fontSize: 16, marginHorizontal: 10}}>
					{this.props.message.body}
				</Text>
				<View style={{flex: .5,  
						marginHorizontal: 10,
						borderStyle: 'solid', 
						borderBottomColor: '#303030', 
						borderBottomWidth: 1, 
						borderTopColor: '#303030', 
						borderTopWidth: 1,
						justifyContent: 'center', 
				 		alignItems: 'center'
						}}>
					<Text style={{fontSize: 12,
						alignItems: 'center',
					 	textAlign: 'center'
					}}>
						Discovered 0 times.
					</Text>
				</View>
				 <View style={{flex: 1, flexDirection: 'row'}}>
				 	<View style={{flex: 1, 
				 			justifyContent: 'center', 
				 			alignItems: 'center'
				 		}}>
					 	<Text style={{
							flexDirection: 'column',
					 		justifyContent: 'center',
	    					alignItems: 'center',
					 		textAlign: 'center', 
					 		fontWeight: 'bold', 
					 		color: '#1874CD',
	    					}}>
					 		Comment
					 	</Text>
				 	</View>
				 	<View style={{flex: 1, 
				 		justifyContent: 'center', 
				 		alignItems: 'center'
				 	}}>
					 	<Text style={{
					 		flexDirection: 'column',
					 		justifyContent: 'center',
	    					alignItems: 'center',
					 		textAlign: 'center', 
					 		fontWeight: 'bold', 
					 		color: '#1874CD',
					 		}}>
					 		Report
					 	</Text>
				 	</View>
				</View>
			</View>
		);
	}
}

export { Message };