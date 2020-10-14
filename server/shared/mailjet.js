const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

const sendEmail = ({ toEmail, HTMLPart }) => { 

  const request = mailjet
    .post('send', {'version': 'v3.1'})
    .request({
      'Messages':[
        {
          'From': {
            'Email': 'siafin2005@ukr.net',
            'Name': 'Ihor'
          },
          'To': [
            {
              'Email': toEmail,
            }
          ],
          'Subject': 'Information about you order at Clock Masters',
          'HTMLPart': HTMLPart + '<br /> Welcome to <a href="http://clmasters.fyoung.dp.ua/info">Clock Masters site</a>',
        }
      ]
    })
  
  return request
}

module.exports = sendEmail

// .then((result) => {
//   console.log(result.body)
// })
// .catch((err) => {
//   console.log(err.statusCode)
// })