// https://github.com/googleapis/google-api-nodejs-client
// https://console.cloud.google.com/iam-admin/serviceaccounts/details/109183823924919814915/keys?project=clmasters&supportedpurview=project
// https://developers.google.com/calendar/v3/reference/events/insert#examples
// !!! https://github.com/googleapis/google-api-nodejs-client#using-api-keys
// https://developers.google.com/calendar/v3/reference/

const { google } = require('googleapis')
const CALENDAR_ID = 'uq3drdoc4lgcb7cgqr7m3dn3g0@group.calendar.google.com'


const auth = new google.auth.GoogleAuth({
  keyFile: 'google_service_keys.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
})

const calendar = google.calendar({
  version: 'v3',
  auth,
})

const makeGoogleCalendarEvent = async (eventData) => {
  let newEventId
  await calendar.events.insert(
    {
      auth: auth,
      calendarId: CALENDAR_ID,
      resource: eventData,
    },
    function (err, event) {
      if (err) throw new Error('There was an error contacting the Calendar service: ' + err)

      console.log('Event created: %s', JSON.stringify(event.data))
      newEventId = event.data.id
    }
  )
  return newEventId
}

const deleteGoogleCalendarEvent = async (eventId) => {
  calendar.events.delete(
    {
      auth: auth,
      calendarId: CALENDAR_ID,
      eventId
    }
  )
}


module.exports = {
  makeGoogleCalendarEvent,
  deleteGoogleCalendarEvent
}
