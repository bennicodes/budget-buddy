import { useState } from "react";
import styles from "./VerticalTabs.module.css";

const VerticalTabs = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.tabsWrapper}>
      {/* Tabs sidebar */}
      <div className={styles.tabList}>
        {tabs.map((tab, index) => (
          <div
            className={`${styles.tabItem} ${
              activeIndex === index ? styles.activeTab : ""
            }`}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {/* Active tab content */}
      <div className={styles.tabContent}>{tabs[activeIndex]?.content}</div>
    </div>
  );
};

export default VerticalTabs;
