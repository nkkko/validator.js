import { useState, Fragment } from 'react';
import { useValidator, Values } from '@validator.tool/hook';
import styles from './App.module.less';

export default function Demo() {
  const [data, setData] = useState<any>({
    email: 'kennyiseeyou@gmail.com'
  });
  const { validator, handleReset, handleSubmit } = useValidator({
    initValues: data,
  });
  function handleChange(env: any) {
    const target = env.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }

  const onSubmit = (value: Values) => {
    console.log('value', value)
  }

  const onReset = (value: Values) => {
    setData({ ...value });
  }

  return (
    <Fragment>
      <h2 className={styles.title}>Hook Usage Example</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset(onReset)}
        onChange={handleChange}
        onBlur={handleChange}
        // onInput={handleChange}
      >
        <div className={styles.group}>
          <label htmlFor="email">EMail:</label>
          <input type="email" name="email" defaultValue={data.email} className={styles.control} />
          <span className={styles.help}>
            {validator.message('email', data.email, {
              validate: (val: string) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
            })}
          </span>
        </div>
        <div className={styles.group}>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" className={styles.control} />
          <span className={styles.help}>
            {validator.message('password', data.password, {
              validate: (val: string) => !val ? 'Please enter the password!' : ''
            })}
          </span>
        </div>
        <div className={styles.group}>
          <label htmlFor="repassword">Confirm Password:</label>
          <input type="repassword" name="repassword" className={styles.control} />
          <span className={styles.help}>
            {validator.message('repassword', data.repassword)}
          </span>
        </div>
        <div style={{ width: '100%' }}>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </Fragment>
  );
}