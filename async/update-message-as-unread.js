const httpRequestToUpdateMessageAsUnread = (id) => {
	let url = "http://localhost:1337/api/discovery/unread/" + id;
	return fetch(url, {method: "PUT"});
}

export const updateMessageAsUnreadOnServer = (id) => {
	httpRequestToUpdateMessageAsUnread(id)
	.then( (response) => response.json() )
	.then(function (response) {
		if (response === null) {
			console.log("Note: server has already marked this message as unread. Something wrong on front end? See async/index.js");
		} else { 
			console.log("RESPONSE RECEIVED. SERVER UPDATED");
			console.log("Message marked as read:", response);
		}
		store.dispatch(markAsUnread(id));
	})
}