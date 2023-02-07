import { ethers, Contract } from "ethers";
import { Contracts } from "./context/ContractContext";
import { Erc20, Erc721 } from "./context/abis";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FuncList } from "./components/Funclist";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [contract, setContract] = useState<Contract>();
  const [selectedContract, setSelectedContract] = useState<{
    name: string;
    abi: readonly [];
  }>({
    name: "",
    abi: [],
  });

  const { register, handleSubmit, setError } = useForm<{ address: string }>();

  function onSubmit(data: { address: string }) {
    if (ethers.utils.isAddress(data.address.toLowerCase())) {
      const contract = new ethers.Contract(
        ethers.utils.getAddress(data.address.toLowerCase()),
        selectedContract.abi
      );
      setContract(contract);
    } else {
      setError("address", {
        type: "value",
        message: "This address is not an ethereum address.",
      });
    }
  }

  function handleSelectedContract(data: any) {
    const res = Contracts.find((x) => x.name === data.target.value);
    if (res) setSelectedContract(res as any);
    else {
      data.target.value === "Erc20"
        ? setSelectedContract(Erc20 as any)
        : setSelectedContract(Erc721 as any);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* TODO : create body component */}
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
              <option disabled selected></option>
              {Contracts.map((contract) => (
                <option
                  key={contract.name}
                  value={contract.name}
                  className="btn-outline"
                >
                  {contract.name}
                </option>
              ))}
              <option
                key={Erc20.name}
                value={Erc20.name}
                className="btn-outline"
              >
                {Erc20.name}
              </option>
              <option
                key={Erc721.name}
                value={Erc721.name}
                className="btn-outline"
              >
                {Erc721.name}
              </option>
            </select>
          </div>
          {!selectedContract.name ? null : (
            <div className="form-control">
              <div className="input-group">
                <input
                  className="input input-secondary input-md h-8 border-2 w-96"
                  key="address"
                  placeholder="address"
                  {...register("address")}
                />
                {/* TODO : show error
              {errors.address && <p>{errors.address.message}</p>}  */}
                <button
                  className="min-h-8 btn btn-outline input-xs border-2"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div>
          {contract ? (
            <FuncList contract={contract} contractAbi={selectedContract.abi} />
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
