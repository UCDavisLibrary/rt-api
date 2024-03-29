import { RT, RTTicket } from '@ucd-lib/rt-api';
import * as dotenv from 'dotenv'

dotenv.config();
 
const CREDS = {
  token: process.env.TOKEN,
  host: 'https://rt.lib.ucdavis.edu'
}

const url = 'https://rt.lib.ucdavis.edu/REST/2.0/transaction/1844630?fields=Type,OldValue,NewValue,Field,Created,Creator,Owner'
//const url = 'https://rt.lib.ucdavis.edu/REST/2.0/ticket/76212/history?fields=Type,OldValue,NewValue,Field,Created,Creator,Owner'
//const url = 'https://rt.lib.ucdavis.edu/REST/2.0/user/spelkey';
//const url = 'https://rt.lib.ucdavis.edu/REST/2.0/ticket/76211';
const RTClient = new RT(CREDS);
const response = await RTClient._fetch(url);
const d = await response.json();
console.log(d);