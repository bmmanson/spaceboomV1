import React, {Component} from 'react';
import {
	Text,
	View,
	NavigatorIOS
} from 'react-native';

import { Map } from './map';
import { MenuButton } from './menu-button';
import { styles } from './../styles/main';
import { TitleBar } from './title-bar';
import { NewMessageView } from './new-message-view';

class LaunchPage extends Component {

	_handleNextPress(route){
		this.props.navigator.push(route);
	}

	render() {

		const postMessageRoute = {
			component: NewMessageView,
			title: "Post a Message"
		}

	    return (
	    	<View style={styles.container}>
	    		<TitleBar text={"Spaceboom"} />
	    		<Map height={10} />
	        	<MenuButton buttonText={"Post a Message"} 
	        	buttonColor={"skyblue"}
	        	buttonAction={() => this._handleNextPress(postMessageRoute)} />
	        	
	        	<MenuButton buttonText={"Discovered Messages"} 
	        	buttonColor={"steelblue"} />
	    	</View>
	    );
	}
}

export { LaunchPage };