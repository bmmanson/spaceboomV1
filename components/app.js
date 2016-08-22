import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import { LaunchPage } from './launch-page';
import { LoginView } from './login-view';
import { NewMessageView } from './new-message-view';
import { MessageMasterView } from './message-master-view';
import { MessageDetailView } from './message-detail-view';


class App extends Component {
	render () {
		return (
		<Router>
			<Scene key="root">
				<Scene key="login" initial={true} component={LoginView} title="Spaceboom" hideNavBar={true} />
				<Scene key="initial" component={LaunchPage} title="Spaceboom" hideBackImage={true} hideNavBar={false} />
				<Scene key="newMessage" component={NewMessageView} title="Post a Message" />
				<Scene key="messageMaster" component={MessageMasterView} title="Messages" />
				<Scene key="messageDetail" component={MessageDetailView} title="A Message" />
			</Scene>
		</Router>
		);
	}
}

export { App };