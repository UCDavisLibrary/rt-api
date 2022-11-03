# RT API Wrapper

This is an opinionated wrapper around the Request Tracker (RT) API so UC Davis Library programmers can easily perform common actions with our [RT instance](https://rt.lib.ucdavis.edu). This is not designed to be an exhaustive tool. If you think functionality is missing, add it and submit a PR.

## Prerequisites

1. A token is required to instantiate the primary RT class. Obtain a token by going to `Logged in as xx_you_xx => Settings => Auth Tokens`. If you do not see this menu, ask an RT admin (James) for the `manage authentication tokens` privilege.
2. Requests are also IP restricted to the office, our ITIS VPN IPs, and local. 

## Installation
```bash
npm install @ucd-lib/rt-api
```

## Creating a Ticket
```js
import { RT, RTTicket } from '@ucd-lib/rt-api';

// initialize
const TOKEN = 'xyz';
const RTAPI = new RT(TOKEN);

// hydrate ticket
const ticketToCreate = new RTTicket();
ticketToCreate.setQueue('webdev');
ticketToCreate.setSubject('Can you code up this thing?');

// create ticket
const response = await RTClient.createTicket(ticketToCreate);
console.log(response.status);
const d = await response.json();
console.log(d);
```

## Additional Resources
- [Offical RT API Documentation](https://github.com/bestpractical/rt-extension-rest2/blob/master/README)