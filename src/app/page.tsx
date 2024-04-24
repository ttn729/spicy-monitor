import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Logo: Spicy Monitor</p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Login</p>
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <h1>Spicy Monitor</h1>
        <div className={styles.description}>
          <Link key="myClassTracker" href="/TrackerGrid">
            <p>My Class Tracker</p>
          </Link>
        </div>
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
