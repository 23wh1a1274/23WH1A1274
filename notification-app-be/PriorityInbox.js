const ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3doMWExMjc0QGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsImV4cCI6MTc4MjM4MTg4OCwiaWF0IjoxNzgyMzgwOTg4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2I4ZTYyNDQtYzU0Yy00ZjkwLWIwNDMtNmRkMWM4ZDRiNTk2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGFuaXNocWEga2FsaWRpbmRpIiwic3ViIjoiZWJlNTgxOTQtZTJiYi00YmY2LTk1YTUtMTMwYTQyMzIzMWYzIn0sImVtYWlsIjoiMjN3aDFhMTI3NEBidnJpdGh5ZGVyYWJhZC5lZHUuaW4iLCJuYW1lIjoidGFuaXNocWEga2FsaWRpbmRpIiwicm9sbE5vIjoiMjN3aDFhMTI3NCIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6ImViZTU4MTk0LWUyYmItNGJmNi05NWE1LTEzMGE0MjMyMzFmMyIsImNsaWVudFNlY3JldCI6InRjV0ZudnpHeFdoVFBYdEIifQ.rGQpTEfIO4wDi1a9eM_5FaP7DrU6TK9qx5OcnIVz6UM";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";


const priorityplacement = {
  Placement: 3,
  Result: 2,
  Event: 1,
};
async function fetchNotifications() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = 
    await response.json();

    return data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
  }
}

fetchNotifications().then((notifications) => {
  console.log(notifications);
});