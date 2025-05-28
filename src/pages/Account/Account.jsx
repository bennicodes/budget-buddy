import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import SecuritySettings from "../../components/SecuritySettings/SecuritySettings";
import VerticalTabs from "../../components/VerticalTabs/VerticalTabs";
import styles from "./Account.module.css";
const tabs = [
  { label: "Profile Info", content: <ProfileInfo /> },
  { label: "Security", content: <SecuritySettings /> },
];

const Account = () => {
  return (
    <div className={styles.accountWrapper}>
      <VerticalTabs tabs={tabs} />
    </div>
  );
};

export default Account;
