import { store } from './../store';
import { 
	addDiscoveredMessage,
	addSentMessage,
	addCurrentSessionOnLogin,
	addComment,
	deleteAllComments,
	markCommentAsLiked,
	markCommentAsUnliked,
	deleteComment,
	addUsername,
	changeAuthorNameOfSentMessages,
	markAsUnread,
	updateLocationName
} from './../actions';

export let currentUserId;

//TWO THINGS about rootUrl:
//1 - see below one route which does not use rootUrl const (around line 60/70)
//2 - component in launch-page.js uses rootUrl const

export const rootUrl = 'https://dry-savannah-68177.herokuapp.com/'; //"http://localhost:1337/";

const httpRequestToPostNewMessage = (text, latitude, longitude) => {
	let message = {
		text,
		latitude,
		longitude
	};

	message = JSON.stringify(message);

	let request = {
		headers: {
			'Content-Type': 'application/json'
  		},
  		method: "POST",
  		body: message
    };

	let url = rootUrl + "api/message/";
	return fetch(url, request);
}

const httpRequestForAllUserDataOnLogin = (id) => {
	let url = rootUrl + "api/user/login/" + id;
	return fetch(url, {method: "GET"});
}

const httpRequestToUpdateMessageAsUnread = (id) => {
	let url = rootUrl + "api/discovery/unread/" + id;
	return fetch(url, {method: "PUT"});
}

const httpRequestToDeleteSentMessage = (id) => {
	let url = rootUrl + "api/message/hide/" + id;
	return fetch(url, {method: "PUT"});
}

const httpRequestToDeleteDiscoveredMessage = (id) => {
	let url = rootUrl + "api/discovery/hide/" + id;
	return fetch(url, {method: "PUT"});
}

const httpRequestToSendAccessTokenToServer = (token) => {
	//note that this route is an exception
	let url = rootUrl + "auth/facebook/token?access_token=" + token; 
	return fetch(url, {method: "POST"});
}

const httpRequestToLikeComment = (commentId) => {
	let url = rootUrl + "api/comment/like/" + commentId;
	return fetch(url, {method: "POST"});
}

const httpRequestToUnlikeComment = (commentId) => {
	let url = rootUrl + "api/comment/like/" + commentId;
	return fetch(url, {method: "DELETE"});
}

const httpRequestForCommentsForMessage = (messageId) => {
	let url = rootUrl + "api/comment/message/" + messageId;
	return fetch(url, {method: "GET"});
}

const httpRequestForDeleteMessageComment = (commentId) => {
	let url = rootUrl + "api/comment/deletedByUser/" + commentId;
	return fetch(url, {method: "PUT"});
}

const httpRequestToDeleteWallComment = (commentId) => {
	let url = rootUrl + "api/user/wallpost/deletedByUser/" + commentId;
	return fetch(url, {method: "PUT"});
}

const httpRequestToAddComment = (messageId, text) => {
	let url = rootUrl + "api/comment/message/" + messageId;
	let message = {
		text, 
		messageId
	};

	message = JSON.stringify(message);

	let request = {
		headers: {
			'Content-Type': 'application/json'
  		},
  		method: "POST",
  		body: message
    }
    return fetch(url, request);
}


const httpRequestToSubmitUsername = (username) => {
	let usernameJSON = {
		username
	};

	usernameJSON = JSON.stringify(usernameJSON);

	let request = {
		headers: {
			'Content-Type': 'application/json'
  		},
  		method: "PUT",
  		body: usernameJSON
    };

	let url = rootUrl + "api/user/settings/username/";
	return fetch(url, request);
}

const httpRequestToToggleNameDisplay = (displayRealIdentity) => {
	let url = rootUrl + "api/user/settings/toggleNameDisplayed/";
	let body = {
		displayRealIdentity
	};

	body = JSON.stringify(body);

	let request = {
		headers: {
			'Content-Type': 'application/json'
  		},
  		method: "PUT",
  		body
    }

    return fetch(url, request);
}

const httpRequestSendAboutMe = (aboutMe) => {
	let url = rootUrl + "api/user/settings/aboutMe/";
	let body = {
		aboutMe
	};

	body = JSON.stringify(body);

	let request = {
		headers: {
			'Content-Type': 'application/json'
  		},
  		method: "PUT",
  		body
    }

    return fetch(url, request);
}

const httpRequestForUserProfile = (userId) => {
	let url = rootUrl + "api/user/profile/" + userId;
	return fetch(url, {method:"GET"});
}

const httpRequestForSettingsData = () => {
	let url = rootUrl + "api/user/settings/view/";
	return fetch(url, {method: "GET"});
}

const httpRequestForDiscoveredUsers = (userId) => {
	let url = rootUrl + "api/user/discoveredUsers/" + userId;
	return fetch(url, {method: "GET"});
}

