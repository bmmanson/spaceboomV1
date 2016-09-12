import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class Comment extends Component {
	render () {
		return (
			<View style={{flexDirection: 'row', 
			flex: 1,
			marginVertical: 8,
			borderStyle: 'solid',
			borderBottomWidth: 2, 
			borderBottomColor: '#E0E0E0',
			borderTopWidth: 1,
			borderTopColor: '#E0E0E0'}}>
				<View style={{flex: 2, 
					flexDirection: 'column', 
					justifyContent: 'center',
    				alignItems: 'center'}}>
					<Image source={{uri: this.props.comment.authorPic}}
				style={{height: 32, width: 32, borderRadius: 16}} />
				</View>
				<View style={{flex: 8, 
					flexDirection: 'column'}}>
					<View style={{flex: 1, marginTop: 4}}>
						<Text style={{fontWeight: 'bold', fontSize: 12, margin: 0}}>
						{this.props.comment.author}
						</Text>
						<Text style={{fontSize: 12, margin: 0}}>
						{this.props.comment.body}
						</Text>
						<Text style={{fontSize: 10, color: '#C7C7C7', marginVertical: 6}}>
						5m ago
						</Text>
					</View>
				</View>
				<View style={{flex: 2, flexDirection: 'column'}}>
				</View>
			</View>

		);
	}
}

export { Comment };

			// <View style={{flex: 7, 
			// 	borderStyle: 'solid', 
			// 	borderColor: '#8C8C8C', 
			// 	backgroundColor: '#FAFAFA', 
			// 	borderWidth: 1, 
			// 	borderRadius: 3, 
			// 	margin: 10,
			// 	marginTop: 2,
			// 	shadowOpacity: 0.8,
			// 	shadowRadius: 2,
			// 	shadowOffset: {
			// 		width: 1,
			// 		height: 1
			// 	}}}>
			// 	<MessageHeader 
			// 		author={this.props.message.author} 
			// 		locationName={this.props.message.locationName}
			// 		authorPic={this.props.message.authorPic} />
			// 	<Text style={{flex: 3,
			// 		minHeight: 40, 
			// 		fontSize: 14, 
			// 		marginHorizontal: 10, 
			// 		marginTop: 10, 
			// 		marginBottom: 6}}>
			// 		{this.props.message.body}
			// 	</Text>
			// 	 <View style={{flex: 1, flexDirection: 'row'}}>
			// 	 	<View style={{flex: 1, 
			// 	 			justifyContent: 'center', 
			// 	 			alignItems: 'center'
			// 	 		}}>
			// 		 	<Text style={{
			// 				flexDirection: 'column',
			// 		 		justifyContent: 'center',
	  //   					alignItems: 'center',
			// 		 		textAlign: 'center', 
			// 		 		fontWeight: 'bold', 
			// 		 		color: '#1874CD',
	  //   					}}>
			// 		 		Delete
			// 		 	</Text>
			// 	 	</View>
			// 	 	<View style={{flex: 1, 
			// 	 		justifyContent: 'center', 
			// 	 		alignItems: 'center'
			// 	 	}}>
			// 		 	<Text style={{
			// 		 		flexDirection: 'column',
			// 		 		justifyContent: 'center',
	  //   					alignItems: 'center',
			// 		 		textAlign: 'center', 
			// 		 		fontWeight: 'bold', 
			// 		 		color: '#1874CD',
			// 		 		}}>
			// 		 		Report
			// 		 	</Text>
			// 	 	</View>
			// 	</View>
			// </View>