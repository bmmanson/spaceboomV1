import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class MessageInList extends Component {

	render () {
		return (
			//onPress goes in the View tag
			<View style={{height: 96, 
						flexWrap: 'wrap'}}>
				<Image source={{uri: this.props.authorPic}} 
					style={{height: 48,
							width: 48,
							marginTop: 24, marginBottom: 24,
							marginLeft: 12, marginRight: 12,
							borderRadius: 24}}/>
				<View style={{marginTop: 12, marginBottom: 12}}>
		    	<Text style={{fontWeight: 'bold', fontSize: 18}}>{this.props.author}</Text>
		    	<Text>{this.props.locationName} - {this.props.city}</Text>
		    	<Text style={{color: 'gainsboro', textAlign:'left', width: 280}}
		    		numberOfLines={2}>
		 		{this.props.body}</Text>
		    	</View>
	    	</View>
		);
	}
}

export { MessageInList };

