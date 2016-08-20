import React, {Component} from 'react';

import {
	View
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

import { sendAccessTokenToServer } from './../async/';

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
                    console.log("RESPONSE AFTER HTTP REQUEST:", response);
                })
                .catch(
                  (err) => {
                    console.log(err);
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

export { FBLogin };