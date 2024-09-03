import WeatherDisplay from "./components/weatherDisplay";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Toronto Weather Forecast</h1>
      <WeatherDisplay />
    </main>
  );
}
