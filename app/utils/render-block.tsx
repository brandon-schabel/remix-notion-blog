import { ClientBlock } from "~/components/client-block";
import { CodeBlock } from "~/components/code-block";
import { Text } from "~/components/text";

const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="leading-normal mt-[2px] mb-[1px] whitespace-pre-wrap py-[3px] px-[2px] break-words min-h-[1em]">
      {children}
    </div>
  );
};

export const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <BlockWrapper>
          <p>
            <Text text={value.rich_text} />
          </p>
        </BlockWrapper>
      );
    case "heading_1":
      return (
        <BlockWrapper>
          <h1>
            <Text text={value.rich_text} />
          </h1>
        </BlockWrapper>
      );
    case "heading_2":
      return (
        <BlockWrapper>
          <h2>
            <Text text={value.rich_text} />
          </h2>
        </BlockWrapper>
      );
    case "heading_3":
      return (
        <BlockWrapper>
          <h3>
            <Text text={value.rich_text} />
          </h3>
        </BlockWrapper>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <BlockWrapper>
          <li>
            <Text text={value.rich_text} />
          </li>
        </BlockWrapper>
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

          {/* For some reason the toggle doesn't load the content of the toggle,
          so the ClientBlock does client side loading of the toggle block */}
          <ClientBlock id={id} />
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
      // component that handles the rendering of code blocks
      return <CodeBlock text={value?.rich_text[0]?.plain_text} />;
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};
