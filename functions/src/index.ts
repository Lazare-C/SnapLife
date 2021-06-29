import {storage, firestore} from "firebase-admin";


import functions = require("firebase-functions");
import admin = require("firebase-admin");
admin.initializeApp();
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.UserCreateAccount = functions.auth
    .user().onCreate((user) => {
      console.log(user);
      firestore().collection("Users").doc(user.uid).set({
        LastPicture: null,
        timestamp: firestore.FieldValue.serverTimestamp(),
        id: user.uid,
      });
    });

exports.UserDeleteAccount = functions.
    auth.user().onDelete((user) => {
      firestore().collection("Users").doc(user.uid).delete();
    });

exports.UploadPicture = functions.storage.object().onFinalize(
    (object, context) => {
      const filePath = object.name || "";
      firestore().collection("Users").doc(filePath).update({
        LastPicture: object.mediaLink,
        selflink: object.selfLink,
        timestamp: firestore.FieldValue.serverTimestamp(),
        id: filePath,
        ServerUpdate: true,
      });
    });
