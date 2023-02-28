/**
 * Test functionality required for sending onboarding tickets
 */
import { RT, RTTicket } from '@ucd-lib/rt-api';
import * as dotenv from 'dotenv'

dotenv.config();
 
const CREDS = {
  token: process.env.TOKEN,
  host: 'https://rt.lib.ucdavis.edu'
}

const RTClient = new RT(CREDS);

/** 
 * Existing Ticket
*/

/**
const ticket = new RTTicket({id: '76025'});
const reply = ticket.createReply();
reply.addSubject(`I am a reply`);
reply.addContent('How are you?');
reply.addContent(`<a href='https://google.com'>here is a formatted link</a>`);
*/

/**
 * New Ticket
 */

const ticket = new RTTicket({Queue: 'test', 'Subject': 'A New Ticket'});
await RTClient.createTicket(ticket);
const reply = ticket.createReply();
reply.addSubject(`I am a reply`);
const response = await RTClient.sendCorrespondence(reply);
const d = await response.json();
console.log(d);

