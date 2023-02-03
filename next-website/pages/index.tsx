import { ethers, Contract } from "ethers";
import { ContractAbi, ContractType } from "../components/ContractContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../gui-baker/src/components/Header";
import Footer from "../../gui-baker/src/components/Footer";
import { FList } from "../../gui-baker/src/components/Flist";

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
      const contract = new ethers.Contract(
        data.address,
        ContractAbi
      ) as ContractType;
      setContract(contract);
    } else console.log("bad addr");
  }

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
