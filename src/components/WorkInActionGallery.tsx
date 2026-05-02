import Image from "next/image";
import styles from "./WorkInActionGallery.module.css";

const workMoments = [
  {
    src: "/work/work-classroom-focus.jpg",
    alt: "Learners actively participating during a communication training session.",
    title: "Classroom Focus",
    detail: "Structured practice rounds for confidence and fluency.",
    areaClass: styles.classroom,
  },
  {
    src: "/work/work-live-coaching.jpg",
    alt: "Vani leading a live body-language coaching session.",
    title: "Live Coaching",
    detail: "Real-time feedback on body language and executive presence.",
    areaClass: styles.coaching,
  },
  {
    src: "/work/work-panel-session.jpg",
    alt: "Panel session at an institutional event focused on careers and communication.",
    title: "Institution Sessions",
    detail: "Career catalyst programs delivered with campus leaders.",
    areaClass: styles.panel,
  },
  {
    src: "/work/work-group-breakthrough.jpg",
    alt: "Group photo with learners after completing a training program.",
    title: "Learner Outcomes",
    detail: "Every batch ends with visible confidence and stronger voice presence.",
    areaClass: styles.group,
  },
];

export default function WorkInActionGallery() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {workMoments.map((moment) => (
          <figure key={moment.src} className={`${styles.card} ${moment.areaClass}`}>
            <Image
              src={moment.src}
              alt={moment.alt}
              fill
              sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
            <figcaption className={styles.caption}>
              <p className={styles.title}>{moment.title}</p>
              <p className={styles.detail}>{moment.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
