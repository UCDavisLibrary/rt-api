/**
 * Upload some attachments when creating a ticket
 */

 import { RT, RTTicket } from '@ucd-lib/rt-api';
 import * as fs from 'node:fs';
 import * as dotenv from 'dotenv'
 
 dotenv.config();
 
 const CREDS = {
   token: process.env.TOKEN,
   host: 'https://rt-test.lib.ucdavis.edu'
 }
 
 const RTClient = new RT(CREDS);
 const ticket = new RTTicket();
 ticket.addSubject('here are some attachments!');
 ticket.addQueue('webdev');
 ticket.addRequestor('spelkey@ucdavis.edu');
 
 const textFile = fs.readFileSync('attachments/lorem.txt');
 const textFileContent = Buffer.from(textFile).toString('base64');
 ticket.addAttachment('lorem.txt', 'text/plain', textFileContent);
 
 const picture = fs.readFileSync('attachments/egghead.png');
 const pictureContent = Buffer.from(picture).toString('base64');
 ticket.addAttachment('egghead.png', 'image/png', pictureContent);
 
 const response = await RTClient.createTicket(ticket);
 console.log(response.status);
 const d = await response.json();
 console.log(d);
 
 console.log('done');
 