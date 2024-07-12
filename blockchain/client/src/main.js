import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import  { ethers }  from 'ethers';
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import Record from "./record";

function App() {
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
  return (
    <>
      <div className="App">
      <div className="Appinner">
        <div className="nav">
          <h1 className="title">Unified health care</h1>
          {!modalOpen && (
            <button className="share" onClick={() => setModalOpen(true)}>
              Access Control
            </button>
          )}
          {modalOpen && (
            <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
          )}
        </div>
        <p className="acc">Account:{account}</p>
        <Record account={account}></Record>
        <FileUpload account={account} contract={contract}></FileUpload>
        <Display account={account} contract={contract}></Display>
      </div>
      </div>
    </>
  );
}
export default App;

