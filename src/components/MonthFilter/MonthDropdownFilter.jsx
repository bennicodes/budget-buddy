import styles from "./MonthDropdownFilter.module.css";

const MonthDropdownFilter = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    { label: "All", value: 0 },
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
    <div className={styles.dropdownContainer}>
      <label htmlFor="monthFilter" className={styles.label}>
        Filter by Month:
      </label>
      <select
        id="monthFilter"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className={styles.selectDropdown}
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

export default MonthDropdownFilter;
