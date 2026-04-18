import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if(role && user.role !== role){
    return <Navigate to="/" />
  }

  return children;
};

export default Protected;
