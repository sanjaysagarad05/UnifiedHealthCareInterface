
import "./doctordisplay.css";

import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import  { ethers }  from 'ethers';





const Doctordisplay = () => {

  
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  //const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wallet = async()=>{
      
    if(provider){
      await provider.send("eth_requestAccounts", []);

      window.ethereum.on("chainChanged", () => {
        window.location.reload(); 
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload(); 
      });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      setAccount(address);
      const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
      const contract = new ethers.Contract(
        contractAddress,
        Upload.abi,
        signer
      );
      console.log(contract);
      setContract(contract);
      //setProvider(provider);
    }else{
      alert("Metamask is not installed");
    }
  }
  provider && wallet()
},[])

  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".addressdispl").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img 
              key={i}
              src={"file.svg"}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No file to display");
    }
  };
  return (
    <>
    <div className="doctor-display">
    <p style={{ fontWeight: 'bold' }}>Account Address: {account}</p>
      <div className="image-list">{data}</div>
      <input
        type="textarea"
        placeholder="Enter Address"
        className="addressdispl"
        style={{
          marginLeft:'35vw',
          marginTop:'20px',
          marginBottom:'0px',
          width: '25%', 
          height: '50px', 
          padding: '8px', 
          border: '1px solid #ccc', 
          borderRadius: '4px', 
          boxSizing: 'border-box', 
        }}
        
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      </div>
    </>
  );
};
export default Doctordisplay;