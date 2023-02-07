import { ConnectButton } from "@rainbow-me/rainbowkit";

// interface ToggleButtonProps {
//   on: boolean;
//   setOn: Dispatch<SetStateAction<boolean>>;
//   message: string;
//   color: string;
// }

export default function Header() {
  return (
    <div className="flex flex-row justify-between mb-3 border-b-2">
      <div title="Icons made by Freepik from www.flaticon.com">
        <img src="chef.png" className="m-5 w-10 h-10" />
      </div>
      <div className="m-5">
        <ConnectButton />
      </div>
    </div>
  );
}
