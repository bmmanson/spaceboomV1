import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { CommentLikeButtonAndCounter } from './comment-like-button-and-counter';


//#C7C7C7

class Comment extends Component {
	render () {
		return (
			<View style={{flexDirection: 'row', 
			flex: 1,
			marginVertical: 8,
			backgroundColor: '#F5F5F5',
			}}>
				<View style={{flex: 2, 
					flexDirection: 'column'}}>
					<Image source={{uri: this.props.comment.authorPic}}
				style={{height: 36, width: 36, borderRadius: 18, alignSelf: 'center'}} />
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
						<Text style={{fontSize: 10, color: '#949494', marginVertical: 6}}>
						5m ago
						</Text>
					</View>
				</View>
				<View style={{flex: 3, flexDirection: 'column'}}>
					<CommentLikeButtonAndCounter comment={this.props.comment} />
				</View>
			</View>

		);
	}
}

export { Comment };
