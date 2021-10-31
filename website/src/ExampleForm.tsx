import { Fragment, useEffect, useRef, useState } from 'react';
import Validator from 'validator.tool';
import styles from './App.module.less';

export default function Example() {
  const form = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<any>();
  const [errorMessages, setErrorMessages] = useState<any>();
  const validator = useRef(new Validator({
    form: form.current,
    rules: {
      required: {
        validate: (val) => val ? '' : 'Required!'
      },
      alphanumeric: {
        validate: (val: number) => val < 5 || val > 15 ? 'Number < 5 or Number > 15!' : ''
      },
      accepted: {
        validate: (val: boolean) => !val ? 'Accepted Required!' : ''
      },
    }
  }));
  useEffect(() => {
    if (form.current && validator.current) {
      validator.current.setForm(form.current);
    }
    if (validator.current.form) {
      validator.current.form.onsubmit = (evn) => {
        evn.preventDefault();
        setData(validator.current.getValues());
        setErrorMessages(validator.current.errorMessages);
      }
      validator.current.form.onreset = (evn) => {
        const data = validator.current.reset();
        setData({ ...data });
        setErrorMessages(undefined)
      }
    }
  }, []);

  return (
    <Fragment>
      <h2 className={styles.title}>HTML Form Usage <a href="https://github.com/jaywcjlove/validator.js/blob/master/website/src/ExampleForm.tsx" target="_blank">Example</a></h2>
      <form id="form" className={styles.form} ref={form}>
        <div className={styles.group}>
          <label htmlFor="required">Required: </label>
          <input type="text" name="required" className={styles.control} placeholder="Required" />
        </div>

        <div className={styles.group}>
          <label htmlFor="alphanumeric">Alphanumeric: </label>
          <input type="number" name="alphanumeric" className={styles.control} placeholder="Number < 5 or Number > 15" />
        </div>

        <div className={styles.group}>
          <label htmlFor="select">Select: </label>
          <select name="select" className={styles.control} defaultValue="2">
            <option value="1">value 1</option>
            <option value="2">value 2</option>
            <option value="3">value 3</option>
          </select>
        </div>

        <div className={styles.group}>
          <label htmlFor="select_multiple">Multiple Select: </label>
          <select multiple name="select_multiple" className={styles.control} defaultValue={['2', '3']}>
            <option value="1">value 1</option>
            <option value="2">value 2</option>
            <option value="3">value 3</option>
          </select>
        </div>

        <div className={styles.group}>
          <label htmlFor="radio">Radio: </label>
          <label>
            <input type="radio" name="radio" value="1" /> Value 1
          </label>
          &nbsp;
          <label>
            <input type="radio" name="radio" value="2" /> Value 2
          </label>
        </div>

        <div className={styles.group}>
          <label htmlFor="checkbox">CheckBox: </label>
          <label>
            <input type="checkbox" name="checkbox" value="A" /> A
          </label>
          &nbsp;
          <label>
            <input type="checkbox" name="checkbox" value="B" /> B
          </label>
        </div>

        <div className={styles.group}>
          <label htmlFor="accepted">Accepted: </label>
          <label>
            <input type="checkbox" name="accepted" /> accepted
          </label>
        </div>

        <div className={styles.group}>
          <label htmlFor="search">Search: </label>
          <label>
            <input type="search" name="search" />
          </label>
        </div>

        <div style={{ width: '100%', paddingTop: 3 }}>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
          {data && (
            <pre style={{ padding: 5, background: '#fff', marginRight: 6, flex: 1 }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {data && errorMessages && (
            <pre style={{ padding: 5, background: '#fff' }}>
              {JSON.stringify(errorMessages, null, 2)}
            </pre>
          )}
        </div>
      </form>
    </Fragment>
  );
}