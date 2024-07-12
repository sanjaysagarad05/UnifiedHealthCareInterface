import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { Link } from 'react-router-dom';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/doctor/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
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

  const handleLinkClick = (url) => {
    console.log("Button clicked!");
    const newTab = window.open(url, "_blank");
    newTab.focus();
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record) => <span >{record._id}</span>
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.userInfo.phoneNumber}</span>,
    },
    {
      title: "Patient Account Address",
      dataIndex: "key",
      render: (text, record) => (
      <span>
        {record.userInfo.account}
        <p></p>
           <button
              className="clipboard"
              onClick={() => copyToClipboard(record.userInfo.account)}
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
              {isCopied ? "Copied!" : "Copy to clipbord"}
            </button>
      </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments.map(appointment => ({ ...appointment, key: appointment._id }))} />
      <button
            className="record-btn"
            onClick={() => handleLinkClick("http://localhost:3001/doctordisplay")}
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
            Patient Records
          </button>

    </Layout>
  );
}

export default DoctorAppointments;
