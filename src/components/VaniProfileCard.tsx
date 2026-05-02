import styles from "./VaniProfileCard.module.css";

const tagPills = [
  "20+ Years In Education",
  "8,000+ Learners",
  "Speak Without Fear",
  "Clarity + Fluency + Presence",
];

export default function VaniProfileCard() {
  return (
    <div className={styles.wrapper}>
      <article className={styles.card} aria-label="Vani introduction">
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              <span className={styles.paragraphLead}>Hi, I&apos;m Vani Sumanth.</span>
              For over two decades, I have been deeply rooted in education, training students, professionals, and institutions.
            </p>
            <p className={styles.paragraph}>
              This vision became Vani’s Voice Voyage and my C.L.E.A.R.S framework, a result-driven approach that helps learners break hesitation, overcome fear, improve pronunciation and fluency, and build a stronger personal and professional presence.
            </p>
          </div>

          <div className={styles.pills} role="list" aria-label="Vani highlights">
            {tagPills.map((pill) => (
              <span key={pill} className={styles.pill} role="listitem">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
