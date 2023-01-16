import ABI from "../ABI.json";

const petrolAddress = "0x20e0A2b56598d37bf608e94A88890a7C51BA8385";

const newPetrolContract = (web3) => {
  return new web3.eth.Contract(ABI, petrolAddress);
};

export default newPetrolContract;
