import { Session } from 'express-session';

/**
 * 
 * @param {Session} session 
 * @param {Notification} notification 
 */
export function addNotification(session, notification){

    if(session.notifications == null)
        session.notifications = []

    session.notifications.push(notification);

    session.save((err) => {
        if(err)
            console.log('An error occured');
    });
}

/**
 * Add a notification to a user's session
 * @param {Session} session 
 * @param {String} title 
 * @param {String} message 
 * @param {String} type (success/error/null)
 */
export function addNotificationText(session, title, message, type=null){
    addNotification(session, new Notification(title, message, type))
}

/**
 * 
 * @param {Session} session User's session 
 * @returns Notifications to be displayed
 */
export function displayNotifications(session){
    let notifications = getNotifications(session);
    clearNotifications(session);
    return notifications;
}

/**
 * Get all the notifications of a session
 * @param {Session} session 
 * @returns {[Notification]} notifications
 */
export function getNotifications(session){
    if(session?.notifications == null)
        return [];
    return session.notifications;
}

/**
 * Clear user's notifications
 * @param {Session} session 
 */
export function clearNotifications(session){
    session.notifications = []
    session.save();
}

export class Notification{
    /**
     * Notification to provide information to the user
     * @param {String} title 
     * @param {String} message 
     * @param {String} type
     */
    constructor(title, message, type){
        this.title = title;
        this.message = message;
        this.type = type;
    }
}