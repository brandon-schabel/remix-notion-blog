import classNames from "classnames";
import { ToastNotification, useToastNotification } from "./copy-button";

export const Text = ({
  text,
  className,
}: {
  text: any;
  className?: string;
}) => {
  const { displayToast, startToastTimer } = useToastNotification();
  if (!text) {
    return null;
  }

  return text.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    let backgroundColorName = null;
    let isBackgroundColor = false;

    // if color end with _background, set background color
    if (color?.endsWith("_background")) {
      //  parse color name
      backgroundColorName = color.split("_")[0];
      isBackgroundColor = true;
    }
    return (
      <>
        <span
          className={classNames(className, {
            "font-bold": bold,
            "font-italic": italic,
            "font-mono bg-neutral-400 py-1 px-2 rounded-sm text-red-500": code,
            "line-through": strikethrough,
            underline: underline,
          })}
          style={
            color !== "default" && !isBackgroundColor
              ? { color }
              : {
                  backgroundColor: backgroundColorName,
                }
          }
          key={text?.link ? text.link : text?.content || "No Content"}
          onDoubleClick={() => {
            navigator.clipboard.writeText(text?.content || "No Content");
            startToastTimer();
          }}
        >
          {text?.link ? (
            <a href={text?.link?.url}>{text.content}</a>
          ) : (
            text?.content || "No Content"
          )}
        </span>
        <ToastNotification
          displayToast={displayToast}
          toastText={"Copied Text"}
        />
      </>
    );
  });
};
