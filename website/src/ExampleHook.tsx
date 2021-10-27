import { useEffect, useState, Fragment } from 'react';
import { useValidator } from '@validator.tool/hook';
import styles from './App.module.less';

export default function Demo() {
  const [data, setData] = useState<any>({
    email: 'kennyiseeyou@gmail.com'
  });
  const { validator, forceUpdate } = useValidator({
    initValues: data,
  });

  function handleSubmit(evn: any) {
    evn && evn.preventDefault();
    validator.showMessages();
    forceUpdate();
  }

  function handleReset() {
    validator.hideMessages();
    const v = validator.reset();
    setData({ ...v });
  }

  function handleChange(env: any) {
    const target = env.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }

  return (
    <Fragment>
      <h2 className={styles.title}>Hook Usage Example</h2>
      <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset} onChange={handleChange}>
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