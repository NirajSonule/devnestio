import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <Button type="button" state="danger" onClick={handleClick}>
        Logout
      </Button>
      <Loading />
    </div>
  );
};

export default Dashboard;
