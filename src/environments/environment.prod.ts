//const HOST = "https://cix-tech-mart-api.onrender.com";
const HOST = "http://localhost:8081";

export const environment = {
  API: HOST + "/cix-tech-mart-api/v1",
  
  API_IMGBB: "https://api.imgbb.com/1",
  API_KEY_IMGBB: "bdf9e0028dd8a2dd40976cdff5f58b44",

  production: true,
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
