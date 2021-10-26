/**
 * @jest-environment jsdom
 */
import Validator from '../src';

it('validator.tool', async () => {
  const validator = new Validator();
  expect(validator.message('email', 'kennyiseeyou@gmail.com')).toBeUndefined();
  expect(validator.values.email).toEqual('kennyiseeyou@gmail.com');
  expect(validator.rules.email).toBeUndefined();
  expect(validator.messagesShown).toBeFalsy();
  expect(validator.showMessages()).toBeTruthy();
  expect(validator.messagesShown).toBeTruthy();
  expect(validator.hideMessages()).toBeFalsy();
  expect(validator.messagesShown).toBeFalsy();
  expect(validator.getValues()).toEqual({ email: 'kennyiseeyou@gmail.com' });
  expect(validator.errorMessages).toEqual({ });
  expect(validator.fieldValid('email')).toBeTruthy();
  expect(validator.getForm()).toBeUndefined();
  expect(validator.reset()).toBeUndefined();
  expect(validator.setValues({ email: 'test' })).toBeUndefined();
  expect(validator.fieldValid('email')).toBeTruthy();
  expect(validator.values.email).toEqual('test');
});

it('validator.tool options validate', async () => {
  const validator = new Validator({
    validate: (value: string) => {
      if (!/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return `The ${value} must be a valid email address.`;
      }
    }
  });
  expect(validator.message('email', 'kennyiseeyougmail.com')).toBeUndefined();
  expect(validator.errorMessages.email).toEqual('The kennyiseeyougmail.com must be a valid email address.');
  expect(validator.message('email', 'kennyiseeyougmail.com', {
    validate: (val: string) => `Hi! ${val}.`
  })).toBeUndefined();
  expect(validator.errorMessages.email).toEqual('Hi! kennyiseeyougmail.com.');
  expect(validator.setValues({ email: 'test' })).toBeUndefined();
  expect(validator.fieldValid('email')).toBeFalsy();
});

it('validator.tool options', async () => {
  const validator = new Validator({
    rules: {
      email: {
        validate: (val: string) => /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? '' : `The ${val} must be a valid email address.`
      },
    }
  });
  expect(validator.message('email', 'gmail.com')).toBeUndefined();
  expect(validator.errorMessages).toEqual({
    'email': 'The gmail.com must be a valid email address.'
  });
  expect(Object.keys(validator.rules.email!)).toEqual(['validate']);
  expect(validator.fields.email).toBeFalsy();
  expect(validator.fieldValid('email')).toBeFalsy();
  expect(validator.allValid()).toBeFalsy();
  expect(validator.message('email', 'hello@gmail.com')).toBeUndefined();
  expect(validator.fieldValid('email')).toBeTruthy();
  expect(validator.allValid()).toBeTruthy();
  expect(validator.values.email).toEqual('hello@gmail.com');
});

it('validator.tool form options', async () => {
  document.body.innerHTML = `
<form id="data">
  <div>
    <label for="email">EMail:</label>
    <input type="email" name="email" />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" name="password" />
  </div>
  <div>
    <label for="repassword">Confirm Password:</label>
    <input type="repassword" name="repassword" />
  </div>
  <div>
    <label for="select">Select:</label>
    <select name="select" defaultValue="2">
      <option value="1">value 1</option>
      <option value="2">value 2</option>
      <option value="3">value 3</option>
    </select>
  </div>
  <div>
    <label htmlFor="accepted">Accepted: </label>
    <label>
      <input type="checkbox" name="accepted" checked="1" /> accepted
    </label>
  </div>

  <div>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </div>
</form>
  `;
  const validator = new Validator({
    form: (document.forms as unknown as HTMLFormElement).data,
    rules: {
      email: {
        validate: (val) => val ? '' : 'Required!'
      },
      repassword: {
        validate: (val, { password }: any) => {
          return password !== val ? 'The passwords are not the same!' : '';
        }
      },
    }
  });
  expect(validator.fields).toEqual({ email: false, password: true, repassword: true, select: true, accepted: true });
  expect(validator.getValues()).toEqual({
    email: undefined,
    password: undefined,
    repassword: undefined,
    select: undefined,
    accepted: undefined
  });
  expect(validator.errorMessages).toEqual({ email: 'Required!' });
  expect(validator.allValid()).toBeFalsy();
  expect(validator.showMessages()).toBeTruthy();
  expect(validator.message('email', 'hello@gmail.com')).toBeUndefined();
  expect(validator.allValid()).toBeTruthy();
  expect(typeof validator.reset()).toEqual('object');
  // expect(validator.setValues({ email: 'test' })).toBeUndefined();
  // expect(validator.fieldValid('email')).toBeFalsy();
});