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
                    console.log("TOKEN:", token);
                    sendAccessTokenToServer(token)
                    .then((response) => {
                      console.log("RESPONSE AFTER LOGIN:", response);
                    }).catch(function (err) {
                      console.log("ERROR IN GET CURRENT ACCESS TOKEN:", err);
                    })
                    .done()
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