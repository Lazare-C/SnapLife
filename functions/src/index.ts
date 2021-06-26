"use strict";

import {storage, firestore} from "firebase-admin";


import functions = require("firebase-functions");
import admin = require("firebase-admin");
import {firebase} from "@react-native-firebase/auth";
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.UserCreateAccount = functions.auth.user().onCreate((user: { uid: any; }) => {
  console.log(user);
  firestore().collection("Users").doc(user.uid).set({
    LastPicture: null,
    timestamp: firestore.FieldValue.serverTimestamp(),
  });
});

exports.UserDeleteAccount = functions.auth.user().onDelete((user: { uid: any; }) => {
  firestore().collection("Users").doc(user.uid).delete();
});


exports.UploadPicture = functions.storage.object().onFinalize(
    (object: { name: any; mediaLink: any; selfLink: any; }, context: any) => {
      const filePath = object.name;
      functions.logger.debug(filePath);
      firestore().collection("Users").doc(filePath).update({
        LastPicture: object.mediaLink,
        selflink: object.selfLink,
        timestamp: firestore.FieldValue.serverTimestamp(),
        id: filePath,
        ServerUpdate: true,
      });
    });


exports.GetRendomPicture = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
 
  
  admin.storage().bucket().
// Find all the prefixes and items.
admin.storage().bucket()
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });

  response.send("Hello from Firebase!");
});
