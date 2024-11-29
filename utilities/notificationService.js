import * as Notifications from 'expo-notifications';

//sample notification data
const notificationMessages = [
    { id: 1, title: "Reminder", body: "Don't forget to check your tasks!" },
    { id: 2, title: "Update", body: "Your profile is 90% complete." },
    { id: 3, title: "Alert", body: "New event happening near you!" },
    { id: 4, title: "Reminder", body: "New networking event happening in 2 days!" },
    { id: 5, title: "Update", body: "You have been selected for this event, click here to register." },
  ];

//fetching random notifications
export function getRandomNotification(){
    const random = Math.floor(Math.random() * notificationMessages.length);
    return notificationMessages[random];
}

//scheduling notification for the device's notification panel
export async function scheduleNotification() {
    const notification = getRandomNotification();
    await Notifications.scheduleNotificationAsync({
        content: {
            title: notification.title,
            body: notification.body,
        },
        trigger: null, //for immediate notification
    });
    return notification; //returning for in app state management 
}