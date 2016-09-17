var Promise = require('bluebird');
var db = require('./models');
var Message = require('./models/message');
var User = require('./models/user');

//note -- to make this work:
//need to go into the DB with postico and change Ben's userId to 32

var data = {
	user: 
	[
		{
		name: "Joe Langer", 
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/11057221_10153411465937025_7220678579653297083_n.jpg?oh=7e3c4e26c604a1d09637fa4becc16c81&oe=582E91C9', 
		email: "Joe@email.com"
		},
		{
		name: "Ben Manson",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469', 
		email: "ben@email.com",
		facebookId: 10207680637598145,
		username: "Benny"
		},
		{
		name: "Bex Rosenblatt",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13700056_10207110079535082_4219144356567438027_n.jpg?oh=4861020e8cc6411904e4c478222f200d&oe=5811CD1A',
		email: "Bex@email.com"
		},
		{
		name: "Gus Johnson",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/12313953_2624518816159_9033810844249390225_n.jpg?oh=8e5e827092ee00d262dfaf25478ea1c8&oe=5831D470',
		email: "Gus@email.com"
		}
	],
	message: 
	[
		{
		text: "I am a message that was created at a specific location. I am written in English, I'm legible, I convey meaning, and I'm composed of letters and words.",
		authorId: 1,
		locationName: "Financial District",
		latitude: 40.70790519856078, 
		longitude: -74.01487782597542,
		city: "New York, NY"
		},

		{
		text: "I'm another message that was created in a particular place. To expand on what I  mean by that, I was written, and when I was written, the person who wrote me was in a place... and a particular place at that! Look at me! I'm a message! I was written in a place!",
		authorId: 3,
		locationName: "Upper East Side",
		latitude: 40.761658441958225, 
		longitude: -73.95998910069466,
		city: "New York, NY"
		},

		{
		text: "What's up?! I'm another message! How are you?! I don't have feelings (because I am a message, and messages don't have feelings). But I *can* be understood. If only I too could understand myself!! (OR DO I? Ominous!)",
		authorId: 1,
		locationName: "Hell's Kitchen",
		latitude: 40.767281648876688, 
		longitude: -73.98880004882812,
		city: "New York, NY"
		},

		{
		text: "I don't live here anymore but I used to live here and it was a nice place to live but I'm glad I don't live here anymore because I live somewhere else now and I'm glad that I live there.",
		authorId: 4,
		locationName: "Kips Bay",
		latitude: 40.73766508272807, 
		longitude: -73.98176193237305,
		city: "New York, NY"
		},

		{
		text: "I know that I *just* posted a message, but I've got to know. What does it look like if there are five messages? Let me tell you: I don't know.",
		authorId: 4,
		locationName: "Kips Bay",
		latitude: 40.73766508272807, 
		longitude: -73.98176193237305,
		city: "New York, NY"
		},

		{
		text: "This is another message because I want to see what it looks like if there are six messages. It'd be great if I could see too how the app would look if there were seven messages. But a seventh message? I didn't know there could be so many messages!",
		authorId: 3,
		locationName: "Upper East Side",
		latitude: 40.761658441958225, 
		longitude: -73.95998910069466,
		city: "New York, NY"
		},

		{
		text: "I did it! Seven messages. But this one's short.",
		authorId: 3,
		locationName: "Upper East Side",
		latitude: 40.761658441958225, 
		longitude: -73.95998910069466,
		city: "New York, NY"
		},

		{
		text: "Ok, only one more. Now I can see what it looks like when you scroll. Now we can ALL see what it looks like!",
		authorId: 1,
		locationName: "Hell's Kitchen",
		latitude: 40.767281648876688, 
		longitude: -73.98880004882812,
		city: "New York, NY"
		},

		{
		text: "Yes!",
		authorId: 1,
		locationName: "Hell's Kitchen",
		latitude: 40.767281648876688, 
		longitude: -73.98880004882812,
		city: "New York, NY"
		},

		{
		text: "I'm getting so tired of coming up with these new messages, but here we go. I'm writing another message. Woo. Message.",
		authorId: 2,
		locationName: "East Village",
		latitude: 40.73126701752318, 
		longitude: -73.98654699325562,
		city: "New York, NY"
		},

		{
		text: "I'm listening to MSNBC's coverage of the 2016 DNC right now and I'll tell you what. It's annoying! It's very annoying! The speeches, those were good! But these pundits, I tell ya... I might have to turn off the tube!",
		authorId: 2,
		locationName: "East Village",
		latitude: 40.73126701752318,
		longitude: -73.98654699325562,
		city: "New York, NY"
		},

		{
		text: "Okay, actually, I like Chris Hayes. But no one else is bringing their A-game right now.",
		authorId: 2,
		locationName: "East Village",
		latitude: 40.73126701752318, 
		longitude: -73.98654699325562,
		city: "New York, NY"
		},

		{
		text: "I still like Chris Hayes, because still no one else is bringing their A-game.",
		authorId: 2,
		locationName: "East Village",
		latitude: 40.73126701752318, 
		longitude: -73.98654699325562,
		city: "New York, NY"
		},

		{
		text: "Greetings from California! I'm the first message that's been sent using Postman! Ooo, so exciting!",
		authorId: 1,
		locationName: "Apple",
		latitude: 37.33760111,
		longitude: -122.02320004,
		city: "Cupertino, CA"
		},

		{
		text: "Is this some stupid busy highway? It seems the simulator always stops at this intersection and waits there for forever!! Did the simulated human being bump into someone they know? Or are they being arrested?! Being questioned for a bit on a late night talk show?!",
		authorId: 1,
		locationName: "Apple",
		latitude: 37.33759308,
		longitude: -122.0404889,
		city: "Cupertino, CA"
		}

	],
	discovery: 
	[
		{
		messageId: 1,
		discovererId: 2
		},
		{
		messageId: 1,
		discovererId: 4
		},
		{
		messageId: 2,
		discovererId: 2
		},
		{
		messageId: 3,
		discovererId: 2
		},
		{
		messageId: 4,
		discovererId: 2
		},
		{
		messageId: 5,
		discovererId: 2
		},
		{
		messageId: 6,
		discovererId: 2
		},
		{
		messageId: 7,
		discovererId: 2
		},
		{
		messageId: 8,
		discovererId: 2
		},
		{
		messageId: 8,
		discovererId: 3
		},
		{
		messageId: 9,
		discovererId: 2
		},
		{
		messageId: 9,
		discovererId: 3
		},
		{
		messageId: 15,
		discovererId: 2
		}
		,
		{
		messageId: 15,
		discovererId: 3
		},
		{
		messageId: 15,
		discovererId: 4
		}
	],
	comment: 
	[
		{
		text: "I completely agree.",
		authorId: 3,
		messageId: 15,
		numberOfLikes: 3
		},
		{
		text: "I completely disagree, but I could be persuaded.",
		authorId: 2,
		messageId: 15
		},
		{
		text: "Ok, since this is the internet, let's have a civil discussion about it.",
		authorId: 3,
		messageId: 15
		},
		{
		text: "Ok.",
		authorId: 2,
		messageId: 15
		},
		{
		text: "You both are right.",
		authorId: 4,
		messageId: 15
		},
		{
		text: "I was written in Postico originally, but now I am reborn again and again thanks to a seed file.",
		authorId: 1,
		messageId: 14
		},
		{
		text: "I'm commenting on my own post because I can. Also I can be a long comment, because I've never seen a long comment before. Aren't you curious how long I can be?",
		authorId: 1,
		messageId: 14
		}
	],
	commentlike:
	[
		{
			userId: 1,
			commentId: 1
		},
		{
			userId: 3,
			commentId: 1
		},
		{
			userId: 4,
			commentId: 1
		},
	]
}

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
.then(function () {
  console.log("Finished inserting data (press ctrl-c to exit)");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
});