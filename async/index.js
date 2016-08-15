import { store } from './../store';

const httpRequestForNewMessage = (latitude, longitude) => {
	let url = `http://localhost:1337/api/discovery/new?latitude=${latitude}&longitude=${longitude}&userId=2`
	return fetch(url, {method: "POST"});
}

const checkForAndAddNewMessage = (latitude, longitude) => {
	httpRequestForNewMessage(latitude, longitude)
	.then(function (response) {
		//console.log("THE BODY (NOT _)",response.body);
		//console.log("THE BODY (NOT _) PARSED", JSON.parse(response.body));
		console.log("THE BODY (_) PARSED", JSON.parse(response._bodyText));
		console.log("THE BODY(_)", response._bodyText);
	})
}

export { checkForAndAddNewMessage };