const httpRequestForWallPosts = (userId) => {
	let url = rootUrl + "api/user/wallpost/" + userId;
	return fetch(url, {method: "GET"});
}

const httpRequestToReportMessage = (messageId) => {
	let url = rootUrl + "api/message/report/add/" + messageId;
	return fetch(url, {method: "POST"});
}

//likes for messages

const httpRequestLikeMessage = (messageId) => {
	let url = rootUrl + "api/message/like/" + messageId;
	return fetch(url, {method: "POST"});
}

const httpRequestDislikeMessage = (messageId) => {
	let url = rootUrl + "api/message/like/" + messageId;
	return fetch(url, {method: "DELETE"});
}

const httpRequestGetLikeDataForMessage = (messageId) => {
	let url = rootUrl + "api/message/like/" + messageId;
	return fetch(url, {method: "GET"});
}

const httpRequestTimesDiscoveredForMessage = (messageId) => {
	let url = rootUrl + "api/message/timesDiscovered/" + messageId;
	return fetch(url, {method: "GET"});
}

const httpRequestToGetUserLocationName = (latitude, longitude) => {
	let url = `${rootUrl}api/message/locationName?latitude=${latitude}&longitude=${longitude}`;
    return fetch(url, {method: "GET"});
}

//likes for wall posts
const httpRequestLikeWallPost = (wallpostId) => {
	let url = rootUrl + "api/user/wallpost/like/" + wallpostId;
	return fetch(url, {method: "POST"});
}

const httpRequestDislikeWallPost = (wallpostId) => {
	let url = rootUrl + "api/user/wallpost/like/" + wallpostId;
	return fetch(url, {method: "DELETE"});
}

//send wall post
const httpRequestToPostWallPost = (userId, text) => {
	let url = rootUrl + "api/user/wallpost/" + userId;
	let message = {
		text, 
		userId
	};

	message = JSON.stringify(message);

	let request = {
		headers: {
			'Content-Type': 'application/json'
  		},
  		method: "POST",
  		body: message
    }
    return fetch(url, request);
}

export const getUserLocationName = (latitude, longitude) => {
	return httpRequestToGetUserLocationName(latitude, longitude)
	.then((response) => response.json())
	.then((data) => {
		store.dispatch(updateLocationName(data.locationName));
		return data;
	});
}

export const sendAboutMe = (aboutMe) => {
	return httpRequestSendAboutMe(aboutMe)
	.then((response) => response.json())
	.then((data) => data);
}

export const getDataForSettings = () => {
	return httpRequestForSettingsData()
	.then((response) => response.json())
	.then((data) => data);
}

export const submitNewUsername = (username) => {
	return httpRequestToSubmitUsername(username)
	.then( (response) => response.json())
	.then( (data) => {
		if (data.valid) {
			store.dispatch(addUsername(data.username));
			return data;
		} else {
			return data;
		}
	});
}

export const toggleNameDisplayedOnServer = (displayRealIdentity) => {
	return httpRequestToToggleNameDisplay(displayRealIdentity)
	.then( (response) => response.json())
	.then( (data) => {
		//console.log("DATA FROM TOGGLENAME", data);
		store.dispatch(changeAuthorNameOfSentMessages(data.name));
		return data;
	});
}

export const getTimesDiscoveredForMessage = (messageId) => {
	return httpRequestTimesDiscoveredForMessage(messageId)
	.then( (response) => response.json())
	.then( (data) => data);
}

export const getLikeDataForMessage = (messageId) => {
	return httpRequestGetLikeDataForMessage(messageId)
	.then( (response) => response.json())
	.then( (data) => data);
}

export const likeMessageOnServer = (messageId) => {
	return httpRequestLikeMessage(messageId)
	.then((response) => response.json())
	.then((data) => {
		return data;
	});
}

export const dislikeMessageOnServer = (messageId) => {
	return httpRequestDislikeMessage(messageId)
	.then((response) => response.json())
	.then((data) => {
		return data;
	});
}

export const reportMessageToServer = (messageId) => {
	return httpRequestToReportMessage(messageId)
	.then((response) => response.json())
	.then((data) => data);
}

export const getDiscoveredUsersFromServer = (userId) => {
	return httpRequestForDiscoveredUsers(userId)
	.then((response) => response.json())
	.then((data) => {
		//console.log("DISCOVERED USERS, ASYNC FILE", data);
		return data;
	});
}

export const getUserInfoForProfileFromServer = (userId) => {
	store.dispatch(deleteAllComments());
	return httpRequestForUserProfile(userId)
	.then((response) => response.json())
	.then((data) => {
		//console.log("THE DATA FROM ASYNC FILE", data);
		return data;
	});
}

