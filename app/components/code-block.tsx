import { useEffect } from "react";
import Prism from "~/utils/prism";
import { CopyButton } from "./copy-button";

export const CodeBlock = ({ text }: { text: string }) => {
  useEffect(() => {
    // prisma highlight all activates the syntax highlighting for all code blocks
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <div className="relative flex justify-center">
      <CopyButton copyData={text} className="absolute right-2 top-2 p-2 text-white" />
      <div className="max-w-[90vw] lg:max-w-full w-full">
        {/* language-tsx tag is for the code-syntax highlighting for Prism */}
        <pre className="language-tsx">
          <code className="language-tsx">{text}</code>
        </pre>
      </div>
    </div>
  );
};
