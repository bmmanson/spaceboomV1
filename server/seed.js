var Promise = require('bluebird');
var db = require('./models');
var Message = require('./models/message');
var User = require('./models/user');

//note -- to make this work:
//need to go into the DB with postico and change Ben's userId to 32
//use the facebookId you get from the server

var data = {
	user: 
	[
		{
			facebookName: "Joe Langer", 
			authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/11057221_10153411465937025_7220678579653297083_n.jpg?oh=7e3c4e26c604a1d09637fa4becc16c81&oe=582E91C9', 
			email: "Joe@email.com"
		},
		{
			facebookName: "Ben Manson",
			facebookId: 10207680637598145,
			authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469', 
			email: "ben@email.com",
			username: "Benny"
		},
		{
			facebookName: "Bex Rosenblatt",
			authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13700056_10207110079535082_4219144356567438027_n.jpg?oh=4861020e8cc6411904e4c478222f200d&oe=5811CD1A',
			email: "Bex@email.com"
		},
		{
			facebookName: "Gus Johnson",
			authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/12313953_2624518816159_9033810844249390225_n.jpg?oh=8e5e827092ee00d262dfaf25478ea1c8&oe=5831D470',
			email: "Gus@email.com"
		},
		{
			facebookName: "Hillary Clinton",
			authorPic: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13619932_1181179818605212_8343925786278448182_n.jpg?oh=39d9a4098413961d80c42dfa1621f35f&oe=587E8FB5",
			email: "hrc@privateserver.com"
		},
		{
			facebookName: "Adam Casey",
			authorPic: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/1907977_10100354101824849_1005827950_n.jpg?oh=eff7927f629bfc5538f6b3656c356538&oe=586A83E4",
			email: "adam@email.com"
		},
		{
			facebookName: "Alex Atkins",
			authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/14390822_803369240264_7365045778749445001_n.jpg?oh=31c8c68b33ca12a95cf64550b4dbd2ff&oe=5875BC6B',
			email: "alex@email.com"
		}
	],
	userprofile: [
		{
			userId: 1,
			aboutMe: "I know this sounds insane, but this is an insane world. We have to come for them, or they will come for us. It's that simple.",
			profilePic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/11057221_10153411465937025_7220678579653297083_n.jpg?oh=3060bf764613f89d66ebfb27beed8ce9&oe=58729891',
			timesViewed: 32
		},
		{
			userId: 2,
			aboutMe: "He who has the power to destroy a thing, controls it.",
			profilePic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/13620351_10207342419702909_3505351797653340889_n.jpg?oh=4c5f48fff81e1ab0a46395aa27819440&oe=5873ED31',
			timesViewed: 44
		},
		{
			userId: 3,
			aboutMe: "People may say I couldn't sing, but no one can ever say I didn't sing.",
			profilePic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/13700056_10207110079535082_4219144356567438027_n.jpg?oh=41b308c3853f42a9764d3ab6fa3988e6&oe=586AB142',
			timesViewed: 12,

		},
		{
			userId: 4,
			aboutMe: "Im too tiredddd",
			profilePic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/12313953_2624518816159_9033810844249390225_n.jpg?oh=5d871d9a0fa48e4a445396825b970eb5&oe=58814BD2',
			timesViewed: 9
		},
		{
			userId: 5,
			aboutMe: "I'm running for president.",
			profilePic: "https://scontent-lga3-1.xx.fbcdn.net/t31.0-8/13584898_1181179818605212_8343925786278448182_o.jpg",
			timesViewed: 0
		},
		{
			userId: 6,
			aboutMe: "Canadian.",
			profilePic: "https://scontent-lga3-1.xx.fbcdn.net/t31.0-8/10003821_10100354101824849_1005827950_o.jpg"
		},
		{
			userId: 7,
			aboutMe: "a future lawyer",
			profilePic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c1.0.958.958/14390822_803369240264_7365045778749445001_n.jpg?oh=6ed3e8c45ba6f5fa4d9baef382d161b0&oe=587E9AAE'
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
			authorId: 6,
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
			authorId: 7,
			locationName: "Hell's Kitchen",
			latitude: 40.767281648876688, 
			longitude: -73.98880004882812,
			city: "New York, NY"
		},

		{
			text: "Yes!",
			authorId: 5,
			locationName: "Hell's Kitchen",
			latitude: 40.767281648876688, 
			longitude: -73.98880004882812,
			city: "New York, NY"
		},

		{
			text: "I'm getting so tired of coming up with these new messages, but here we go. I'm writing another message. Woo. Message.",
			authorId: 6,
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
		},

		{
			text: '"Do you even know what farm to table means?!" Here at Whole Foods!',
			authorId: 2,
			locationName: "Upper East Side",
			latitude: 40.759318,
			longitude: -73.966216,
			city: "New York, NY"
		},


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
		messageId: 1,
		discovererId: 5
		},
		{
		messageId: 7,
		discovererId: 5
		},
		{
		messageId: 2,
		discovererId: 5
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
		},
		{
		messageId: 11,
		discovererId: 3
		},
		{
		messageId: 11,
		discovererId: 5
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
		},
		{
		text: "I'm Joe and I'm commenting on this.",
		authorId: 1,
		messageId: 13
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
	],
	messagelike: 
	[
		{
			userId: 1,
			messageId: 15
		},
		{
			userId: 3,
			messageId: 15
		},
		{
			userId: 4,
			messageId: 15
		},
		{
			userId: 1,
			messageId: 14
		},
		{
			userId: 1,
			messageId: 13
		},
		{
			userId: 3,
			messageId: 13
		},
		{
			userId: 4,
			messageId: 13
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