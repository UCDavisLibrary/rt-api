import { RT, RTTicket } from '@ucd-lib/rt-api';
import * as dotenv from 'dotenv'

dotenv.config();

const CREDS = {
  token: process.env.TOKEN,
  host: 'https://rt-test.lib.ucdavis.edu'
}

const RTClient = new RT(CREDS);
const ticket = new RTTicket();
ticket.addSubject('with an object in the body with plain text');
ticket.addQueue('webdev');
ticket.addContentType = 'text/plain';
ticket.addContent({steve: 'is great', well: 'sort of', 'an array': [1,2,3,4,5]});


const response = await RTClient.createTicket(ticket);
console.log(response.status);
const d = await response.json();
console.log(d);
