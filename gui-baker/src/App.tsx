import { ConnectButton } from "@rainbow-me/rainbowkit";
import FunctionConstant from "./components/FunctionConstant";
import { ethers, Contract } from "ethers";
import Function from "./components/Function";
import { ContractAbi, ContractType } from "./components/ContractContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ToggleButton from "./components/ToggleButton";
import { ExtractAbiFunctions } from "abitype";

type test = ExtractAbiFunctions<typeof ContractAbi, "nonpayable">["name"];
type test2 = ExtractAbiFunctions<typeof ContractAbi, "view">["name"];

function FList({
  contract,
  displayConstant,
  displayWrite,
}: {
  contract: Contract;
  displayConstant: boolean;
  displayWrite: boolean;
}) {
  const writeFx = Object.keys(contract.interface.functions).filter((arg) => {
    return !contract.interface.functions[arg].constant;
  });

  const constFx = Object.keys(contract.interface.functions).filter((arg) => {
    return contract.interface.functions[arg].constant;
  });

  const writeComponents = displayWrite
    ? writeFx.map((arg) => (
        <Function key={arg} functionName={arg as test} contract={contract} />
      ))
    : [];
  const constComponents = displayConstant
    ? constFx.map((arg) => (
        <FunctionConstant
          key={arg}
          functionName={arg as test2}
          contract={contract}
        />
      ))
    : [];

  if (writeComponents.length > 0)
    return <>{writeComponents.concat(constComponents)}</>;
  return <>{constComponents}</>;
}

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
    <div className="m-5">
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
      {contract ? (
        <div>
          <ToggleButton
            on={displayWrite}
            setOn={setDisplayWrite}
            message={"Write Functions"}
            color={"input-primary"}
          />
          <ToggleButton
            on={displayConstant}
            setOn={setDisplayConstant}
            message={"Constant Functions"}
            color={"input-info"}
          />
          <div>
            <FList
              contract={contract}
              displayConstant={displayConstant}
              displayWrite={displayWrite}
            ></FList>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
