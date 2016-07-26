import React, { Component } from 'react';
import { Text } from 'react-native';

class TitleBar extends Component {
	render () {
		return (
			<Text style={{backgroundColor: 'black',
						flex: 1,
   						flexDirection: 'column',
    					textAlign: 'center',
    					justifyContent: 'center',
    					alignItems: 'center',
    					color: 'white',
    					fontWeight: 'bold',
    					fontSize: 28}}>
				{this.props.text}
			</Text>
		)
	}
}

export { TitleBar };