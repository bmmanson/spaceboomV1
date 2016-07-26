import { createStore } from 'redux';
import { App } from './reducers/index.js';

let initialDiscoveredMessages = {
	discoveredMessages: [
		{id: 1,
		body: "I am a message that was created at a specific location. I am written in English, and I'm legible.",
		author: "Ben Manson",
		locationName: "Financial District",
		locationCoords: [40.70790519856078, -74.01487782597542],
		city: "New York, NY",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469',
		reported: false,
		unread: false},
		{id: 2,
		body: "I'm another message that was created in a place. I need to be longer, or else the GUI won't look very good!",
		author: "Bex Rosenblatt",
		locationName: "Upper East Side",
		locationCoords: [40.761658441958225, -73.95998910069466],
		city: "New York, NY",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13700056_10207110079535082_4219144356567438027_n.jpg?oh=4861020e8cc6411904e4c478222f200d&oe=5811CD1A',
		reported: false,
		unread: true},
		{id: 3,
		body: "What's up I'm another message! How are you?! I don't have feelings, but I can be understood. If only I too could understand!!",
		author: "Ben Manson",
		locationName: "Financial District",
		locationCoords: [40.70790519856078, -74.01487782597542],
		city: "New York, NY",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469',
		reported: false,
		unread: false}
	]
}

let store = createStore(App, initialDiscoveredMessages);

export { store };