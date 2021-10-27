validator.js
===

<!--dividing-->

[![Build & Deploy](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml)
![No Dependencies](http://jaywcjlove.github.io/sb/status/no-dependencies.svg)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/validator.tool)](https://bundlephobia.com/package/validator.tool)
[![Coverage Status](https://jaywcjlove.github.io/validator.js/coverage/badges.svg)](https://jaywcjlove.github.io/validator.js/coverage/lcov-report)

Lightweight JavaScript form validation, that had minimal configuration and felt natural to use. No dependencies, support UMD.

> ⚠️ The [`v1`](https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html) version document preview is [here](https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html).

[Install](#install) · [Usage](#usage) · [API](#api) · [npm](http://npm.im/validator.tool) · [License](#license)

## Install

```bash
$ npm install validator.tool --save
```

## Usage

```js
import Validator from 'validator.tool';
```

### Used in the React App

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/wonderful-andras-dbzbz?fontsize=14&hidenavigation=1&theme=dark)

```jsx
import { useRef, useState } from 'react';
import Validator from 'validator.tool';

function Demo() {
  const validator = useRef(new Validator({
    validate: (value, values, field) => {
      if (field === 'password' && !value) {
        return 'Required!';
      }
    }
  }));
  const [data, setData] = useState({
    email: 'kennyiseeyou@gmail.com'
  });
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (!validator.current.initValues) {
      validator.current.initValues = data;
    }
  }, []);

  function handleSubmit(evn) {
    evn && evn.preventDefault();
    validator.current.showMessages();
    forceUpdate(1);
  }

  function handleReset() {
    validator.current.hideMessages();
    const v = validator.current.reset();
    setData({ ...v });
  }

  function handleChange(env) {
    const target = env.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} onChange={handleChange}>
      <div>
        <label htmlFor="email">EMail:</label>
        <input type="email" name="email" defaultValue={data.email} />
        <p>
          {validator.current.message('email', data.email, {
            validate: (val) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <p>
          {validator.current.message('password', data.password)}
        </p>
      </div>
      <div>
        <label htmlFor="repassword">Confirm Password:</label>
        <input type="repassword" name="repassword" />
        <p>
          {validator.current.message('repassword', data.repassword)}
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

### Used in the React Native App

You need to wrap validator with `<Text>` Element.

[![](https://img.shields.io/badge/style-Expo-green?label=Open%20In&logo=expo&style=flat&color=#333)](https://snack.expo.dev/@jaywcjlove/validatorjs-test)

```jsx
import React, { useRef } from 'react';
import { Text, View, Button } from 'react-native';
import Validator from 'validator.tool';

const WelcomeScreen = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [, forceUpdate] = React.useState();
  const validator = useRef(new Validator({
    validate: (value, values, field) => {
      if (field === 'username' && value.length > 3) {
        return 'Required!';
      }
    },
  }));

  return (
    <View>
      <TextInput onChangeText={onChangeText} value={text} />
      <Text>
        {validator.current.message('username', text)}
      </Text>
      <Button
        onPress={() => {
          validator.current.showMessages();
          forceUpdate(1);
        }}
        title="Submit"
        color="#841584"
      />
    </View>
  );
};
```

### Used in the browser client

Refer to the [`validator.min.js`](https://unpkg.com/validator.tool/) file in the application, manually download and link [validator.min.js](https://github.com/jaywcjlove/validator.js/tree/master/packages/core/dist) in HTML.

```html
<script type="text/javascript" src="dist/validator.min.js"></script>
```

It can also be downloaded via [UNPKG](https://unpkg.com/validator.tool/):

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/quirky-bohr-m75fx?fontsize=14&theme=dark)

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
      validate: (val) => val ? '' : 'Required!',
    },
    password: {
      // validate: (val) => val < 5 || val > 15 ? '字数大于5，小于15' : ''
    },
    repassword: {
      validate: (val) => !val ? 'Required!' : '',
    },
  }
});

validator.form.onsubmit = (evn) => {
  evn.preventDefault();
  const values = validator.getValues();
  console.log(values);
}

validator.form.onreset = (evn) => {
  const data = validator.reset();
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
export interface RulesOption {
  /** Validate the form's values with function. */
  validate?(value?: Value, values?: Validator['values'], field?: string): string;
}
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
  setValues: (values?: Values) => void;
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