import styles from "./SortByMonth.module.css";

const SortByMonth = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    { label: "All", value: "" },
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];
  return (
    <div className={styles.dropdownWrapper}>
      <label htmlFor="monthFilter" className={styles.label}>
        Filter by Month:
      </label>
      <select
        id="monthFilter"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className={styles.monthDropdown}
        aria-label="Select month to filter expenses"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortByMonth;
