"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { google } = require('googleapis');
const CALENDAR_ID = 'uq3drdoc4lgcb7cgqr7m3dn3g0@group.calendar.google.com';
const auth = new google.auth.GoogleAuth({
    keyFile: 'google_service_keys.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
});
const calendar = google.calendar({
    version: 'v3',
    auth,
});
const makeGoogleCalendarEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const newCalendarEvent = yield calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: eventData,
    });
    return newCalendarEvent;
});
const deleteGoogleCalendarEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId,
    });
});
module.exports = {
    makeGoogleCalendarEvent,
    deleteGoogleCalendarEvent,
};
//# sourceMappingURL=googleCalendarUtils.js.map