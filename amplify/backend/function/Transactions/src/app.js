/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
var SHA256 = require("crypto-js/sha256");
const crypto = require('crypto');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "Transactions";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "transactionId";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/trasactions";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/************************************
* HTTP Get method to list objects *
************************************/

app.get(path, async function(req, res) {
  var params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES',
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/
/*
app.get(path + hashKeyPath, async function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});
*/
/*****************************************
 * HTTP Get method for get single object *
 *****************************************/
/*
app.get(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    const data = await ddbDocClient.send(new GetCommand(getItemParams));
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.json(data) ;
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});
*/

/************************************
* HTTP put method for insert object *
*************************************/
/*
app.put(path, async function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'put call succeed!', url: req.url, data: data })
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});
*/
/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, async function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  const reqData = req.body.data;
  const checkSumParams = req.body.signature.properties;
    const concatenatedString = checkSumParams
      .map((key) => {
        // Obtener el valor correspondiente de reqData usando la clave
        const value = key
          .split(".")
          .reduce(
            (obj, k) => (obj && obj[k] !== "undefined" ? obj[k] : undefined),
            reqData
          );

        // Retornar el valor si está definido, de lo contrario, una cadena vacía
        return value !== undefined ? value : "";
      })
      .join(""); // Unir los valores en una sola cadena

    const finalString = concatenatedString + req.body.timestamp + process.env.EVE_KI;
    console.log(finalString);
    const encondedText = new TextEncoder().encode(finalString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const params = {
      transactionId: reqData.transaction.id,
      checksum: req.body.signature.checksum,
      amountInCents: reqData.transaction.amount_in_cents,
      reference: reqData.transaction.reference,
      customerEmail: reqData.transaction.customer_email,
      currency: reqData.transaction.currency,
      paymentMethodType: reqData.transaction.payment_method_type,
      redirectUrl: reqData.transaction.redirect_url,
      status: reqData.transaction.status,
      event: req.body.event,
      environment: req.body.environment,
      timestamp: req.body.timestamp,
      sentAt: req.body.sent_at,
      ownCheckSum: hashHex,
      checksumParams: JSON.stringify(checkSumParams),
    };


  let putItemParams = {
    TableName: tableName,
    Item: params
  };
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'post call succeed!', url: req.url, data: data })
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/**************************************
* HTTP remove method to delete object *
***************************************/
/*
app.delete(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
    res.json({url: req.url, data: data});
  } catch (err) {
    res.statusCode = 500;
    res.json({error: err, url: req.url});
  }
});*/

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
