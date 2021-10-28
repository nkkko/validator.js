import { Fragment } from "react";
import GithubCorner from '@uiw/react-github-corners';
import MarkdownPreview from '@uiw/react-markdown-preview';
import DocumentStr from 'validator.tool/README.md';
import Header from './Header';
import Example from './Example';
import ExampleBase from './ExampleBase';
import ExampleHook from './ExampleHook';
import styles from './App.module.less';

export default function App() {
  return (
    <Fragment>
      <Header />
      <div className={styles.warpper} id="example">
        <GithubCorner fixed target="__blank" zIndex={99999} href="https://github.com/jaywcjlove/validator.js" />
        <ExampleHook />
        <ExampleBase />
        <Example />
      </div>
      <div id="document">
        <MarkdownPreview className={styles.warpper} source={DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      </div>
    </Fragment>
  );
}