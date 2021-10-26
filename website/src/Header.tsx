import styles from './Header.module.less';

// @ts-ignore
const version = VERSION;

export default function() {
  return (
    <table className={styles.header}>
      <tbody>
        <tr>
          <td>
            <div className={styles.nav}>
              <a href="#validatorjs">Document</a>
              <a href="#example">Example</a>
              <a target="_blank" href="https://github.com/jaywcjlove/validator.js">Source Code</a>
              <a target="_blank" href="https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html">v1</a>
            </div>
            <div className={styles.warpper}>
              <div className={styles.name}>
                <div className={styles.loader}>
                  <span>V</span>
                  <span className={styles.span2}>a</span>
                  <span className={styles.span3}>l</span>
                  <span className={styles.span4}>i</span>
                  <span className={styles.span5}>d</span>
                  <span className={styles.span6}>a</span>
                  <span className={styles.span7}>t</span>
                  <span className={styles.span1}>o</span>
                  <span className={styles.span2}>r</span>
                  <span className={styles.span3}>.</span>
                  <span className={styles.span4}>j</span>
                  <span className={styles.span5}>s</span>
                  <p>v{version}</p>
                </div>
              </div>
              <div className={styles.desc}>
                <span>Lightweight JavaScript form validation, string validation. No dependencies, support UMD.</span>
              </div>
              <div className={styles.goto}>
                <a href="#install">Get Started</a>
              </div>
            </div>
            <a href="#example" className={styles.arrow}></a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}