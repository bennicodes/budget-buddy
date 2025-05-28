import { useEffect, useState } from "react";
import styles from "./CategoryPieChart.module.css";

const CategoryPieChart = ({ expenses }) => {
  const [message, setMessage] = useState("");
  const [pieStyle, setPieStyle] = useState({});
  const [legendData, setLegendData] = useState([]);

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      setMessage("No data to display.");
      setPieStyle({});
      setLegendData([]);
      return;
    }

    setMessage(""); // Clear any previous message

    // Count expenses by category
    const categoryCounts = expenses.reduce((counts, expense) => {
      counts[expense.category] = (counts[expense.category] || 0) + 1;
      return counts;
    }, {});

    const total = expenses.length;
    const categories = Object.entries(categoryCounts);

    let currentAngle = 0;
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
      const endAngle = currentAngle + percentage * 3.6;
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
    setLegendData(legend);
  }, [expenses]);

  return (
    <>
      {message ? (
        <p className={styles.message}>{message}</p>
      ) : (
        <>
          <div className={styles.pie} style={pieStyle}></div>
          <ul className={styles.list}>
            {legendData.map(({ category, percentage, color }) => (
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
        </>
      )}
    </>
  );
};

export default CategoryPieChart;
