import { redirect } from "next/navigation";

const DashboardPage: React.FC = () => {
  redirect("/adminaccess/dashboard")
  return null;
};

export default DashboardPage;
