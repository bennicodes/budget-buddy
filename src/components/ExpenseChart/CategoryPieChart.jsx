import styles from "./CategoryPieChart.module.css";

const CategoryPieChart = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return <p>No data to display.</p>;

  // Count number of expenses per category
  const categoryCounts = expenses.reduce((categoryCounts, expense) => {
    categoryCounts[expense.category] =
      (categoryCounts[expense.category] || 0) + 1;
    return categoryCounts;
  }, {});

  // Total number of expenses
  const total = expenses.length;

  // Generate pie slices as conic-gradient segments
  const categories = Object.entries(categoryCounts);
  let currentAngle = 0;
  const colorMap = {};
  const pieSegments = [];
  const legendData = [];
  const colors = [
    "#ff6384",
    "#36a2eb",
    "#ffcd56",
    "#4bc0c0",
    "#9966ff",
    "#ff9f40",
  ];

  categories.forEach(([category, count], index) => {
    const percentage = (count / total) * 100;
    const startAngle = currentAngle;
    const endAngle = currentAngle + percentage * 3.6;
    currentAngle = endAngle;

    const color = colors[index % colors.length];
    colorMap[category] = color;

    pieSegments.push(`${color} ${startAngle}deg ${endAngle}deg`);
    legendData.push({
      category,
      percentage: percentage.toFixed(1),
      color,
    });
  });

  const pieStyle = {
    background: `conic-gradient(${pieSegments.join(", ")})`,
  };

  return (
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
    // <div className={styles.wrapper}>
    // </div>
  );
};

export default CategoryPieChart;
