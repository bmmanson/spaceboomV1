import { store } from './../store';
import { addDiscoveredMessage } from './../actions';

const httpRequestForNewDiscoveredMessage = (latitude, longitude) => {
	let url = `http://localhost:1337/api/discovery/new?latitude=${latitude}&longitude=${longitude}&userId=2`
	return fetch(url, {method: "POST"});
}

const httpRequestToUpdateMessageAsUnread = (id) => {
	let url = "http://localhost:1337/api/discovery/unread/" + id;
	return fetch(url, {method: "PUT"});
}

const httpRequestToDeleteSentMessage = (id) => {
	let url = "http://localhost:1337/api/message/hide/" + id;
	return fetch(url, {method: "PUT"});
}

const httpRequestToDeleteDiscoveredMessage = (id) => {
	let url = "http://localhost:1337/api/message/hide/" + id;
	return fetch(url, {method: "PUT"});
}

export const deleteSentMessageOnServer = (id) => {
	httpRequestToDeleteSentMessage(id)
	.then(function(response){
		let res = JSON.parse(response._bodyText);
		console.log("DELETED SENT MESSAGE. RESPONSE FROM SERVER:", res);
	})
}

export const deleteDiscoveredMessageOnServer = (id) => {
	httpRequestToDeleteDiscoveredMessage(id)
	.then(function(response){
		let res = JSON.parse(response._bodyText);
		console.log("DELETED SENT MESSAGE. RESPONSE FROM SERVER:", res);
	})
}

export const checkForAndAddNewMessage = (latitude, longitude) => {
	httpRequestForNewDiscoveredMessage(latitude, longitude)
	.then(function (response) {
		let res = JSON.parse(response._bodyText);
		if (res.id !== null) {
			console.log("NEW MESSAGE, DISCOVERED");
			let m = {
				id: res.message.id,
				body: res.message.text, 
				author: res.message.author.name,
				locationName: res.message.locationName,
				latitude: parseFloat(res.message.latitude),
				longitude: parseFloat(res.message.longitude),
				city: res.message.city,
				authorPic: res.message.author.authorPic
			}
			console.log("NEW MESSAGE:", m);
			store.dispatch(addDiscoveredMessage(
				m.id,
				m.body,
				m.author,
				m.authorPic,
				m.latitude,
				m.longitude,
				m.locationName,
				m.city
			))
		} else {
			console.log("Response from server received. No new message");
		}

	})
}

export const updateMessageAsUnreadOnServer = (id) => {
	httpRequestToUpdateMessageAsUnread(id)
	.then(function (response) {
		let res = JSON.parse(response._bodyText);
		if (res.message.id === null) {
			console.log("Note: server has already marked this message as unread. Something wrong on front end? See async/index.js");
		} else { 
			console.log("RESPONSE RECEIVED. SERVER UPDATED");
			console.log("Message marked as read:", res);
		}
	})
}
