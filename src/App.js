import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

import newPetrolContract from "./blockchain/newPetrolContract";

function App() {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [petrolContract, setPetrolContract] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [account, setAccount] = useState(null);
  const [buyCount, setBuyCount] = useState(0);

  const connectWalletHandler = async () => {
    // 請求錢包連線
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    //  抓取Web3資料
    const web3 = new Web3(window.ethereum);
    setWeb3(web3);

    // 抓取我的帳號地址
    const acounts = await web3.eth.getAccounts();
    setAddress(acounts[0]);

    // 抓取我的智能合約
    const pt = newPetrolContract(web3);
    setPetrolContract(pt);
  };

  const newNumber = (e) => setBuyCount(e.target.value);
  const buyHandler = async (e) => {
    await petrolContract.methods.buyPetrol(buyCount).send({
      from: address,
      value: web3.utils.toWei("0.01", "ether") * buyCount,
    });
  };

  const getInventory = useCallback(async () => {
    const inventory = await petrolContract.methods.getPetrolBalences().call();
    setInventory(inventory);
  }, [petrolContract]);

  const getAccount = useCallback(async () => {
    const account = await petrolContract.methods.petrolBalences(address).call();
    setAccount(account);
  }, [petrolContract, address]);

  useEffect(() => {
    if (petrolContract) getInventory();
    if (petrolContract && address) getAccount();
  }, [petrolContract, address, getInventory, getAccount]);

  return (
    <div className="App">
      <div className="card">
        <h1>Petrol Exchange - 石油交易系統</h1>
        <button className="button" onClick={connectWalletHandler}>
          connect wallet
        </button>
        <h3>地址(address)：{address}</h3>
        <section>
          <div>
            <p>庫存(Inventory):{inventory}</p>
          </div>
        </section>
        <section>
          <div>
            <p>我的汽油數量(Account):{account}</p>
          </div>
        </section>
        <section>
          <div className="buy-div">
            <input
              className="input"
              type="type"
              placeholder="請輸入購買數量"
              onChange={newNumber}
            />
            <button className="button" onClick={buyHandler}>
              BUY
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
