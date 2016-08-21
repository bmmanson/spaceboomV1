import { store } from './../store';
import { 
	addDiscoveredMessage,
	addSentMessage 
} from './../actions';

const httpRequestForNewDiscoveredMessage = (latitude, longitude, id) => {
	let url = `http://localhost:1337/api/discovery/new?latitude=${latitude}&longitude=${longitude}&userId=${id}`
	return fetch(url, {method: "POST"});
}

const httpRequestToPostNewMessage = (text, authorId, latitude, longitude, locationName, city) => {
	let message = {
		text,
		authorId,
		latitude,
		longitude,
		locationName,
		city
	};

	message = JSON.stringify(message);

	let request = {
		headers: {
			//'Accept': 'application/json',
			'Content-Type': 'application/json'
  		},
  		method: "POST",
  		body: message
    };

	let url = "http://localhost:1337/api/message/";
	return fetch(url, request);
}

const httpRequestForAllMessagesByUser = (id) => {
	let url = "http://localhost:1337/api/message/user/" + id;
	return fetch(url, {method: "GET"});
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

const httpRequestToSendAccessTokenToServer = (token) => {
	let url = "http://localhost:1337/auth/facebook/token?access_token=" + token;
	return fetch(url, {method: "POST"});
}

export const postNewMessageToServer = (text, authorId, latitude, longitude, locationName, city) => {
	return httpRequestToPostNewMessage(text, authorId, latitude, longitude, locationName, city)
	.then((response) => response.json())
	.then((response) => console.log("httpRequestToPostNewMessage RECEIVES:", response));
}

export const getAllMessagesByUser = (id) => {
	return httpRequestForAllMessagesByUser(id)
	.then((response) => response.json())
	.then((messages) => {
		for (var message in messages.sentMessages) {
			console.log("SENT MESSAGE", messages.sentMessages[message]);
			let m = messages.sentMessages[message];
			let id = m.id;
			let text = m.text; 
			let author = m.author.name;
			let authorPic = m.author.authorPic;
			let latitude = m.latitude.toString();
			let longitude = m.longitude.toString();
			let locationName = m.locationName;
			let city = m.city;
			store.dispatch(addSentMessage(
				id,
				text,
				author,
				authorPic,
				latitude,
				longitude,
				locationName,
				city
			));
		}
		for (var message in messages.discoveredMessages) {
			console.log("DISCOVERED", messages.discoveredMessages[message]);
			let m = messages.discoveredMessages[message].message;
			let id = m.id;
			let text = m.text;
			let author = m.author.name;
			let authorPic = m.author.authorPic;
			let latitude = m.latitude.toString();
			let longitude = m.longitude.toString();
			let locationName = m.locationName;
			let city = m.city;
			let unread = messages.discoveredMessages[message].unread;
			store.dispatch(addDiscoveredMessage(
				id,
				text,
				author,
				authorPic,
				latitude,
				longitude,
				locationName,
				city,
				unread
			));
		}
	})
}

export const sendAccessTokenToServer = (token) => {
	return httpRequestToSendAccessTokenToServer(token)
	.then(function (response) {
		console.log("RESPONSE RECEIVED BY sendAccessTokenToServer:", response)
		return response.json();
	})
	.catch(function (error) {
		console.log("ERROR FROM ACCESS TOKEN:", error);
	})
}

export const deleteSentMessageOnServer = (id) => {
	return httpRequestToDeleteSentMessage(id)
	.then( (response) => response.json() )
	.then( (response) => console.log("DELETED SENT MESSAGE. RESPONSE FROM SERVER:", response) )
}

export const deleteDiscoveredMessageOnServer = (id) => {
	return httpRequestToDeleteDiscoveredMessage(id)
	.then(function (response) {
		return response.json();
	})
}

export const checkForAndAddNewMessage = (latitude, longitude) => {
	return httpRequestForNewDiscoveredMessage(latitude, longitude, 32)
	.then(function (response) {
		return response.json();
	})
	.then(function (res) {
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
	.then( (response) => response.json() )
	.then(function (response) {
		if (response.message.id === null) {
			console.log("Note: server has already marked this message as unread. Something wrong on front end? See async/index.js");
		} else { 
			console.log("RESPONSE RECEIVED. SERVER UPDATED");
			console.log("Message marked as read:", response);
		}
	})
}
