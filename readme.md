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

// initialize ticket
const ticketToCreate = new RTTicket();

// queue is only required field to submit a ticket.
// can take case-insensitive name or numeric id
ticketToCreate.addQueue('webdev');

// but it's good to include a subject...
ticketToCreate.addSubject('Can you code up this thing?');

// and content...
ticketToCreate.addContent('I go in the ticket body.');
ticketToCreate.addContent('Calling addContent again will append a new line.');
ticketToCreate.addContent('By default, content type <b>is html</b>');

// you can also quickly pass through simple structured data
const DATA = {
  yourName: 'Bender Rodriguez',
  robotType: 'Bender Unit',
  tags: ['libraries', 'are', 'great']
}
ticketToCreate.addContent(DATA);

// ticket requestor
ticketToCreate.addRequestor('requestor@ucdavis.edu');

// any people to cc the request to
ticketToCreate.addCc('someone@ucdavis.edu', 'someoneElse@ucdavis.edu');

// add custom fields
// if key or value does not exist, ticket will still be created
ticketToCreate.addCustomField('SubQueue', 'Web');

// add attachments by encoding content as base64
 const anImage = fs.readFileSync('egghead.png');
 const imageAsBase64 = Buffer.from(anImage).toString('base64');
 ticketToCreate.addAttachment('egghead.png', 'image/png', imageAsBase64);

// submit ticket to RT for creation
// will return a node-fetch response object
const response = await RTClient.createTicket(ticketToCreate);
const d = await response.json();
```

## Adding correspondence
Correspondence is either a comment (no email sent) or a reply (email is sent). A ticket must exist prior to adding correspondence.
``` js
// Add comment to existing ticket
const ticket = new RTTicket({id: '76025'});
const comment = ticket.createComment();
comment.addSubject(`I have a comment`);
comment.addContent('And here it is');
const response = await RTClient.sendCorrespondence(comment);

// Add reply to new ticket
const ticket = new RTTicket({Queue: 'test', 'Subject': 'A New Ticket'});
await RTClient.createTicket(ticket);
const reply = ticket.createReply();
reply.addSubject(`I am a reply`);
const response = await RTClient.sendCorrespondence(reply);
```

## Additional Resources
- [Offical RT API Documentation](https://github.com/bestpractical/rt-extension-rest2/blob/master/README)
