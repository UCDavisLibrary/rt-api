import fetch from 'node-fetch';

/**
 * @class RT
 * @classdesc Primary class for interacting with the RT API
 * @property {string} [host=https://rt.lib.ucdavis.edu] - RT Host
 * @property {string} [path=REST/2.0] - Base path of API
 * @property {string} token - RT API access token
 */
export default class RT {

  /**
   * @param {string|Object} config - API Token or a config object. 
   * Object can contain host, path, and token properties
   * @description Constructor
   */
  constructor(config){
    this.host = 'https://rt.lib.ucdavis.edu';
    this.path = 'REST/2.0';
    this.token = '';
    this.basicAuth = '';
    if ( !config ) return;
    if ( typeof config === 'string' ) {
      this.token = config;
    } else {
      if ( typeof config.token === 'string' ){
        this.token = config.token;
      }
      if ( typeof config.host === 'string' ){
        this.host = config.host;
      }
      if ( typeof config.path === 'string' ){
        this.path = config.path;
      }
      if ( typeof config.basicAuth === 'string' ){
        this.basicAuth = config.basicAuth;
      }
    }
    this.endpoints = {
      ticket: 'ticket',
      reply: 'correspond',
      comment: 'comment'
    };
  }

  /**
   * @method testConnection
   * @description Throws error if can't connect to RT
   * 
   * @returns {boolean}
   */
  async testConnection(){
    ['token', 'host', 'path'].forEach(d => {
      if ( !eval(`this.${d}`) ) {
        throw new Error(`'${d}' config property is missing.`);
      }
    });
    const response = await this._fetch();
    if ( response.status == '403' ){
      throw new Error('Access is IP restricted.');
    } else if ( response.status == '401' ){
      throw new Error('Your API token is not valid');
    }
    return true;
  }

  /**
   * @method createTicket
   * @description Sends request to RT to create a ticket
   * @param {RTTicket} ticket - a hydrated ticket class instance.
   * @returns {Response}
   */
  async createTicket(ticket){
    if ( !ticket ) {
      throw new Error('Pass a ticket as an arg');
    }
    let url = `${this.host}/${this.path}/${this.endpoints['ticket']}`;
    let kwargs = {
      method: 'post', 
      body: JSON.stringify(ticket.makePayload()),
      headers: {'Content-Type': 'application/json'}
    };
    const response = await this._fetch(url, kwargs);
    await ticket._onCreation(response);
    return response;
  }

  /**
   * @method sendCorrespondence
   * @description Sends request to RT to add correspondence to a ticket
   * @param {RTCorrespondence} correspondence - An RTCorrespondence class instance
   */
  async sendCorrespondence(correspondence){
    if ( !correspondence ) {
      throw new Error('Pass RTCorrespondence class as an arg');
    }
    let url;
    if ( correspondence.ticketUrl ) {
      url = `${correspondence.ticketUrl}/${this.endpoints[correspondence.type]}`;
    } else {
      url = `${this.host}/${this.path}/${this.endpoints.ticket}/${correspondence.ticketId}/${this.endpoints[correspondence.type]}`;
    }
    let kwargs = {
      method: 'post', 
      body: JSON.stringify(correspondence.makePayload()),
      headers: {'Content-Type': 'application/json'}
    };
    const response = await this._fetch(url, kwargs);
    return response;
  }

  /**
   * @method _fetch
   * @private
   * @description Adds boiler plate to fetch calls
   * @param  {...any} args Same args as node-fetch
   * @returns {Response}
   */
  async _fetch(...args){
    let url = args[0];
    let kwargs = args.length >=2 ? args[1] : {};
    if ( !kwargs.headers ) {
      kwargs.headers = {};
    }
    if ( this.basicAuth ){
      kwargs.headers.Authorization = `Basic ${Buffer.from(this.basicAuth).toString('base64')}`;
    } else {
      kwargs.headers.Authorization = `token ${this.token}`;
    }
    
    const response = await fetch(url, kwargs);
    return response;
  }
}