import { store } from './../store';
import { addDiscoveredMessage } from './../actions';

const httpRequestForNewMessage = (latitude, longitude) => {
	let url = `http://localhost:1337/api/discovery/new?latitude=${latitude}&longitude=${longitude}&userId=2`
	return fetch(url, {method: "POST"});
}

const httpRequestToUpdateMessageAsUnread = (id) => {
	let url = "http://localhost:1337/api/discovery/unread/" + id;
	return fetch(url, {method: "PUT"});
}

export const checkForAndAddNewMessage = (latitude, longitude) => {
	httpRequestForNewMessage(latitude, longitude)
	.then(function (response) {
		let res = JSON.parse(response._bodyText);
		if (res.id !== null) {
			console.log("NEW MESSAGE, DISCOVERED");
			let m = {
				id: res.id,
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
		console.log("RESPONSE RECEIVED. SERVER UPDATED");
		console.log("Message marked as read:", res);
	})
}
