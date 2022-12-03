import { useEffect } from "react";
import Prism from "~/utils/prism";

export const CodeBlock = ({ text }: { text: string }) => {
  useEffect(() => {
    // prisma highlight all activates the syntax highlighting for all code blocks
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <div className="relative flex justify-center">
      <button
        className="btn bg-slate-700 absolute text-white right-2 p-2 rounded-md"
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      >
        Copy
      </button>
      <div className="max-w-[90vw] lg:max-w-full w-full">
        <pre className="language-tsx ">
          <code className="language-tsx ">{text}</code>
        </pre>
      </div>
    </div>
  );
};
