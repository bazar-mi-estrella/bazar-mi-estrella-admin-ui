// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//const HOST="https://cix-tech-mart-api.onrender.com";
const HOST = "http://localhost:8081";

export const environment = {
  API: HOST + "/cix-tech-mart-api/v1",
  API_IMGBB: "https://api.imgbb.com/1",
  API_KEY_IMGBB: "bdf9e0028dd8a2dd40976cdff5f58b44",
  production: false,
  defaultauth: 'fakebackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
