/**
 * @class RTTicket
 * @classdesc Represents an RT Ticket
 */
export default class RTTicket {
  
  /**
   * @description Constructor
   * @param {Object} data - Optional. Directly set the request body
   */
  constructor(data){
    this.subject = '';
    this.queue = '';
    this.contentType = 'text/html';
    this.content = '';
    this.requestor = '';
    this.cc = '';
    this.id = '';
    this.url = '';
    this.customFields = {};
    this.attachments = [];

    if ( !data ) return;
    this._data = data;

    if ( data.Subject ) this.subject = data.Subject;
    if ( data.Queue ) this.queue = data.Queue;
    if ( data.ContentType ) this.contentType = data.ContentType;
    if ( data.Content ) this.content = data.Content;
    if ( data.Requestor ) this.requestor = data.Requestor;
    if ( data.Cc ) this.cc = data.Cc;
    if ( data.CustomFields ) this.customFields = data.CustomFields;
    if ( data.Attachments ) this.attachments = data.Attachments;
  }

  /**
   * @method addSubject
   * @description Sets the ticket subject
   * @param {String} subject
   */
  addSubject(subject){
    this.subject = subject;
  }

  /**
   * @method addRequestor
   * @description Add the ticket requestor
   * @param {String} requestor - An email address
   */
  addRequestor(requestor){
    this.requestor = requestor;
  }

  /**
   * @method addCc
   * @description Add email addresses to CC list
   * @param  {String|String[]} args 
   */
  addCc(...args){
    const delimiter = ','; 
    const emails = [];
    args.forEach(a => {
      if ( Array.isArray(a) ) {
        emails.push(...a);
      } else {
        emails.push(a);
      }
    });
    if ( this.cc ) this.cc += delimiter;
    this.cc += emails.join(delimiter);
  }

  /**
   * @method addCustomField
   * @description Add a registered custom field to ticket.
   * If either key or value are not registered, ticket creation will still occur, 
   * but without the custom field.
   * @param {String} key 
   * @param {String} value 
   */
  addCustomField(key, value){
    this.customFields[key] = value;
  }

  /**
   * @method addAttachment
   * @description Add an attachment to the ticket
   * @param {String} name - Name of file
   * @param {String} type - The MIME type of the file
   * @param {String} content - Content of file as MIME Base64
   */
  addAttachment(name, type, content){
    this.attachments.push({
      FileName: name,
      FileType: type,
      FileContent: content
    });
  }

  /**
   * @method addQueue
   * @description Sets ticket to a queue. This is required.
   * @param {string|number} queue - Can be case-insensitive name of queue or its object ID.
   */
  addQueue(queue){
    this.queue = queue;
  }

  /**
   * @method addContent
   * @description Append text to the RT ticket body
   * @param {String|Array|Object} content
   * @param {Boolean} [addNewLine=true] - Appends content to new line.
   */
  addContent(content, addNewLine=true){
    const lb = this.contentType == 'text/html' ? '<br>' : "\n";
    const isHtml = this.contentType === 'text/html'; 
    if ( this.content && addNewLine ){
      this.content += lb;
    }
    if ( typeof content === 'string' ) {
      this.content += content;
    } else if ( Array.isArray(content) ){
      this.content += content.join(', ');
    } else if ( typeof content === 'object' &&  content !== null ) {
      for (const k of Object.keys(content) ) {
        let v = content[k];
        if ( isHtml ) {
          this.content += `<b>${k}</b>`;
        } else {
          this.content += k;
        }
        this.content += ': ';
        if ( typeof v === 'string' ) {
          this.content += v;
        } else if (Array.isArray(v)){
          this.content += v.join(', ');
        } else if (typeof content === 'object') {
          this.content += JSON.stringify(v);
        }
        this.content += lb;
      }
    }

  }

  /**
   * @method addContentType
   * @description Sets the content type of ticket body
   * @param {String} contentType - text/html or text/plain
   */
  addContentType(contentType){
    this.contentType = contentType;
  }
  /**
   * @method makePayload
   * @description Returns an object for the request body
   * @returns {Object}
   */
  makePayload(){
    const payload = {};
    if ( this.subject ){
      payload.Subject = this.subject;
    }
    if ( this.queue ){
      payload.Queue = this.queue;
    }
    if ( this.content ){
      payload.Content = this.content;
      payload.ContentType = this.contentType;
    }
    if ( this.requestor ){
      payload.Requestor = this.requestor;
    }
    if ( this.cc ){
      payload.Cc = this.cc;
    }
    if ( Object.keys(this.customFields).length ){
      payload.CustomFields = this.customFields;
    }
    if ( this.attachments.length ) {
      payload.Attachments = this.attachments;
    }

    return payload;
  }

  /**
   * @method _onCreation
   * @private
   * @description Stores ticket creation info from fetch response
   * @param {Response} response 
   */
  async _onCreation(response){
    try {
      const r = response.clone();
      const data = await r.json();
      if ( data.id ) this.id = data.id;
      if ( data._url ) this.url = data._url;
    } catch (error) {
      this.creationError = error;
    }
  }
}