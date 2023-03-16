import { RT, RTTicket } from '@ucd-lib/rt-api';
import * as dotenv from 'dotenv'

dotenv.config();
 
const CREDS = {
  token: process.env.TOKEN,
  host: 'https://rt.lib.ucdavis.edu'
}

const RTClient = new RT(CREDS);

const ticket = new RTTicket({Queue: 'test', 'Subject': 'Test adding an owner'});
ticket.addOwner('pmanager');
const r = await RTClient.createTicket(ticket);
const d = await r.json();
console.log(d);