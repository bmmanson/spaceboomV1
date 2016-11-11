#Spaceboom

## App Available on the App Store

Download it here: https://itunes.apple.com/us/app/spaceboom-location-based-messaging/id1170833678?ls=1&mt=8

## Introduction
Spaceboom is a location-based messaging app for iOS. The idea for the app is similar to geo-caching: it allows you to leave messages at specific locations for others to find. If another user goes to a location where were when you posted a message, the user will receive a notification telling them they’ve discovered a new message. It will then be added to their collection of messages, and they will be able to read it. The app has been described as “Pokémon Go for people”.

The app also has a social networking aspect. You can interact with other users who have discovered a message by leaving comments on it. In addition, each user has a customizable profile, which can also be commented on, similar to a Facebook "Wall". You can see a user’s profile if you have discovered one of their messages, or if you have seen a comment they have left on another user’s message. A user’s profile also lists and links to the profiles of all users whose messages the user has discovered.

I have been building Spaceboom by myself. It's built using React Native and Redux on the front-end and Node.js, Express and Sequelize/SQL on the back-end.

## Screenshots

![Login Page](/img/screenshots/loginpage.png?raw=true “Login page”)

![Post Message](/img/screenshots/post-message.png?raw=true “Post Message”)

![Message Detail View](/img/screenshots/message-view.png?raw=true “Message Detail View”)

![Message Master View](/img/screenshots/messages.png?raw=true “Message Master View”)

![User Profile](/img/screenshots/user-view.png?raw=true “User Profile”)

## Features

Version 1.0 of the app is complete. I have submitted it to the Apple App Store and it is currently available on the App Store [(download)](https://itunes.apple.com/us/app/spaceboom-location-based-messaging/id1170833678?ls=1&mt=8). Here is a list of features included in the current rollout of the app:

- All views complete (the login view, the root view, newUsername, newMessage, messageMasterView, MessageDetailView, userProfile, settings).
- All routes and SQL models are complete.
- Users can “like” messages, comment on messages and profiles, and "like" comments on messages and profiles.
- Users can delete messages they've created so they're no longer discoverable. Users can also remove discovered messages from their collection without making them undiscoverable.
- Users can flag messages as inappropriate.
- The app uses the React Native geolocation API to retrieve the user's coordinates. It sends the coordinates as a JSON object in the body of an http post request every time the user's coordinates change significantly while the app is running. If a posted message on the server has coordinates that approximate the coordinates in the JSON object, the server creates a new instance in the discovery model, and returns the message's data to the client.
- Users can post new messages.
- Users can change the bio that appears on their profile.
- Implemented Facebook login using Passport.js and the Facebook iOS SDK.
- Users can provide user names. Each user decides whether their username or their real identity (as provided by Facebook) is displayed to all other users.
- Google Maps API integration to get names for locations of messages has been added.
- The app still sends user's coordinates to the server even when the app is only running in the background.
- Notifications work.
- The final remaining known bugs have been fixed.
- Assets (icons and launch screen) have been added to xCode.
- An instance of the server has been deployed using Heroku, and I have successfully run the app on several devices.

### Features for future versions of the app

- When a user comments on a message, the app moves to the top of the collection/message list, and it is marked as unread, for all other users who've discovered it.
- Users can submit photos with or instead of text.
- The map on the opening screen of the app is scrollable and zoomable. Pins on the map indicate where undiscovered messages are, but their content cannot be seen until the user has gone to the location of the message.
- Users can chat with each other.
- Users can select a profile picture from all of their Facebook photos.
- Be able to add discovered users to a list ("following" users).














