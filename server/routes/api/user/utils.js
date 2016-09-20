function removeDuplicateUsers (arrayOfMessages) {
	var collection = {};
	arrayOfMessages.forEach(function (message) {
		if (!collection[message.authorId]) {
			collection[message.authorId] = true;
		}
	});
	return Object.keys(collection);
}

module.exports = {
	removeDuplicateUsers: removeDuplicateUsers 
}