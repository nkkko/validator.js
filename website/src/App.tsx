import React, { Fragment, useEffect, useRef, useState } from "react";
import GithubCorner from '@uiw/react-github-corners';
import MarkdownPreview from '@uiw/react-markdown-preview';
import DocumentStr from 'validator.tool/README.md';
import Validator from 'validator.tool';
import Header from './Header';
import Example from './Example';
import styles from './App.module.less';

type Data = {
  required?: string;
  alphanumeric?: number;
  accepted?: boolean;
}

export default function App() {
  const validator = useRef(new Validator());
  const [data, setData] = useState<Data>({
    alphanumeric: 6
  });
  const [, forceUpdate] = useState<number>();

  useEffect(() => {
    if (!validator.current.initValues) {
      validator.current.initValues = { ...data };
    }
  }, []);

  function handleSubmit(evn?: React.FormEvent<HTMLFormElement>) {
    evn && evn.preventDefault();
    validator.current.showMessages();
    forceUpdate(1);
  }

  function handleReset() {
    validator.current.hideMessages();
    const dt = validator.current.reset();
    setData({ ...dt });
  }

  function handleChange(evn: any) {
    const target = evn.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }
  return (
    <Fragment>
      <Header />
      <div className={styles.warpper} id="example">
        <GithubCorner fixed target="__blank" zIndex={99999} href="https://github.com/jaywcjlove/validator.js" />
        <h2 className={styles.title}>Example in React</h2>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onReset={handleReset}
          onChange={handleChange}
        >
          <div className={styles.group}>
            <label htmlFor="req">Required: </label>
            <input type="text" name="required" className={styles.control} defaultValue={data.required} placeholder="Required" />
            <span className={styles.help}>
              {validator.current.message('required', data.required, {
                validate: (val) => val ? '' : 'Required！'
              })}
            </span>
          </div>

          <div className={styles.group}>
            <label htmlFor="alphanumeric">Alphanumeric: </label>
            <input type="number" name="alphanumeric" className={styles.control} defaultValue={data.alphanumeric} placeholder="字数大于5，小于15" />
            <span className={styles.help}>
              {validator.current.message('alphanumeric', data.alphanumeric, {
                validate: (val: number) => val < 5 || val > 15 ? '字数大于5，小于15' : ''
              })}
            </span>
          </div>

          <div className={styles.group}>
            <label htmlFor="accepted">Accepted: </label>
            <input type="checkbox" name="accepted" defaultChecked={!!data.accepted} />
            <span className={styles.help}>
              {validator.current.message('accepted', data.accepted, {
                validate: (val: boolean) => !val ? 'Required！' : ''
              })}
            </span>
          </div>

          <div style={{ width: '100%' }}>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>

        </form>
        <Example />
        <MarkdownPreview source={DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      </div>
    </Fragment>
  );
}