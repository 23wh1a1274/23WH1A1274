 Stage 1

 Notification System Design


Authorization:
{
    "email": "23wh1a1274@bvrithyderabad.edu.in",
    "name": "tanishqa kalidindi",
    "rollNo": "23wh1a1274",
    "accessCode": "ahXjvp",
    "clientID": "ebe58194-e2bb-4bf6-95a5-130a423231f3",
    "clientSecret": "tcWFnvzGxWhTPXtB"
}

{
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3doMWExMjc0QGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsImV4cCI6MTc4MjM3NDQ2MCwiaWF0IjoxNzgyMzczNTYwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODNiZjdhMTEtYTI3OS00ZWU2LTgwMDQtY2EwMjAzOWRmNzQ0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGFuaXNocWEga2FsaWRpbmRpIiwic3ViIjoiZWJlNTgxOTQtZTJiYi00YmY2LTk1YTUtMTMwYTQyMzIzMWYzIn0sImVtYWlsIjoiMjN3aDFhMTI3NEBidnJpdGh5ZGVyYWJhZC5lZHUuaW4iLCJuYW1lIjoidGFuaXNocWEga2FsaWRpbmRpIiwicm9sbE5vIjoiMjN3aDFhMTI3NCIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6ImViZTU4MTk0LWUyYmItNGJmNi05NWE1LTEzMGE0MjMyMzFmMyIsImNsaWVudFNlY3JldCI6InRjV0ZudnpHeFdoVFBYdEIifQ.NDRFGc3PJIoLB1zp03SVGmgnDFAtp38dWv8M2lby0QA",
    "expires_in": 1782374460
}

Content-Type: application/json

this will allow the autenticated user to get and receive the json notification and responce in th json format

1. Get All Notifications
    Endpoint
    GET /api/v1/notifications

    Responce in the form of JSON
{
  "success": true,
  "data": [
    {
      "message": "Notification Received",
    }
  ]
}


2. Get Notification-specific notification based on ID
    Endpoint
    GET /api/v1/notifications/{id}
    Response in the form of JSON
{
  "success": true,
  "data": [
    {
      "message": "Notification from specific  id",
    }
  ]
}


3.Mark as Read
    Endpoint
    PATCH /api/v1/notifications/{id}/read
    Request in JSON
{
  "isRead": true
}


---

4.Delete Notification
Endpoint
DELETE /api/v1/notifications/{id}
Response in JSON 

{
  "success": true,
  "message": "Notification deleted"
}

Notification Format
{
  "id":String
  "message": "string",
  "isRead": false
}
```

---

Real-Time Notifications
Use **WebSocket** to send notifications instantly.
Endpoint
https://localhost:5000/ws/notifications

Example:

```json
{
  "event": "value",
  "data": {
    "id": "2",
    "title": "id-updates",
    "message": "You have a new notification"
  }
}

Stage 2-Update

DB-Data Base used:: MongoDB-NoSQL
as it is JSON values it is easy to store them on mongo db and make the necessary changes accordingly 
and it is scalable also 

1.Schema-Followed by the DB

Collection: **notifications**

{
  "_id": "notificationId",
  "userId": "specific USer id",
  "title": "Notification TItle",
  "message": "message",
  "type": "String",
  "isRead": false,"which will turn true on markread"
  "createdAt": "time"
}

2.Problems - which might occur after the data vol increses
-DB size will rise.
-MarkRead operation can take time
-Slow Processing

3.Solutions suggested

-Use scalable DB as the data increses
-Use pagination and Segmentation 
-Time to Time deletion of older notificatins

---

NoSQL Queries
1.Get All Notifications
db.notification.find({ userId: "123" })
-will get all the notifications of a specific user based on the user id mentioned

2.Get Notification by ID
db.notification.find({ _id: ObjectId("id") })
-to get specific notification from a specific ID(only one json value)

3.Mark as Read
db.notification.updateOne(
  { _id: ObjectId("id") },
  { $set: { isRead: true } }
)
intially set the value to false will turn to true on reading the message

4.Delete Notification
db.notification.deleteOn({ _id: ObjectId("id") })
-will delete the one value