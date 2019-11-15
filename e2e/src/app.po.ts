import { browser, by, element } from 'protractor';

export class AppPage {
  /* navigateTo() {
    return browser.get(browser.baseURL) as Promise<any>;
  } */
  navigateTo(link: string) {
    return browser.get(link);
  }
  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }
  getElement(selector: string) {
    return element(by.css(selector));
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }
  /* getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  } */
}
