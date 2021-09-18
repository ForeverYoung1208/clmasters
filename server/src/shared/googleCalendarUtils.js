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
  const newCalendarEvent = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: eventData,
  })
  return newCalendarEvent
}

const deleteGoogleCalendarEvent = async (eventId) => {
  calendar.events.delete({
    calendarId: CALENDAR_ID,
    eventId,
  })
}

module.exports = {
  makeGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
}
