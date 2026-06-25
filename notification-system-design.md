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

Stage 3

Query-b earlier developer:

SELECT * FROM notifications
WHERE studentId = 1042 AND isRead = false
ORDER BY createdAt ASC;

This query correctly fetches all unread notifications of student id 1042 and sorts them by creation time in asc order


It is slow because the db contains large amot of data about 50000 students,5000000 notifications 

Without proper indexes the db has to search through many rows before finding the required notifications
which causes delay in retriving and sorting

Can be improved?


Create a index on:
(studentId, isRead, createdAt);
O(n)-without indexs
which can make it faster with log n time complexity 


Should we add indexes on every column?
Yes - although it uses more storage the speed will increse while retriving

Indexes should only be added to columns that are frequently used

Question:
waq who got a placement notification in last 7 days 


SELECT studentId
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt == NOW() - INTERVAL 7 DAY;

this will fetch the data of all the students who have received the placements notification in last 7 days

Stage 4

Problem-As a user opens or refreshes the page ,the db requests will become high which cant be handled and can be overwhelmming

Solution-too many requests makes the system slow so 
we can use Pagination or Caching (frequently used data-every time from data) 
-no load 
-fast retrival
-quick responce from the server

Indexing database can also be a solution for too many requests handling -by creating ids or indexe for frequently used data base


By the above methonds we can reduce the load on the server and can retrive the data in a faster manner


Stage 5

Problems:

If sending an email fails,what if the email sending process stops midway like in the 200,now the rest students will not receive the email.
and we cant even mail individually to 50000+ people which will take lots of time

Solution
1.first send the notification to the db
2.and then the emails
3.if email fails retry -which make it more reliable 

Saving the notification should happen first so that it is not lost. Sending emails can happen separately As email may fail or take more time to deivery

Pseudocode

for student in students:

    save notification to database

    send the emails
    if fails:
        email retry
    else sucess:
        done

With this the student will get notified surely by the notification as the email may take time but the information is passed successfully 

Functions used:
1.send_email
2.save_to_db
3.push_to app

Stage 6:
Approach
To retrive the top 10 priority notifications:

Get all notifications from the Notification API.
Give priority based on notification type:

   1.Placement = 3(higher priority)
   2.Result = 2
   3.Event = 1(lower priority)
If two notifications have the same priority, show the latest one first.
Get all the 10 on the console


Fetch notifications

Filter unread notifications

Sort by priority and time 

Maintaining the Top 10 Notifications

Instead of sorting all notifications every time, I would keep only the best 10 notifications in memory.

When a new notification arrives:

1. Check its priority.
2. Compare it with the current top 10 notifications.
3. If it has higher priority (or is newer with the same priority), replace the lowest priority notification in the list. and sort the 10




