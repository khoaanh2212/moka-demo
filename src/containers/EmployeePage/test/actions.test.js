/**
 * Created by kanguyen on 7/20/17.
 */
import { add } from '../actions';

describe('add actions', () => {
  it('should return valid value', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
