import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [sendAddress, setSendAddress] = useState("");

  const sharing = async () => {
    await contract.allow(sendAddress);
    setModalOpen(false);
  };

  const revoking = async () => {
    await contract.disallow(selectedAddress);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="modaltitle" style={{ fontSize: '2rem' }}>Share Access or Revoke</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter User Address"
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
            />
            <input
              type="text"
              className="address"
              placeholder="Select User Address"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
          </div>
          <form id="myForm">
            <select
              id="selectNumber"
              onChange={(e) => {
                let optionParts = e.target.value.split(",");
                setSelectedAddress(optionParts[0]);
              }}
            >
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
            <button onClick={() => revoking()}>Revoke</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;


// import { useEffect, useState } from "react";
// import "./Modal.css";

// const Modal = ({ setModalOpen, contract }) => {
//  const [selectedAddress, setSelectedAddress] = useState("");

//  const sharing = async () => {
//    await contract.allow(selectedAddress);
//    setModalOpen(false);
//  };

//  const revoking = async () => {
//    await contract.disallow(selectedAddress);
//    setModalOpen(false);
//  };

//  useEffect(() => {
//    const accessList = async () => {
//      const addressList = await contract.shareAccess();
//      let select = document.querySelector("#selectNumber");
//      const options = addressList;

//      for (let i = 0; i < options.length; i++) {
//        let opt = options[i];
//        let e1 = document.createElement("option");
//        e1.textContent = opt;
//        e1.value = opt;
//        select.appendChild(e1);
//      }
//    };
//    contract && accessList();
//  }, [contract]);

//  return (
//    <>
//      <div className="modalBackground">
//        <div className="modalContainer">
//          <div className="title">Share with</div>
//          <div className="body">
//            <input
//              type="text"
//              className="address"
//              placeholder="Enter Address"
//              value={selectedAddress}
//            ></input>
//          </div>
//          <form id="myForm">
//            <select id="selectNumber" onChange={(e) => setSelectedAddress(e.target.value)}>
//              <option className="address">People With Access</option>
//            </select>
//          </form>
//          <div className="footer">
//            <button
//              onClick={() => {
//                setModalOpen(false);
//              }}
//              id="cancelBtn"
//            >
//              Cancel
//            </button>
//            <button onClick={() => sharing()}>Share</button>
//            <button onClick={() => revoking()}>Revoke</button>
//          </div>
//        </div>
//      </div>
//    </>
//  );
// };

// export default Modal;

// import { useEffect } from "react";
// import "./Modal.css";

// const Modal = ({ setModalOpen, contract }) => {
//  const sharing = async () => {
//    const address = document.querySelector(".address").value;
//    await contract.allow(address);
//    setModalOpen(false);
//  };

//  const revoking = async () => {
//    const address = document.querySelector(".address").value;
//    await contract.disallow(address);
//    setModalOpen(false);
//  };

//  useEffect(() => {
//    const accessList = async () => {
//      const addressList = await contract.shareAccess();
//      let select = document.querySelector("#selectNumber");
//      const options = addressList;

//      for (let i = 0; i < options.length; i++) {
//        let opt = options[i];
//        let e1 = document.createElement("option");
//        e1.textContent = opt;
//        e1.value = opt;
//        select.appendChild(e1);
//      }
//    };
//    contract && accessList();
//  }, [contract]);

//  return (
//    <>
//      <div className="modalBackground">
//        <div className="modalContainer">
//          <div className="title">Share with</div>
//          <div className="body">
//            <input
//              type="text"
//              className="address"
//              placeholder="Enter Address"
//            ></input>
//          </div>
//          <form id="myForm">
//            <select id="selectNumber">
//              <option className="address">People With Access</option>
//            </select>
//          </form>
//          <div className="footer">
//            <button
//              onClick={() => {
//                setModalOpen(false);
//              }}
//              id="cancelBtn"
//            >
//              Cancel
//            </button>
//            <button onClick={() => sharing()}>Share</button>
//            <button onClick={() => revoking()}>Revoke</button>
//          </div>
//        </div>
//      </div>
//    </>
//  );
// };

// export default Modal;

// import { useEffect } from "react";
// import "./Modal.css";

// const Modal = ({ setModalOpen, contract }) => {
//   const sharing = async () => {
//     const address = document.querySelector(".address").value;
//     await contract.allow(address);
//     setModalOpen(false);
//   };
//   useEffect(() => {
//     const accessList = async () => {
//       const addressList = await contract.shareAccess();
//       let select = document.querySelector("#selectNumber");
//       const options = addressList;

//       for (let i = 0; i < options.length; i++) {
//         let opt = options[i];
//         let e1 = document.createElement("option");
//         e1.textContent = opt;
//         e1.value = opt;
//         select.appendChild(e1);
//       }
//     };
//     contract && accessList();
//   }, [contract]);
//   return (
//     <>
//       <div className="modalBackground">
//         <div className="modalContainer">
//           <div className="title">Share with</div>
//           <div className="body">
//             <input
//               type="text"
//               className="address"
//               placeholder="Enter Address"
//             ></input>
//           </div>
//           <form id="myForm">
//             <select id="selectNumber">
//               <option className="address">People With Access</option>
//             </select>
//           </form>
//           <div className="footer">
//             <button
//               onClick={() => {
//                 setModalOpen(false);
//               }}
//               id="cancelBtn"
//             >
//               Cancel
//             </button>
//             <button onClick={() => sharing()}>Share</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Modal;
