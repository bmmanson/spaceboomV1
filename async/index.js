import { store } from './../store';
import { 
	addDiscoveredMessage,
	addSentMessage,
	addCurrentSessionOnLogin,
	addComment,
	deleteAllComments,
	markCommentAsLiked,
	markCommentAsUnliked

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
			'Content-Type': 'application/json'
  		},
  		method: "POST",
  		body: message
    };

	let url = "http://localhost:1337/api/message/";
	return fetch(url, request);
}

const httpRequestForAllUserDataOnLogin = (id) => {
	let url = "http://localhost:1337/api/user/login/" + id;
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

const httpRequestToLikeComment = (commentId) => {
	let url = "http://localhost:1337/api/comment/like/" + commentId;
	return fetch(url, {method: "POST"});
}

const httpRequestToUnlikeComment = (commentId) => {
	let url = "http://localhost:1337/api/comment/like/" + commentId;
	return fetch(url, {method: "DELETE"});
}

const httpRequestForCommentsForMessage = (messageId) => {
	let url = "http://localhost:1337/api/comment/message/" + messageId;
	return fetch(url, {method: "GET"});
}

export const postNewMessageToServer = (text, authorId, latitude, longitude, locationName, city) => {
	return httpRequestToPostNewMessage(text, authorId, latitude, longitude, locationName, city)
	.then((response) => response.json())
}

export const postCommentAsLikedOnServer = (commentId, numberOfLikes) => {
	return httpRequestToLikeComment(commentId)
	.then((response) => response.json())
	.then((data) => {
		if (data) {
			store.dispatch(markCommentAsLiked(commentId, numberOfLikes));
			return "COMPLETE";
		}
	})
}

export const postCommentAsUnlikedOnServer = (commentId, numberOfLikes) => {
	return httpRequestToUnlikeComment(commentId)
	.then((response) => response.json())
	.then((data) => {
		if (data) {
			store.dispatch(markCommentAsUnliked(commentId, numberOfLikes));
			return "COMPLETE";
		}
	})
}

export const getCommentsForMessage = (messageId) => {
	//display error if download unsuccessful
	store.dispatch(deleteAllComments());
	return httpRequestForCommentsForMessage(messageId)
	.then((response) => response.json())
	.then((comments) => {
		if (comments.length) {
			comments.forEach( c => {
				let id = c.data.id;
				let messageId = c.data.messageId;
				let body = c.data.text;
				let author = c.data.author.name;
				let authorPic = c.data.author.authorPic;
				let currentUser = true;
				let isLikedByCurrentUser = c.isLikedByCurrentUser;
				let numberOfLikes = c.data.numberOfLikes;
				store.dispatch(addComment(
					id,
					messageId,
					body,
					author,
					authorPic,
					currentUser,
					isLikedByCurrentUser,
					numberOfLikes
				));
			})
			console.log("NEW COMMENTS ADDED:", store.getState());
			return "COMPLETE";
		} else {
			console.log("NO NEW COMMENTS ADDED");
			return "COMPLETE";
		}
	})
}

export const getAllUserDataOnLogin = (id) => {
	return httpRequestForAllUserDataOnLogin(id)
	.then((response) => response.json())
	.then((data) => {
		for (var message in data.sentMessages) {
			console.log("SENT MESSAGE", data.sentMessages[message]);
			let m = data.sentMessages[message];
			let id = m.id;
			let text = m.text; 
			let author = m.author.name;
			let authorPic = m.author.authorPic;
			let latitude = parseFloat(m.latitude);
			let longitude = parseFloat(m.longitude);
			let locationName = m.locationName;
			let city = m.city;
			let currentUser = true;
			let isLiked = true;
			let timesDiscovered = m.timesDiscovered;
			store.dispatch(addSentMessage(
				id,
				text,
				author,
				authorPic,
				latitude,
				longitude,
				locationName,
				city,
				timesDiscovered
			));
		}
		for (var message in data.discoveredMessages) {
			console.log("DISCOVERED", data.discoveredMessages[message]);
			let m = data.discoveredMessages[message].message;
			let id = m.id;
			let text = m.text;
			let author = m.author.name;
			let authorPic = m.author.authorPic;
			let latitude = parseFloat(m.latitude);
			let longitude = parseFloat(m.longitude);
			let locationName = m.locationName;
			let city = m.city;
			let currentUser = true;
			let isLiked = false;
			let timesDiscovered = m.timesDiscovered;
			let unread = data.discoveredMessages[message].unread;
			store.dispatch(addDiscoveredMessage(
				id,
				text,
				author,
				authorPic,
				latitude,
				longitude,
				locationName,
				city,
				unread,
				timesDiscovered
			));
		}
		store.dispatch(addCurrentSessionOnLogin(
			data.userInfo.id,
			data.userInfo.email,
			data.userInfo.name,
			data.userInfo.authorPic,
			data.userInfo.username
		))
		console.log("STORE", store.getState());
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
