# Notifications

Notifications are good visual elements to display small pieces of informations.

## Front-end

Notifications rely on the user's session, therefore, when rendering a page, never forget to give the session as a parameter, like in this example :

```js
res.render('account', { session: req.session, ...});
```

### Disable notifications

If you want to disable notifications on a page, give the parameter `disableNotifications: true` in the rendering method.

```js
res.render('account', { session: req.session, disableNotifications: true, ...});
```

The notifications **will be kept in memory** until a page is allowed to display them. To force erase them, use the method `clearNotifications()`.

## Back-end

The `NotificationController` is responsible for handling the notifications behaviour.

### Notification class

Notification contains 3 attributes :
- `title` *short string*
- `message` *string*
- `type` *string*

**Types**

- `info` (Blue) *default*
- `error` (Red)
- `success` (Green)

**Create a notification**

```js
let notif = new Notification('Title', 'The message', 'error');
```

### Add a notification

```js
addNotification(session, notification);
```

### Get all notifications

Returns all notifications from the user's session, this method **does not** clear the notifications from the session.

```js
getNotifications(session);
```

### Display - Get all notification & clear

Returns all notifications from the user's session and clear them from it's session.

```js
displayNotifications(session);
```

### Clear notifications

Remove all notifications from the user's session.

```js
clearNotifications(session);
```