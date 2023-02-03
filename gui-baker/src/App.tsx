import { ConnectButton } from "@rainbow-me/rainbowkit";
import FunctionConstant from "./components/FunctionConstant";
import { ethers, Contract } from "ethers";
import Function from "./components/Function";
import { ContractAbi, ContractType } from "./components/ContractContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ToggleButton from "./components/ToggleButton";
import { ExtractAbiFunctions } from "abitype";
import { FList } from "./components/Flist";
import Footer from "./components/Footer";
import Header from "./components/Header";

type test = ExtractAbiFunctions<typeof ContractAbi, "nonpayable">["name"];
type test2 = ExtractAbiFunctions<typeof ContractAbi, "view">["name"];

function App() {
  const [contract, setContract] = useState<Contract>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ address: string }>();

  function onSubmit(data: { address: string }) {
    if (ethers.utils.isAddress(data.address)) {
      console.log("good addr");
      const contract = new ethers.Contract(
        data.address,
        ContractAbi
      ) as ContractType;
      setContract(contract);
    } else console.log("bad addr");
  }

  const [displayConstant, setDisplayConstant] = useState(true);
  const [displayWrite, setDisplayWrite] = useState(true);

  return (
    <div>
      <Header />
      <div className="m-5">
        <input
          className="input input-secondary input-md h-8 border-2 mr-4"
          key="address"
          placeholder="address"
          {...register("address")}
        />
        <button
          className="min-h-8 btn btn-outline input-xs input-primary border-2 h-6"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </button>
        {contract ? <FList contract={contract} /> : null}
        <Footer />
      </div>
    </div>
  );
}

export default App;
