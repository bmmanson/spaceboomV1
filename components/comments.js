import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { Comment } from './comment';

class Comments extends Component {


	render() {

		let displayComments = function(comments) {
			
			if (comments.length) {
				return (
					comments.map((comment, i) =>
						(<Comment comment={comment} key={i} />)
					)
				)
			} 
		}

		let displayCommentsWhenDownloadCompletes = function (comments, downloadComplete) {
			if (downloadComplete === true) {
				return (
					<View style={{flex: 7, 
							backgroundColor: '#F5F5F5',
							borderStyle: 'solid', 
							borderColor: '#8C8C8C', 
							borderBottomWidth: 1,
							}}>
						{displayComments(comments)}
					</View>
				);
			} else {
				return (
					<View style={{flex: 7, 
							backgroundColor: '#F5F5F5',
							borderStyle: 'solid', 
							borderColor: '#8C8C8C', 
							borderBottomWidth: 1,
							}}>
						<View>
							<Image source={require('./../img/spinner.gif')}
							style={{height: 32, width: 32, margin: 10, alignSelf: 'center'}} />
							<Text style={{textAlign: 'center', fontSize: 12, color: '#949494', marginVertical: 4}}>
								Downloading comments...
							</Text>
						</View>
					</View>
				);
			}
		}

		return (
			<View>
			{displayCommentsWhenDownloadCompletes(this.props.comments, this.props.downloadComplete)}
			</View>
		);
	}
}

export { Comments };