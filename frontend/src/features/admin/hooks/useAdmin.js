import { getAllSalesUsers, updateRole, uploadExcel } from "../services/admin.api";
import { useDispatch } from "react-redux";
import { setLoading, setError,setUploadStatus,setSalesUser } from "../states/admin.sclice";

export const useAdmin = () => {
  const dispatch = useDispatch();

  const handleUpload = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await uploadExcel(formData);
      dispatch(setLoading(false));
      dispatch(setError(null));
      dispatch(setUploadStatus(response.message));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
      dispatch(setUploadStatus(error.message));
    }
  };

  const handleAllSalesUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllSalesUsers();
      dispatch(setSalesUser(response.users));
    
      dispatch(setLoading(false));
      dispatch(setError(null));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
      dispatch(setSalesUser(null));
    }
  };

  const handleUpdateRole = async (role) => {
    try {
      dispatch(setLoading(true));
      const response = await updateRole(role);
      dispatch(setLoading(false));
      dispatch(setError(null));
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  };

  return { handleUpload,handleAllSalesUser,handleUpdateRole };
};

