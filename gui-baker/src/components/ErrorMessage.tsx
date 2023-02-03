import { RxCross2 } from "react-icons/rx";

function ErrorMessage({
  message,
  setError,
}: {
  message: string;
  setError: (error: string) => void;
}) {
  if (message === "") return null;
  return (
    <div className={` mt-3 alert alert-error col-span-12 flex `}>
      <p className="inline break-all">{message.toLowerCase()}</p>
      <RxCross2
        className="inline cursor-pointer "
        onClick={() => setError("")}
      />
    </div>
  );
}

export default ErrorMessage;
