import { createStore } from 'redux';
import { App } from './reducers/index.js';

let initialDiscoveredMessages = {
	discoveredMessages: [
		{id: 1,
		body: "I am a message that was created at a specific location",
		author: "Ben Manson",
		locationName: "Ben's Apartment",
		locationCoords: [40.70790519856078, -74.01487782597542],
		reported: false},
		{id: 2,
		body: "I'm another message that was created in a place",
		author: "Bex Rosenblatt",
		locationName: "Bex's Apartment",
		locationCoords: [40.761658441958225, -73.95998910069466],
		reported: false},
		{id: 3,
		body: "What's up I'm another message! How are you?!",
		author: "Ben Manson",
		locationName: "Ben's Apartment",
		locationCoords: [40.70790519856078, -74.01487782597542],
		reported: false}
	]
}

let store = createStore(App, initialDiscoveredMessages);

export { store };