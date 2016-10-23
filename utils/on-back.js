import { Actions } from 'react-native-router-flux';

import { getCommentsForMessage, getWallPostsFromServer } from './../async';
import { deleteAllComments } from './../actions';
import { store } from './../store';

export const userProfileBackButton = (array) => {
	Actions.pop();
	store.dispatch(deleteAllComments());
	let stack = array.children;
	let indexOfCurrentView = stack.length - 2;
	if (stack[indexOfCurrentView].userId) {
		//if there is a user id, it is another profile
		let userId = stack[indexOfCurrentView].userId;
		getWallPostsFromServer(userId);
	} else if (stack[indexOfCurrentView].message) {
		// else, if it's a message
		let messageId = stack[indexOfCurrentView].message.id;
		getCommentsForMessage(messageId);
	} else {
		//is it possible it can be neither of the above?
		//for now, let's say it isn't
	}
}