import admin from 'firebase-admin'
import FirebaseToken from '../models/firebaseToken.js'

import serviceAccount from '../fb-key.json' assert { type: 'json' }

admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
})

/**
 * @param {String} topic
 * @param {String} title
 * @param {String} body
 * @param {Object} data
 */
export const sendPushNotification = async (topic, title, body, data) => {
    try {
        return await admin.messaging().send({
            notification: {
                title,
                body,
            },
            data,
            topic: topic.toString(),
        })
    } catch (err) {
        return err
    }
}