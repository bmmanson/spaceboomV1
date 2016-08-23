var _ = require('lodash');

function findLocationName (body) {
	
	if (body.results[0] === undefined || body.results[0].formatted_address === undefined) {
		return "Unknown Location";
	}

	var neighborhoodObject = _.find(
		body.results[0].address_components, 
		{types: ["neighborhood"]}
	)
	if (neighborhoodObject !== undefined) {
		console.log("NEIGHBORHOOD", neighborhoodObject);
		return neighborhoodObject.long_name || neighborhoodObject.short_name;
	} else {
		var localityObject = _.find(
			body.results[0].address_components, 
			{types: ["locality"]}
		)
		if (localityObject !== undefined) {
			console.log("LOCALITY", localityObject);
			return localityObject.long_name || localityObject.short_name;
		} else {
			console.log("NO NEIGHBORHOOD OR LOCALITY:", body.results[1].formatted_address);
			return body.results[1].formatted_address.split(',')[0];
		}
	}
}

function findCity (body) {

	if (body.results[0] === undefined || body.results[0].formatted_address === undefined) {
		return "Somewhere on Planet Earth";
	}

	if (body.results[3].formatted_address === undefined) {
		return "Somewhere on Planet Earth";
	} else {
		return body.results[3].formatted_address;
	}
	
}

module.exports = {
	findLocationName: findLocationName,
	findCity: findCity
}