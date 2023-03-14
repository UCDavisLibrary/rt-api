import { RT, RTTicket } from '@ucd-lib/rt-api';
import * as dotenv from 'dotenv'

dotenv.config();
 
const CREDS = {
  token: process.env.TOKEN,
  host: 'https://rt.lib.ucdavis.edu'
}

const RTClient = new RT(CREDS);
const params = {
  fields: 'Type,OldValue,NewValue,Field,Created,Creator',
  per_page: 100
}
const response = await RTClient.getTicketHistory('76039', params);
const d = await response.json();
console.log(d);