import { RT, RTTicket } from '@ucd-lib/rt-api';
import * as dotenv from 'dotenv'

dotenv.config();
 
const CREDS = {
  token: process.env.TOKEN,
  host: 'https://rt.lib.ucdavis.edu'
}

const RTClient = new RT(CREDS);
const response = await RTClient.searchTransactions([{field: "id", 'value': '1838248'}])
const d = await response.json();
console.log(d);