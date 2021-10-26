validator.js
===

<!--dividing-->

[![Build Status](https://travis-ci.org/jaywcjlove/validator.js.svg?branch=master)](https://travis-ci.org/jaywcjlove/validator.js)
![No Dependencies](http://jaywcjlove.github.io/sb/status/no-dependencies.svg)
[![Get this with npm](https://jaywcjlove.github.io/sb/ico/npm.svg)](https://www.npmjs.com/package/validator.tool)

Lightweight JavaScript form validation, that had minimal configuration and felt natural to use. No dependencies, support UMD.

> ⚠️ The [`v1`](https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html) version document preview is [here](https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html).

[Install](#install) · [Usage](#usage) · [API](#api) · [options](#options) · [npm](http://npm.im/svgtofont) · [License](#license)

## Install

```bash
$ npm install validator.tool --save
```

## Usage

```js
import Validator from 'validator.tool';
```

### Used in the React App

```jsx
import React, { useRef } from 'react';
import Validator from 'validator.tool';

function Demo() {
  const validator = useRef(new Validator());
  const [data, setData] = useState({});
  return (
    <form>
      <div>
        <label for="email">EMail:</label>
        <input type="email" name="email" />
        <p>
          {validator.current.message('email', data.email, {
            validation: (val) => /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </p>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" name="password" />
        <p>
          {validator.current.message('password', data.password, {
            validation: (val) => {}
          })}
        </p>
      </div>
      <div>
        <label for="repassword">Confirm Password:</label>
        <input type="repassword" name="repassword" />
        <p>
          {validator.current.message('password', data.password, {
            validation: (val, field) => {}
          })}
        </p>
      </div>
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
```

### Used in the browser client

Refer to the [`validator.min.js`](https://unpkg.com/validator.tool/) file in the application, manually download and link [validator.min.js](https://github.com/jaywcjlove/validator.js/tree/master/packages/core/dist) in HTML.

```html
<script type="text/javascript" src="dist/validator.min.js"></script>
```

It can also be downloaded via [UNPKG](https://unpkg.com/validator.tool/):

```html
<form id="form">
  <div>
    <label for="email">EMail:</label>
    <input type="email" name="email" placeholder="" />
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
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </div>
</form>
<script type="text/javascript" src="https://unpkg.com/validator.tool/dist/validator.min.js"></script>
<script type="text/javascript">
var validator = new Validator({
  form: document.getElementById('form'),
  rules: {
    email: {
      validation: (val) => val ? '' : 'Required!',
    },
    password: {
      // validation: (val) => val < 5 || val > 15 ? '字数大于5，小于15' : ''
    },
    repassword: {
      validation: (val) => !val ? 'Required!' : '',
    },
  }
});

validator.form.onsubmit = (evn) => {
  evn.preventDefault();
  const values = validator.getValues();
  console.log(values);
}

validator.form.onreset = (evn) => {
  const data = validator.current.reset();
  console.log(data);
}
</script>
```

## API

```ts
export declare type Value = (number | FormDataEntryValue)[] | number | boolean | null | FormDataEntryValue;
export declare type Values = Partial<Record<string, Value>>;
export declare type Fields = Partial<Record<string, boolean>>;
export declare type Rules = Partial<Record<string, RulesOption>>;
export declare type RulesOption = {
  /** Validate the form's values with function. */
  validate(value?: Value, values?: Validator['values'], field?: string): string | undefined;
};
export declare type ValidatorOption = {
  messagesShown?: boolean;
  rules?: Rules;
  form?: HTMLFormElement | null;
  validate?: RulesOption['validate'];
};
export default class Validator {
  constructor(options?: ValidatorOption);
  validate?: RulesOption['validate'];
  form?: HTMLFormElement | null;
  fields: Fields;
  rules: Rules;
  values: Values;
  initValues?: Values;
  messagesShown: boolean;
  errorMessages: Partial<Record<string, string>>;
  showMessages: () => boolean;
  hideMessages: () => boolean;
  getForm: () => HTMLFormElement | null | undefined;
  setForm: (form: HTMLFormElement) => void;
  /** How you define validation rules and add messages into the form. */
  message: (field: string, inputValue?: Value | undefined, options?: RulesOption | undefined) => string | undefined;
  getValues: () => Partial<Record<string, Value>>;
  reset: () => Partial<Record<string, Value>> | undefined;
  fieldValid: (field: string) => boolean;
  /**
   * Returns a boolean if all the fields pass validation or not.
   * @returns Boolean
   */
  allValid(): boolean;
}
```

## Related

- [chriso/validator.js](https://github.com/chriso/validator.js) String validation
- [rickharrison/validate.js](https://github.com/rickharrison/validate.js) Lightweight JavaScript form validation library inspired by CodeIgniter.

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).