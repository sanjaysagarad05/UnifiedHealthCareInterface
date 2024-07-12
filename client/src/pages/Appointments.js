import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";



function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
      alert("Text copied to clipboard");
      setIsCopied(true);

      // Reset the "Copied!" state after a certain duration (e.g., 3 seconds)
      setTimeout(() => {
        setIsCopied(false);
        console.log("hello");
      }, 1000); // Reset to "Copy to clipboard" after 3 seconds
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  


  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber} 
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Doctor Account Address",
      dataIndex: "name",
      render: (text, record) => (
        <span>
           {record.doctorInfo.account}
           <p>  </p>
           <button
              className="clipboard"
              onClick={() => copyToClipboard(record.doctorInfo.account)}
              style={{
                backgroundColor: '#53c6e9 ',
                border: 'none',
                marginTop:'15px',
                height: '40px ',
                width: '100% ',
                color: 'white ',
                fontSize: '16px ',
                maxWidth: 'max-content ', // Fix duplicated width property
                borderRadius: '5px'
              }}
            >
              {"Copy to clipbord"}
            </button>
        </span>
      ),
    },
    {
        title: "Status",
        dataIndex: "status",
    }
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return  <Layout>
  <h1 className="page-title">Appointments</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
 
          
</Layout>
}

export default Appointments;
