export default class RTTicket {
  constructor(data){
    this.subject = '';
    this.queue = '';
    this.contentType = 'text/html';
    this.content = '';
    if ( !data ) return;
    this._data = data;

    if ( data.Subject ) {
      this.subject = data.Subject;
    }
    if ( data.Queue ){
      this.queue = data.Queue;
    }
    if ( data.ContentType ){
      this.contentType = data.ContentType;
    }
    if ( data.Content ){
      this.content = data.Content;
    }
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
   * @method addQueue
   * @description Sets ticket to a queue. This is required.
   * @param {string|number} queue - Can be case-insensitive name of queue or its object ID.
   */
  addQueue(queue){
    this.queue = queue;
  }

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

    return payload;
  }
}