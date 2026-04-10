importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCH7nWDFWRu_j-0xF-Z1tOvxUll0d35X9M",
  authDomain: "red-domino-precision-freight.firebaseapp.com",
  projectId: "red-domino-precision-freight",
  storageBucket: "red-domino-precision-freight.firebasestorage.app",
  messagingSenderId: "453774050329",
  appId: "1:453774050329:web:3a00559e37cdb813e79688",
  measurementId: "G-YY9J4J8WPD"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
});