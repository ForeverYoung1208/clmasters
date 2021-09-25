"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const MSEC_IN_HOUR = 3600000;
const MSEC_IN_MINUTE = 60000;
const MSEC_IN_SECOND = 1000;
const services = {
    timestrToMSec: function (str) {
        const mSec = str.split(':').reduce((acc, val, idx) => {
            switch (idx) {
                case 0:
                    return (acc + parseInt(val) * MSEC_IN_HOUR);
                case 1:
                    return (acc + parseInt(val) * MSEC_IN_MINUTE);
                case 2:
                    return (acc + parseInt(val) * MSEC_IN_SECOND);
                default:
                    throw (new Error({ message: 'wrong format of time' }));
            }
        }, 0);
        return mSec;
    },
    noTimestamps: function (data) {
        const { createdAt, updatedAt } = data, dataNoTimestamps = __rest(data, ["createdAt", "updatedAt"]);
        return dataNoTimestamps;
    },
    timeStrToWords: function (timeStrIn) {
        const hours = +timeStrIn.substring(0, 2);
        const minutes = +timeStrIn.substring(3, 5);
        let hVal = '';
        let mVal = '';
        let hText = '';
        let mText = '';
        let comma = '';
        hours === 1 && (hText = ' hour');
        hours > 1 && (hText = ' hours');
        hours >= 1 && (hVal = '' + hours);
        minutes === 1 && (mText = ' minute');
        minutes > 1 && (mText = ' minutes');
        minutes >= 1 && (mVal = '' + minutes) && (comma = ', ');
        return hVal + hText + comma + mVal + mText;
    }
};
module.exports = services;
//# sourceMappingURL=services.js.map