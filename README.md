#Spaceboom

## Introduction
Spaceboom is a location-based messaging app for iOS. The idea for Spaceboom is similar to geo-caching: it allows you to leave a messages at a specific location. If another user goes to a location where you posted a message, the user will receive a notification telling them they’ve discovered a new message. They will then be able to read it on their phone, and it will be added to their collection of messages. Some have described the app as “Pokemon Go for people”.

The app also has a social networking component. You can interact with other users who have discovered a message by leaving comments on it. In addition, each user has a customizable profile, which can also be commented on. You can see a user’s profile if you have discovered one of their messages, or if you have seen a comment they have left on another user’s message. A user’s profile also lists and links to the profiles of all users whose messages the user has discovered.

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
- The app uses the React Native geolocation API to retrieve the users coordinates, and sends them in the JSON of an http post request every time the users coordinates change significantly while the app is running. If a posted message has coordinates that approximate the message, the server creates a new instance in the discovery model, and returns the data to the client
- Users can post new messages
- Users can change their bio on their profile
- Implemented Facebook login using Passport.js and the Facebook iOS SDK. Users can provide user names, and decide whether their username is displayed to other users, or their real identity (as provided by Facebook)

### Features to be implemented

- App sends users coordinates to the server even when the app is only running in the background
- notifications











