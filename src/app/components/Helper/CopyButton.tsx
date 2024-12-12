import { Check } from "lucide-react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { shortenAddress } from "../../lib/utils";

export function CopyButton({
  text,
  button = false,
}: {
  text: string;
  button?: boolean;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  if (button) {
    return (
      <button
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
        onClick={() => copyToClipboard(text)}
      >
        {shortenAddress(text)}
        {isCopied && (
          <>
            <span className="text-green-500">Copied</span>
            <Check className="w-4 h-4 text-green-500" />
          </>
        )}
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => copyToClipboard(text)}
    >
      {shortenAddress(text)}
      {isCopied && (
        <>
          <span className="text-green-500">Copied</span>
          <Check className="w-4 h-4 text-green-500" />
        </>
      )}
    </div>
  );
}
