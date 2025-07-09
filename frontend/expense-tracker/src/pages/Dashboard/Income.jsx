import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPaths.js'
import Modal from '../../components/Modal.jsx'
import AddIncomeForm from '../../components/Income/AddIncomeForm.jsx'
import IncomeList from '../../components/Income/IncomeList.jsx';
import DeleteAlert from '../../components/DeleteAlert.jsx';
import { useUserAuth } from '../../hooks/useUserAuth';
import Spinner from '../../components/Loader/Spinner.jsx';


const Income = () => {
  useUserAuth();

  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false); 

  // get all income details
  const fetchIncomeDetails = async ()=>{
      if(loading) return;

      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.INCOME.GET_ALL_INCOME}`
        );
        if(response.data){
          setIncomeData(response.data); 
        }

      } catch (error) {
         console.log("Something Went wrong. Please try again",error);
      }finally{
        setLoading(false);
      }
  };

  // handle add income 
  const handleAddIncome = async(income)=>{
    const {source,amount,date,icon}=income;

    // validation checks
    if(!source.trim()){
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModel(false);
      toast.success("Income added succesfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error Adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // delete income
  const deleteIncome = async (id)=>{
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Income details deleted succesfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
      
    }

  };

  // handle downloaded income details
  const handleDownloadIncomeDetails = async ()=>{
        try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob"
        }
      );

      // create url for the blob

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href=url;
        link.setAttribute("download","income_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error dowmloading income details:", error);
        toast.error("Failed to download income  details. Please Try again");
        
    }
  };

  useEffect(()=>{
    fetchIncomeDetails();
  },[]);

  if (loading) return <Spinner />;

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview  
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModel(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id)=>{setOpenDeleteAlert({show:true, data:id});
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModel}
          onClose={()=>setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show:false,data:null})}
          title="Delete Income"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this income details?"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income