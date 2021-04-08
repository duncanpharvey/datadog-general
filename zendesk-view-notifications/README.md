# Procedure for enabling Zendesk View Notifications

1. Open Chrome Developer Tools (Command Option I or 3 dots in top right > More Tools > Developer Tools)
2. Navigation to Sources tab
3. Create a new snippet and copy/paste script. Save snippet
4. Add SLACK_WEBHOOK to Watch variables OR set webhook directly in snippet (see #zendesk-view-notifications for webhook url)
  * You can run `console.log(SLACK_WEBHOOK)` in the console to confirm the variable was saved correctly
5. Confirm Self Assign::Training Queue is selected (or else notifications will be sent to Slack for other views)
6. Command Enter or press play button to start script
7. Minimize window and open another window to do work in Zendesk
8. Exit window or run `window.clearInterval(interval)` in the console to stop script

![Google Chrome Screenshot](/zendesk-view-notifications/images/zendesk-view-notifications-chrome.jpg)
