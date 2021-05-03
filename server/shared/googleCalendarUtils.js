// https://github.com/googleapis/google-api-nodejs-client
// https://console.cloud.google.com/iam-admin/serviceaccounts/details/109183823924919814915/keys?project=clmasters&supportedpurview=project
// https://developers.google.com/calendar/v3/reference/events/insert#examples
// !!! https://github.com/googleapis/google-api-nodejs-client#using-api-keys
// https://developers.google.com/calendar/v3/reference/

const { google } = require('googleapis')

const auth = new google.auth.GoogleAuth({
  keyFile: 'google_service_keys.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
})

const calendar = google.calendar({
  version: 'v3',
  auth,
})

const makeGoogleCalendarEvent = async (eventData) => {
  console.log('--PUT TO GOOGLE CALENDAR ROUTINE--')
  console.log('[eventData]', eventData)

  calendar.events.insert(
    {
      auth: auth,
      calendarId: 'uq3drdoc4lgcb7cgqr7m3dn3g0@group.calendar.google.com',
      resource: eventData,
    },
    function (err, event) {
      if (err) {
        console.log(
          'There was an error contacting the Calendar service: ' + err
        )
        return
      }
      console.log('Event created: %s', event.htmlLink)
    }
  )

}

module.exports = {
  makeGoogleCalendarEvent,
}
