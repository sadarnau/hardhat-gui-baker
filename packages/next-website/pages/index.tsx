import { ConnectButton } from "@rainbow-me/rainbowkit";
import FunctionConstant from "./FunctionConstant";
import { ethers, Contract } from "ethers";
import Function from "./Function";
import { ContractAbi, ContractType } from "./ContractContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

function FList({ contract }: { contract: Contract }) {
  return Object.keys(contract.interface.functions).map((arg) => {
    if (contract.interface.functions[arg].constant)
      return (
        <FunctionConstant key={arg} functionName={arg} contract={contract} />
      );
    return <Function key={arg} functionName={arg} contract={contract} />;
  });
}

export default function Home() {
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

  // const deployedCoin = new ethers.Contract(
  //   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //   ContractAbi
  // ) as ContractType;

  return (
    <div className=" m-5">
      <div className="mt-5">
        <ConnectButton />
      </div>
      <input
        className="input input-secondary input-md h-8 border-2 mr-4"
        key="address"
        placeholder="address"
        {...register("address")}
      />
      <button
        className="min-h-8 btn btn-outline  input-xs input-primary border-2 h-6"
        onClick={handleSubmit(onSubmit)}
      >
        {" "}
        Submit
      </button>
      <div>{contract ? <FList contract={contract}></FList> : null}</div>
    </div>
  );
}
