import { RxCross2 } from "react-icons/rx";

function SuccessMessage({
  message,
  setResult,
}: {
  message: string;
  setResult: (error: string) => void;
}) {
  if (message === "") return null;
  return (
    <div className="mt-3 alert col-span-12 flex">
      <p className="inline break-all">{message}</p>
      <RxCross2
        className="inline cursor-pointer"
        onClick={() => setResult("")}
      />
    </div>
  );
}

export default SuccessMessage;
