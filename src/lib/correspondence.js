import RTUtils from "./utils.js";

/**
 * @class RTCorrespondence
 * @classdesc Represents a ticket reply or comment
 */
export default class RTCorrespondence {
  
  /**
   * @description Constructor
   * @param {Object} data - Required propeties include:
   * - ticketId, type (reply or comment)
   * 
   * Optional values include:
   * - ticketUrl
   * - Subject
   * - Content
   * - ContentType
   */
  constructor(data={}){

    this.ticketId = data.ticketId;
    if ( !['reply', 'comment'].includes(data.type) ){
      this.type = 'reply';
    } else; {
      this.type = data.type;
    }
    this.ticketUrl = data.ticketUrl || '';
    this.subject = data.Subject || '';
    this.content = data.Content || '';
    this.contentType = data.ContentType || 'text/html';
  }

  /**
   * @method addSubject
   * @description Sets the correspondence subject
   * @param {String} subject
   */
  addSubject(subject){
    this.subject = subject;
  }

  /**
   * @method addContent
   * @description Append text to the RT correspondence body
   * @param {String|Array|Object} content
   * @param {Boolean} [addNewLine=true] - Appends content to new line.
   */
  addContent(content, addNewLine=true){
    this.content += RTUtils.formatContent(content, this.content, addNewLine, this.contentType);
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
    if ( this.content ){
      payload.Content = this.content;
      payload.ContentType = this.contentType;
    }

    return payload;
  }
}