export const sendWallPostToServer = (userId, text) => {
	return httpRequestToPostWallPost(userId, text)
	.then((response) => response.json())
	.then((data) => {
		store.dispatch(addComment(
				data.id,
				data.userId,
				data.text,
				data.author.name,
				data.author.authorPic,
				data.author.id,
				true,
				false,
				data.numberOfLikes,
				data.createdAt
		));
		return "COMPLETE";
	});
}

export const getWallPostsFromServer = (userId) => {
	return httpRequestForWallPosts(userId)
	.then((response) => response.json())
	.then((comments) => {
		if (comments.length) {
			comments.forEach( c => {
				let currentUser;
				let id = c.data.id;
				let messageId = c.data.messageId;
				let body = c.data.text;
				let author = c.data.author.name;
				let authorPic = c.data.author.authorPic;
				let authorId = c.data.authorId;
				let createdAt = c.data.createdAt;
				if (authorId === currentUserId) {
					currentUser = true;
				} else {
					currentUser = false;
				}
				let isLikedByCurrentUser = c.isLikedByCurrentUser;
				let numberOfLikes = c.data.numberOfLikes;
				store.dispatch(addComment(
					id,
					messageId,
					body,
					author,
					authorPic,
					authorId,
					currentUser,
					isLikedByCurrentUser,
					numberOfLikes,
					createdAt
				));
			})
			//console.log("NEW COMMENTS ADDED:", store.getState());
			return "COMPLETE";
		} else {
			//console.log("NO NEW COMMENTS ADDED");
			return "COMPLETE";
		}
	})
}

export const postNewMessageToServer = (text, latitude, longitude) => {
	return httpRequestToPostNewMessage(text, latitude, longitude)
	.then((response) => response.json())
}

export const deleteCommentOnServer = (commentId, type) => {
	if (type === "MESSAGE") {
		return httpRequestForDeleteMessageComment(commentId)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				store.dispatch(deleteComment(commentId));
				return "COMPLETE";
			}
		})
	} else if (type === "USER") {
		return httpRequestToDeleteWallComment(commentId)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				store.dispatch(deleteComment(commentId));
				return "COMPLETE";
			}
		})
	}
}

export const postCommentAsLikedOnServer = (commentId, numberOfLikes, type) => {
	if (type === "MESSAGE") {
		return httpRequestToLikeComment(commentId)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				store.dispatch(markCommentAsLiked(commentId, numberOfLikes));
				return "COMPLETE";
			}
		})
	} else if (type === "USER") {
		return httpRequestLikeWallPost(commentId)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				store.dispatch(markCommentAsLiked(commentId, numberOfLikes));
				return "COMPLETE";
			}
		})
	}
}

export const postCommentAsUnlikedOnServer = (commentId, numberOfLikes, type) => {
	if (type === "MESSAGE") {
		return httpRequestToUnlikeComment(commentId)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				store.dispatch(markCommentAsUnliked(commentId, numberOfLikes));
				return "COMPLETE";
			}
		})
	} else if (type === "USER") {
		return httpRequestDislikeWallPost(commentId)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				store.dispatch(markCommentAsUnliked(commentId, numberOfLikes));
				return "COMPLETE";
			}
		})
	}
}

export const addCommentOnServer = (messageId, text) => {
	return httpRequestToAddComment(messageId, text)
	.then((response) => response.json())
	.then((comment) => {
		if (comment) {
			//console.log("ADDING COMMENT TO MESSAGE. THE COMMENT:", comment);
			store.dispatch(addComment(
				comment.id,
				comment.messageId,
				comment.text,
				comment.author.name,
				comment.author.authorPic,
				comment.author.id,
				true,
				false,
				comment.numberOfLikes,
				comment.createdAt
			));
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
				let currentUser;
				let id = c.data.id;
				let messageId = c.data.messageId;
				let body = c.data.text;
				let author = c.data.author.name;
				let authorPic = c.data.author.authorPic;
				let authorId = c.data.authorId;
				let createdAt = c.data.createdAt;
				if (authorId === currentUserId) {
					currentUser = true;
				} else {
					currentUser = false;
				}
				let isLikedByCurrentUser = c.isLikedByCurrentUser;
				let numberOfLikes = c.data.numberOfLikes;
				store.dispatch(addComment(
					id,
					messageId,
					body,
					author,
					authorPic,
					authorId,
					currentUser,
					isLikedByCurrentUser,
					numberOfLikes,
					createdAt
				));
			})
			//console.log("NEW COMMENTS ADDED:", store.getState());
			return "COMPLETE";
		} else {
			//console.log("NO NEW COMMENTS ADDED");
			return "COMPLETE";
		}
	})
}

