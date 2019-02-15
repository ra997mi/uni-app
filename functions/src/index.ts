import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

  export const sendOnFirestoreCreate = functions.firestore
  .document('eventList/{id}')
  .onCreate(async snapshot => {
    const events = snapshot.data();

    const notification: admin.messaging.Notification = {
      title: events.title,
      body: events.content
    };

    const android: admin.messaging.AndroidConfig = {
      priority: 'high',
      notification :{
        title:  events.title,
        body: events.content,
        icon: 'http://bu.edu.eg/portal/uploads/univiveristies/1478604738.png',
        channelId: 'uni-app-idz'
      }
    }

    const payload: admin.messaging.Message = {
        notification,
        android,
        webpush: {
          notification: {
            vibrate: [200, 100, 200],
            icon: 'http://bu.edu.eg/portal/uploads/univiveristies/1478604738.png'
          }
        },
        topic: 'events'
      };

    return admin.messaging().sendToTopic('events', payload);
  });
