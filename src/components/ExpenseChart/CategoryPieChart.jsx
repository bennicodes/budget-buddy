import { useEffect, useState } from "react";
import styles from "./CategoryPieChart.module.css";

const CategoryPieChart = ({ expenses }) => {
  const [message, setMessage] = useState("");
  const [pieStyle, setPieStyle] = useState({});
  const [categoryData, setCategoryData] = useState([]);

  // Handle no data scenario
  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      setMessage("No data to display.");
      setPieStyle({});
      setCategoryData([]);
      return;
    }

    setMessage(""); // Clear any previous message

    // Count number of expenses per category
    const categoryCounts = expenses.reduce((counts, expense) => {
      counts[expense.category] = (counts[expense.category] || 0) + 1;
      return counts;
    }, {});

    const total = expenses.length;
    const categories = Object.entries(categoryCounts);

    let currentAngle = 0; //start angle for pie segments
    const colors = [
      "#ff6384",
      "#36a2eb",
      "#ffcd56",
      "#4bc0c0",
      "#9966ff",
      "#ff9f40",
    ];

    const pieSegments = [];
    const legend = [];

    categories.forEach(([category, count], index) => {
      const percentage = (count / total) * 100;
      const startAngle = currentAngle;
      const endAngle = currentAngle + percentage * 3.6; // Convert to degrees
      currentAngle = endAngle;

      const color = colors[index % colors.length];

      pieSegments.push(`${color} ${startAngle}deg ${endAngle}deg`);
      legend.push({
        category,
        percentage: percentage.toFixed(1),
        color,
      });
    });

    setPieStyle({
      background: `conic-gradient(${pieSegments.join(", ")})`,
    });
    setCategoryData(legend);
  }, [expenses]);

  return (
    <div className={styles.pieChartWrapper}>
      {message ? (
        <p className={styles.message}>{message}</p>
      ) : (
        <div className={styles.pieChart}>
          <div className={styles.pie} style={pieStyle}></div>
          <ul className={styles.list}>
            {categoryData.map(({ category, percentage, color }) => (
              <li key={category}>
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: color }}
                ></span>
                {category.charAt(0).toUpperCase() + category.slice(1)} –{" "}
                {percentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
      {categoryData.length > 0 && (
        <p className={styles.description}>
          This chart shows how many expenses fall under each category.
        </p>
      )}
    </div>
  );
};

export default CategoryPieChart;