export const getAllUserDataOnLogin = (id) => {
	return httpRequestForAllUserDataOnLogin(id)
	.then((response) => response.json())
	.then((data) => {
		for (var message in data.sentMessages) {
			//console.log("SENT MESSAGE", data.sentMessages[message]);
			let m = data.sentMessages[message];
			let id = m.id;
			let text = m.text; 
			let author = m.author.name;
			let authorPic = m.author.authorPic;
			let authorId = m.author.id;
			let latitude = parseFloat(m.latitude);
			let longitude = parseFloat(m.longitude);
			let locationName = m.locationName;
			let city = m.city;
			let currentUser = true;
			let isLikedByCurrentUser = false;
			let timesDiscovered = m.timesDiscovered;
			let numberOfLikes = m.numberOfLikes;
			let createdAt = m.createdAt;
			store.dispatch(addSentMessage(
				id,
				text,
				author,
				authorPic,
				authorId,
				latitude,
				longitude,
				locationName,
				city,
				timesDiscovered,
				numberOfLikes,
				isLikedByCurrentUser,
				createdAt
			));
		}
		for (var message in data.discoveredMessages) {
			//console.log("DISCOVERED", data.discoveredMessages[message]);
			let m = data.discoveredMessages[message].message;
			let id = m.id;
			let text = m.text;
			let author = m.author.name;
			let authorPic = m.author.authorPic;
			let authorId = m.author.id;
			let latitude = parseFloat(m.latitude);
			let longitude = parseFloat(m.longitude);
			let locationName = m.locationName;
			let city = m.city;
			let currentUser = true;
			let isLikedByCurrentUser = true;
			let timesDiscovered = m.timesDiscovered;
			let numberOfLikes = m.numberOfLikes;
			let unread = data.discoveredMessages[message].unread;
			let createdAt = m.createdAt;
			store.dispatch(addDiscoveredMessage(
				id,
				text,
				author,
				authorPic,
				authorId,
				latitude,
				longitude,
				locationName,
				city,
				unread,
				timesDiscovered,
				numberOfLikes,
				isLikedByCurrentUser,
				createdAt
			));
		}
		currentUserId = data.userInfo.id;
		store.dispatch(addCurrentSessionOnLogin(
			data.userInfo.id,
			data.userInfo.email,
			data.userInfo.name,
			data.userInfo.facebookName,
			data.userInfo.authorPic,
			data.userInfo.username
		))
		return store.getState();
	})
}

export const sendAccessTokenToServer = (token) => {
	return httpRequestToSendAccessTokenToServer(token)
	.then(function (response) {
		//console.log("RESPONSE RECEIVED BY sendAccessTokenToServer:", response)
		return response.json();
	})
	.catch(function (error) {
		//console.log("ERROR FROM ACCESS TOKEN:", error);
	})
}

export const deleteSentMessageOnServer = (id) => {
	return httpRequestToDeleteSentMessage(id)
	.then( (response) => response.json() )
	.then( (response) => {} ); //console.log("DELETED SENT MESSAGE. RESPONSE FROM SERVER:", response) )
}

export const deleteDiscoveredMessageOnServer = (id) => {
	return httpRequestToDeleteDiscoveredMessage(id)
	.then(function (response) {
		return response.json();
	})
}

export const addDiscoveredMessageToCollection = (res) => {
	if (res.id !== null) {
		//console.log("NEW MESSAGE, DISCOVERED");
		let m = {
			id: res.message.id,
			body: res.message.text, 
			author: res.message.author.name,
			locationName: res.message.locationName,
			latitude: parseFloat(res.message.latitude),
			longitude: parseFloat(res.message.longitude),
			city: res.message.city,
			authorPic: res.message.author.authorPic,
			authorId: res.message.author.id,
			createdAt: res.message.createdAt,
			timesDiscovered: res.message.timesDiscovered,
			isLikedMyCurrentUser: false,
			numberOfLikes: res.message.numberOfLikes
		}
		//console.log("NEW MESSAGE:", m);
		store.dispatch(addDiscoveredMessage(
			m.id,
			m.body,
			m.author,
			m.authorPic,
			m.authorId,
			m.latitude,
			m.longitude,
			m.locationName,
			m.city,
			true, 
			m.timesDiscovered,
			m.numberOfLikes,
			m.isLikedByCurrentUser,
			m.createdAt
		))
	} else {
		//console.log("Response from server received. No new message");
	}
}

export const updateMessageAsUnreadOnServer = (id) => {
	store.dispatch(markAsUnread(id));
	httpRequestToUpdateMessageAsUnread(id)
	.then( (response) => response.json() )
	.then(function (response) {
		if (response === null) {
			//console.log("Note: server has already marked this message as unread. Something wrong on front end? See async/index.js");
		} else { 
			//console.log("RESPONSE RECEIVED. SERVER UPDATED");
			//console.log("Message marked as read:", response);
		}
	})
}
