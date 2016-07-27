import React, { Component } from 'react';
import {
	MapView
} from 'react-native';
import { styles } from './../styles/main.js';

class Map extends Component {
	render() {
		return (
		<MapView 
		style={{flex: this.props.height, justifyContent: 'center', alignItems: 'center'}}
        showsUserLocation={true}
        followUserLocation={true}
        scrollEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false} />
		);
	}
}

export { Map };