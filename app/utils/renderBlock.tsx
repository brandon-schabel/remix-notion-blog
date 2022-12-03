import { useFetcher } from "@remix-run/react";
import classNames from "classnames";
// import Prism from 'prismjs';
import { Fragment, useEffect } from "react";
import Prism from "~/utils/prism";
Prism.highlightAll();
// Prism.manual = true;

// if(typeof window !== "undefined") {
//   window.Prism = Prism;
//   window.Prism.manual = true
// }

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }

  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={classNames({
          "font-bold": bold,
          "font-italic": italic,
          "font-mono bg-neutral-400 py-1 px-2 rounded-sm": code,
          "line-through": strikethrough,
          underline: underline,
        })}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export const CodeBlock = ({ text }: { text: string }) => {
  useEffect(() => {
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
      {/* <div className="max-w-full "> */}
      <div className="max-w-[90vw] lg:max-w-full w-full">
        <pre className="language-tsx ">
          <code className="language-tsx ">{text}</code>
        </pre>

        {/* <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              // className="overflow-scroll"
              // customStyle={{
              //   overflowX: "scroll",
              // }}
            >
              {text}
            </SyntaxHighlighter> */}
        {/* </div> */}
      </div>
    </div>
  );
};

const ClientBlock = ({ id }) => {
  const fetcher = useFetcher();
  // will load block data and children and render it

  useEffect(() => {
    fetcher.load("/api/get-block/" + id);
  }, [id]);

  return (
    <div>
      {fetcher?.data?.blockData?.results.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
};

export const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.rich_text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>

          <ClientBlock id={id} />
          {/* {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))} */}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "code":
      // return null;

      return <CodeBlock text={value?.rich_text[0]?.plain_text} />;
    // return (
    //   <div className="relative">
    //     <button
    //       className="btn bg-slate-700 absolute text-white right-0 p-2 rounded-md"
    //       onClick={() => {
    //         navigator.clipboard.writeText(value?.rich_text[0]?.plain_text);
    //       }}
    //     >
    //       Copy
    //     </button>
    //     <div className="max-w-full overflow-scroll">
    //       <pre className="language-js">
    //         <code className="language-js">
    //           {value?.rich_text[0]?.plain_text}
    //         </code>
    //       </pre>

    //       {/* <SyntaxHighlighter
    //         language="typescript"
    //         style={atomDark}
    //         // className="overflow-scroll"
    //         // customStyle={{
    //         //   overflowX: "scroll",
    //         // }}
    //       >
    //         {value?.rich_text[0]?.plain_text}
    //       </SyntaxHighlighter> */}
    //     </div>
    //   </div>
    // );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};
