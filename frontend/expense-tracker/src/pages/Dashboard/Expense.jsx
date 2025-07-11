import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import Spinner from '../../components/Loader/Spinner';

const Expense = () => {
  useUserAuth();
  const [expenseData,setExpenseData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  // get all income details
  const fetchExpenseDetails = async ()=>{
      if(loading) return;

      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
        );
        if(response.data){
          setExpenseData(response.data); 
        }

      } catch (error) {
         console.log("Something Went wrong. Please try again",error);
      }finally{
        setLoading(false);
      }
  };

  // handle add expense 
  const handleAddExpense = async(expense)=>{
    const {category,amount,date,icon}=expense;

    // validation checks
    if(!category.trim()){
      toast.error("Category is required.");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if(!date){
      toast.error("Date is Required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModel(false);
      toast.success("Expense added succesfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error Adding Expense:",
        error.response?.data?.message || error.message
      );
    }
  };
  // delete income
  const deleteExpense = async (id)=>{
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense details deleted succesfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting Expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails=async()=>{
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob"
        }
      );

      // create url for the blob

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href=url;
        link.setAttribute("download","expense_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error dowmloading expense details:", error);
        toast.error("Failed to download expense details. Please Try again");
        
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return ()=>{};
  }, []);

  if (loading) return <Spinner />;

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview  
              transactions={expenseData}
              onExpenseIncome={()=>setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id)=>{setOpenDeleteAlert({show:true, data:id});
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModel}
          onClose={()=>setOpenAddExpenseModel(false)}
          title="Add Income"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show:false,data:null})}
          title="Delete Expense"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this expense details?"
            onDelete={()=>deleteExpense(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  )
};

export default Expense