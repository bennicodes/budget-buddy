import { category_options } from "../../data/constants/categories";
import Button from "../Button/Button";
import styles from "./CategoryTabs.module.css";

const CategoryTabs = ({ selectedCategory, setSelectedCategory, expenses }) => {
  // Extract unique categories dynamically
  const uniqueCategories = Array.from(
    new Set(expenses.map((expense) => expense.category))
  );
  // Include 'All' as the default
  const categories = ["All", ...category_options];

  return (
    <div className={styles.tabs}>
      {categories.map((category) => {
        const capitalizedCategory =
          category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <Button
            key={category}
            className={`${styles.tab} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {capitalizedCategory}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
