// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//const HOST="https://cix-tech-mart-api.onrender.com";
//const HOST = "http://localhost:8081";
const HOST = "https://cix-tech-mart-api-wfc2.onrender.com";

export const environment = {
  API: HOST + "/cix-tech-mart-api/v1",
  API_IMGBB: "https://api.imgbb.com/1",
  API_KEY_IMGBB: "50f687b8e7e2c39d7de8e7ad813ca6ff",
  production: false,
  defaultauth: 'fakebackend',
  firebase: {
    apiKey: "AIzaSyCFqKKX9TH3At_5bRG5VIKrm5jbE5KaeWQ",
    authDomain: "cix-tech-mart-2025.firebaseapp.com",
    projectId: "cix-tech-mart-2025",
  },
  firebaseConfig:{}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
