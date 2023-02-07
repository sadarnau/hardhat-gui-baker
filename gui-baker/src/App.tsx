import { ethers, Contract } from "ethers";
import { Contracts } from "./components/ContractContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FuncList } from "./components/Funclist";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Listbox } from "@headlessui/react";

function App() {
  const [contract, setContract] = useState<Contract>();
  const [selectedContract, setSelectedContract] = useState<{
    name: string;
    abi: [];
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
    console.log(data.name);
    setSelectedContract(data);
  }

  return (
    <div>
      <Header />
      <div className="m-5">
        <Listbox value={selectedContract} onChange={handleSelectedContract}>
          <Listbox.Button>{selectedContract.name}</Listbox.Button>
          <Listbox.Options>
            {Contracts.map((contract) => (
              <Listbox.Option
                value={contract}
                key={contract.name}
                className="ui-active:btn-outline"
              >
                {contract.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        {selectedContract.name === "Choose a contract" ? null : (
          <div>
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
          </div>
        )}
        {contract ? (
          <FuncList contract={contract} contractAbi={selectedContract.abi} />
        ) : null}
        <Footer />
      </div>
    </div>
  );
}

export default App;
