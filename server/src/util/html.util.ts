import { Injectable } from '@nestjs/common';

@Injectable()
export class HtmlUtil {
  /**
   * Purge HTML tags from a string
   * @param html HTML string
   * @returns HTML string without HTML tags
   */
  purgeHtml(html: string) {
    const regex = /(<([^>]+)>)/gi as RegExp;
    return html.replace(regex, '');
  }
}
