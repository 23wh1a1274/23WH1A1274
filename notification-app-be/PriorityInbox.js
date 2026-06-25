const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3doMWExMjc0QGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsImV4cCI6MTc4MjM4Mjg2MSwiaWF0IjoxNzgyMzgxOTYxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGRjZDNjMmItYjU5Zi00NTI0LWIxZDAtNWJlODE5NjhjMjA5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGFuaXNocWEga2FsaWRpbmRpIiwic3ViIjoiZWJlNTgxOTQtZTJiYi00YmY2LTk1YTUtMTMwYTQyMzIzMWYzIn0sImVtYWlsIjoiMjN3aDFhMTI3NEBidnJpdGh5ZGVyYWJhZC5lZHUuaW4iLCJuYW1lIjoidGFuaXNocWEga2FsaWRpbmRpIiwicm9sbE5vIjoiMjN3aDFhMTI3NCIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6ImViZTU4MTk0LWUyYmItNGJmNi05NWE1LTEzMGE0MjMyMzFmMyIsImNsaWVudFNlY3JldCI6InRjV0ZudnpHeFdoVFBYdEIifQ.fJ1xAy1P5hsE80IGPYy372LZDEOFjYDAYFHlJV0bUFw";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

async function getPriorityNotifications() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    

    const data = await response.json();
    console.log(data);

    let notifications = data.notifications;
    notifications = notifications.filter(notification => !notification.isRead);

    notifications.sort((a, b) => {
      const priority = {
        Placement: 3,
        Result: 2,
        Event: 1
      };

      if (priority[a.notificationType] !== priority[b.notificationType]) {
        return priority[b.notificationType] - priority[a.notificationType];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const top10 = notifications.slice(0, 10);

    console.log("The top 10 notifications");
    console.log(top10);

  } catch (error) {
    console.log("Error:", error.message);
  }
}

getPriorityNotifications();