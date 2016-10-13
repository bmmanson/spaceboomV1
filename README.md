#Spaceboom

## Introduction
Spaceboom is a location-based messaging app for iOS. The idea is similar to geo-caching: it allows you to leave a messages at a specific location. If another user goes to a location where you posted a message, the user will receive a notification telling them they’ve discovered a new message. It will then be added to their collection of messages, and they will be able to read it. Friends have described the app as “Pokemon Go for people”.

The app also has a social networking aspect. You can interact with other users who have discovered a message by leaving comments on it. In addition, each user has a customizable profile, which can also be commented on. You can see a user’s profile if you have discovered one of their messages, or if you have seen a comment they have left on another user’s message. A user’s profile also lists and links to the profiles of all users whose messages the user has discovered.

I have been building Spaceboom by myself. It's built using React Native and Redux on the front-end and Node.js, Express and Sequelize/SQL on the back-end.

## Screenshots

![Login Page](/img/screenshots/loginpage.png?raw=true “Login page”)

![Message Master View](/img/screenshots/messages.png?raw=true “Message Master View”)

![Message Detail View](/img/screenshots/message-view.png?raw=true “Message Detail View”)

![User Profile](/img/screenshots/user-view.png?raw=true “User Profile”)

## Progress

Spaceboom is nearly complete. Here is a list of features that I’ve finished (leaving aside minor refactoring and cosmetic changes, in some cases):

- All views (the login view, the root view, newUsername, newMessage, messageMasterView, MessageDetailView, userProfile) except for the settings view
- All corresponding routes and SQL models
- Users can “like” messages, comment on messages and profiles, and like comments
- The app uses the React Native geolocation API to retrieve the user's coordinates. It sends the coordinates as a JSON object in the body of an http post request every time the user's coordinates change significantly while the app is running. If a posted message has coordinates that approximate those of the message, the server creates a new instance in the discovery model, and returns the data to the client
- Users can post new messages
- Users can change their bio on their profile
- Implemented Facebook login using Passport.js and the Facebook iOS SDK. Users can provide user names, and decide whether their username is displayed to other users, or their real identity (as provided by Facebook)

### Features to be implemented

- App sends user's coordinates to the server even when the app is only running in the background
- notifications
- deploy an instance of the server using Heroku
- Submit to the App Store for review











