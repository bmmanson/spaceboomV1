import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Comment } from './comment';

class Comments extends Component {


	render() {

		let displayComments = function(comments) {
			return (
				comments.map((comment, i) =>
					(<Comment message={comment} key={i} />)
				)
			)
		}

		return (
			<View>
			{displayComments(this.props.comments)}
			</View>
		);
	}
}

export { Comments };