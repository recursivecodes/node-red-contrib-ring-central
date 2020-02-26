# node-red-contrib-ring-central

## What is it?

A module to bring SMS/MMS capabilities into your Node-RED flows! 

With the [Ring Central APIs](https://developers.ringcentral.com/) you can send and receive SMS/MMS messages (plus much more) and this module adds this funcionality into your Node-RED flows.

Let's say you are monitoring an API or sensor and you would like to publish an SMS message to your mobile phone every time a certain value is retrieved. Simple - just add an `sms send` node!

Or, maybe you want your flow to take a certain action when you send a specific message to your Ring Central number?  Easy - add an `sms receive` node and parse the response! The response object for each message also includes an array of attachments for MMS. So how do you view an attachment? Also easy - just get a signed url for the attachment URL from the `sign url` node and view it in your browser (or use it with `http in`, `template` and `http response` nodes).

## Getting Started

You'll need a Ring Central account (the free dev account is good enough), so sign up and then [create a new SMS app](https://developers.ringcentral.com/guide/messaging/quick-start/node) to get the username, password, server, extension, client id, client secret that you'll need in your flows.

## More

Is coming soon... stay tuned!

## Issues

File an issue on GitHub!