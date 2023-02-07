import { ethers, Contract } from "ethers";
import { Contracts } from "./components/ContractContext";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { FuncList } from "./components/Funclist";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Listbox, Transition } from "@headlessui/react";

function App() {
  const [contract, setContract] = useState<Contract>();
  const [selectedContract, setSelectedContract] = useState<{
    name: string;
    abi: readonly [];
  }>({
    name: "Choose a contract",
    abi: [],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ address: string }>();

  function onSubmit(data: { address: string }) {
    if (ethers.utils.isAddress(data.address)) {
      console.log("good addr");
      const contract = new ethers.Contract(data.address, selectedContract.abi);
      setContract(contract);
    } else console.log("bad addr");
  }

  // TODO: change any
  function handleSelectedContract(data: any) {
    const res = Contracts.find((x) => x.name === data.target.value);
    if (res) setSelectedContract(res as any);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <Header />
      </div>
      <div className="m-8 mt-4 flex-1">
        <div className="flex justify-center items-center bg-base-300 rounded-lg h-20 gap-4">
          <div className="mb-3">
            <label className="label">
              <span className="label-text-alt">Pick your contract</span>
            </label>
            <select
              className="select select-sm"
              onChange={handleSelectedContract}
            >
              {Contracts.map((contract) => (
                <option
                  key={contract.name}
                  value={contract.name}
                  className="btn-outline"
                >
                  {contract.name}
                </option>
              ))}
            </select>
          </div>
          {selectedContract.name === "Choose a contract" ? null : (
            // TODO : input group
            <>
              <input
                className="input input-secondary input-md h-8 border-2 w-96"
                key="address"
                placeholder="address"
                {...register("address")}
              />
              <button
                className="min-h-8 btn btn-outline input-xs input-success border-2"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </>
          )}
        </div>
        <div className="divider"></div>
        <div>
          {contract ? (
            <FuncList contract={contract} contractAbi={selectedContract.abi} />
          ) : null}
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default App;
