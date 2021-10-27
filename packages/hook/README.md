@validator.tool/hook
===

[![Build & Deploy](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@validator.tool/hook)](https://bundlephobia.com/package/@validator.tool/hook)
[![npm version](https://img.shields.io/npm/v/@validator.tool/hook.svg)](https://www.npmjs.com/package/@validator.tool/hook)
[![Coverage Status](https://jaywcjlove.github.io/validator.js/coverage/badges.svg)](https://jaywcjlove.github.io/validator.js/coverage/lcov-report)

Hooks for use with `validator.tool`.

## Install

```bash
$ npm install @validator.tool/hook --save
```

## Usage

```jsx
import { useEffect, useState, Fragment } from 'react';
import { useValidator } from '@validator.tool/hook';

export default function Demo() {
  const { validator, forceUpdate } = useValidator({});
  const [data, setData] = useState({
    email: 'kennyiseeyou@gmail.com'
  });

  useEffect(() => {
    if (!validator.initValues) {
      validator.initValues = { ...data };
    }
  }, []);

  function handleSubmit(evn) {
    evn && evn.preventDefault();
    validator.showMessages();
    forceUpdate();
  }

  function handleReset() {
    validator.hideMessages();
    const v = validator.reset();
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
        <span>
          {validator.message('email', data.email, {
            validate: (val) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </span>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <span>
          {validator.message('password', data.password, {
            validate: (val) => !val ? 'Please enter the password!' : ''
          })}
        </span>
      </div>
      <div style={{ width: '100%' }}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
```

## Related

- [validator.tool](https://github.com/jaywcjlove/validator.js) Lightweight JavaScript form validation, that had minimal configuration and felt natural to use.

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
