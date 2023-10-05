/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

/*
const aws = require('aws-sdk')
const ses = new aws.SES()


exports.handler = async (event) => {
  
  for (const record of event.Records) {

    if (record.eventName === 'INSERT') {

      const candiateName = JSON.stringify(record.dynamobd.NewImage.name.S);
      const candiateEmail = JSON.stringify(record.dynamobd.NewImage.email.S);
      const candiateMessage = JSON.stringify(record.dynamobd.NewImage.message.S);

      await ses
  .sendEmail({
    Destination: {
      ToAddresses: [process.env.SES_EMAIL]
    },
    Source: process.env.SES_EMAIL,
    Message: {
      Subject: { Data: 'Candidate Submission' },
      Body: {
        Text: {
          Data: `Mi nombre es ${candiateName}. Puedes contactarme a este email: ${candiateEmail} te he dejado este mensaje: ${candiateMessage}`
        }
      }
    }
  })
  .promise()

    }


  }


  return { status: 'Done' }
}
*/

const AWS = require('aws-sdk')
console.log('Loading function');

exports.handler = function(event, context, callback) {
    //console.log(JSON.stringify(event, null, 2));

    

    event.Records.forEach(function(record) {
       const name = record.dynamodb.NewImage.name.S
       const email = record.dynamodb.NewImage.email.S
       const message = record.dynamodb.NewImage.message.S

       const params = {
        Destination: {
          ToAddresses: [process.env.SES_EMAIL]
        },
        Source: process.env.SES_EMAIL,
        Message: {
          Subject: { Data: 'Candidate Submission' },
          Body: {
            Text: {
              Data: `Mi nombre es ${name}. Puedes contactarme a este email: ${email} te he dejado este mensaje: ${message}`
            }
          }
        }
      }

      var sendPromise = new AWS.SES({apiVersion: '2023-08-04'}).sendEmail(params).promise();

      sendPromise.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });
    });
    callback(null, "message");
};