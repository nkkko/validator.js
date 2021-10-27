import { Fragment } from "react";
import GithubCorner from '@uiw/react-github-corners';
import MarkdownPreview from '@uiw/react-markdown-preview';
import DocumentStr from 'validator.tool/README.md';
import Header from './Header';
import Example from './Example';
import ExampleBase from './ExampleBase';
import styles from './App.module.less';

export default function App() {
  return (
    <Fragment>
      <Header />
      <div className={styles.warpper} id="example">
        <GithubCorner fixed target="__blank" zIndex={99999} href="https://github.com/jaywcjlove/validator.js" />
        <ExampleBase />
        <Example />
        <MarkdownPreview source={DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      </div>
    </Fragment>
  );
}