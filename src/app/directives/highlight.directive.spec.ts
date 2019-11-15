import { HighlightDirective } from './highlight.directive';
import {RouterTestingModule} from '@angular/router/testing';
describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightDirective();
    expect(directive).toBeTruthy();
  });
});
