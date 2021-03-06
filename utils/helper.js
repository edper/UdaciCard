import React from 'react'
import { View, StyleSheet, AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Udacicard:ed_notifications'

// Function for clearing Local notifications
export function clearLocalNotification() {
    return 
      AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Function for creating data for notification
function createNotification() {
   return {
     title: 'Study reminder',
     body:  "👋 don't forget to study today!",
     ios : {
       sound:true
     },
     android: {
       sound:true,
       priority:'high',
       sticky:false,
       vibrate:true,
     }
   }
  }
  

// Wrapper for creating a new notification
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((JSON.parse))
    .then((data)=>{
      if (data == null) {
         Permissions.askAsync(Permissions.NOTIFICATIONS)
         .then(({status})=>{
           if (status==='granted') {
             setNotification()
           }
         })
      }
      setNotification()
    })
  }

// Actual function for creating a notification
function setNotification() {

    Notifications.cancelAllScheduledNotificationsAsync()
    
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    tomorrow.setHours(8)
    tomorrow.setMinutes(0)
    Notifications.scheduleLocalNotificationAsync(
      createNotification(), {
        //time: (new Date()).getTime() + 1000 ,
        //repeat: 'minute',
        time : tomorrow,
        repeat: 'day',
      }
    )
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

}
