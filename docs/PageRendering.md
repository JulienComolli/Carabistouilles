# Page rendering specs

In order to display different pieces of information on pages using Handlebars, we need to define objects that will be sent to the front.

## ⚠ Errors

Errors can happen in forms (users always make mistakes). 

To display an error/multiple errors, we use the `error` object, tt contains a message and the input to highlight.

```json
{
    "message" : "This is an error message",
    "input": "nomInput" 
}
```

The error can be passed with multiple others to the rendering engine via the `errors` property : 
```js
server.render('page', { errors : [error1, error2] });
```

## 🗨 Notifications

To display notifications such as login/register/logout success.

**Notification object**
```json
{
    "message" : "This is a notification",
    "type": "success/danger/warning/primary"    
}
```

The notification can be passed to the rendering engine with the `notifications` property : 
```js
server.render('page', { notifications : [notif1, notif2] });
```