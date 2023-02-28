/**
 * @class RTUtils
 * @classdesc Class for utility methods
 */
export default class RTUtils {

  /**
   * @method formatContent
   * @description Formats content for use in ticket body/comment
   * @param {Object|String|Array} newContent - Content to format
   * @param {String} existingContent - If ticket body/comment already has content
   * @param {Boolean} addNewLine - Add leading new line if existing content
   * @param {String} contentType - text/html or text/plain
   * @returns {String}
   */
  static formatContent(newContent, existingContent='', addNewLine=true, contentType='text/html'){
    let out = '';
    const lb = contentType == 'text/html' ? '<br>' : "\n";
    const isHtml = contentType === 'text/html'; 
    if ( existingContent && addNewLine ){
      out += lb;
    }
    if ( typeof newContent === 'string' ) {
      out += newContent;
    } else if ( Array.isArray(newContent) ){
      out += newContent.join(', ');
    } else if ( typeof newContent === 'object' && newContent !== null ) {
      for (const k of Object.keys(newContent) ) {
        let v = newContent[k];
        if ( isHtml ) {
          out += `<b>${k}</b>`;
        } else {
          out += k;
        }
        out += ': ';
        if ( typeof v === 'string' ) {
          out += v;
        } else if (Array.isArray(v)){
          out += v.join(', ');
        } else if (typeof content === 'object') {
          out += JSON.stringify(v);
        }
        out += lb;
      }
    }
    return out;
  }
}