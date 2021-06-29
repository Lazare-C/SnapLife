"use strict";
exports.__esModule = true;
var firebase_admin_1 = require("firebase-admin");
var functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp();
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.UserCreateAccount = functions.auth
    .user().onCreate(function (user) {
    console.log(user);
    firebase_admin_1.firestore().collection("Users").doc(user.uid).set({
        LastPicture: null,
        timestamp: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
        id: user.uid
    });
});
exports.UserDeleteAccount = functions.
    auth.user().onDelete(function (user) {
    firebase_admin_1.firestore().collection("Users").doc(user.uid)["delete"]();
});
exports.UploadPicture = functions.storage.object().onFinalize(function (object, context) {
    var filePath = object.name || "";
    console.log(object);
    console.log(context);
    // firestore().collection("Users").doc(filePath).update({
    //   LastPicture: object.mediaLink,
    //   selflink: object.selfLink,
    //   timestamp: firestore.FieldValue.serverTimestamp(),
    //   id: filePath,
    //   ServerUpdate: true,
    // });
});
