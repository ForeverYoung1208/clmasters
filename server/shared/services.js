const MSEC_IN_HOUR = 3600000
const MSEC_IN_MINUTE = 60000
const MSEC_IN_SECOND = 1000

const timestrToMSec = function (str) {
  const mSec = str.split(':').reduce((acc, val, idx) => {
    switch (idx) {
    case 0:
      return acc + parseInt(val) * MSEC_IN_HOUR
    case 1:
      return acc + parseInt(val) * MSEC_IN_MINUTE
    case 2:
      return acc + parseInt(val) * MSEC_IN_SECOND
    default:
      throw new Error({ message: 'wrong format of time' })
    }
  }, 0)
  return mSec
}

const noTimestamps = function (data) {
  // eslint-disable-next-line no-unused-vars
  const { createdAt, updatedAt, ...dataNoTimestamps } = data
  return dataNoTimestamps
}

const timeStrToWords = function (timeStrIn) {
  // '01:34:67'
  const hours = +timeStrIn.substring(0, 2)
  const minutes = +timeStrIn.substring(3, 5)
  let hVal = ''
  let mVal = ''
  let hText = ''
  let mText = ''
  let comma = ''

  hours === 1 && (hText = ' hour')
  hours > 1 && (hText = ' hours')
  hours >= 1 && (hVal = '' + hours)

  minutes === 1 && (mText = ' minute')
  minutes > 1 && (mText = ' minutes')
  minutes >= 1 && (mVal = '' + minutes) && (comma = ', ')

  return hVal + hText + comma + mVal + mText
}

export {timestrToMSec, noTimestamps, timeStrToWords }
