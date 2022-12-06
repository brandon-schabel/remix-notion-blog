import classNames from "classnames";

export const Text = ({ text, className }: { text: any, className?: string }) => {
  if (!text) {
    return null;
  }

  return text.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={classNames(className, {
          "font-bold": bold,
          "font-italic": italic,
          "font-mono bg-neutral-400 py-1 px-2 rounded-sm": code,
          "line-through": strikethrough,
          underline: underline,
        })}
        style={color !== "default" ? { color } : {}}
      >
        {text?.link ? <a href={text?.link?.url}>{text.content}</a> : text?.content ||'No Content'}
      </span>
    );
  });
};
