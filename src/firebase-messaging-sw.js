importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase.js');

var config = {
    apiKey: "AIzaSyCnPHTbpHZnL_8kEs-vMgg1_5hD6tUqvUA",
    authDomain: "it-support-5254f.firebaseapp.com",
    databaseURL: "https://it-support-5254f.firebaseio.com",
    projectId: "it-support-5254f",
    storageBucket: "it-support-5254f.appspot.com",
    messagingSenderId: "436013358224"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
/*
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/assets/img/mit-icon.png'
    };

return self.registration.showNotification(notificationTitle,
    notificationOptions);
});*/