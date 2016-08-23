import React, {Component} from 'react';

import {
	View
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

import { store } from './../store';
import { sendAccessTokenToServer, getAllUserDataOnLogin } from './../async/';
import { deleteAllMessages } from './../actions/';

class FBLogin extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let token = data.accessToken.toString();
                    return token;
                })
                .then(
                  (token) => {
                    console.log("TOKEN:", token);
                    return sendAccessTokenToServer(token);
                })
                .then(
                  (response) => {
                    console.log("RESPONSE PASSED INTO GET ALL MESSAGES:", response);
                    return getAllUserDataOnLogin(response.userId);
                })
                .then(
                  (response) => {
                    Actions.initial();
                    console.log("RESPONSE AFTER HTTP REQUEST:", response);
                    //another http request to update messages
                })
                .catch(
                  (err) => {
                    console.log(err);
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            alert("logout.");
            store.dispatch(deleteAllMessages());
            Actions.login();
          }}/>
      </View>
    );
  }
}

export { FBLogin };