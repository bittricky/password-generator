import { useState, FC } from "react";

interface Props {
  password: string;
}

const PasswordDisplay: FC<Props> = ({ password }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-zinc-800 p-4 rounded-lg flex items-center justify-between">
      <span className="font-mono text-lg">{password}</span>
      <button
        onClick={handleCopy}
        className="text-purple-400 hover:text-purple-300 transition-colors"
      >
        {copied ? (
          <span className="text-sm">Copied!</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        )}
      </button>
    </div>
  );
};

PasswordDisplay.displayName = "PasswordDisplay";
export default PasswordDisplay;
