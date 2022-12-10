import classNames from "classnames";
import type { ReactNode } from "react";
import { useState } from "react";
import type { IconProps } from "./icon";
import { Icon } from "./icon";

export const useToastNotification = (
  {
    toastLength,
  }: {
    toastLength?: number;
  } = { toastLength: 3000 }
) => {
  const [displayToast, setDisplayToast] = useState<boolean | null>(null);

  const startToastTimer = () => {
    setDisplayToast(true);

    setTimeout(() => {
      setDisplayToast(false);
    }, toastLength);
  };

  return {
    displayToast,
    setDisplayToast,
    startToastTimer,
  };
};

export const ToastNotification = ({
  position = "bottom-right",
  displayToast,
  toastText,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  displayToast: boolean | null;
  toastText: string;
}) => {
  const toastPositionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };
  return (
    <div className={classNames("fixed z-10", toastPositionClasses[position])}>
      <div
        className={classNames("duration-500", {
          "transition-all": true,
          // 'hidden': !displayToast,
          "opacity-0": !displayToast,
          "opacity-100": displayToast,
          hidden: displayToast === null,
        })}
      >
        <div className="w-48 bg-green-400 rounded-md text-center p-4 shadow-md">
          <span>{toastText}</span>
        </div>
      </div>
    </div>
  );
};

export const CopyButton = ({
  copyData,
  className,
  children,
  displayText,
  iconProps,
  iconWrapperClassName,
  hideIcon,
}: {
  copyData: string;
  className?: string;
  children?: ReactNode;
  displayText?: string;
  iconProps?: IconProps;
  iconWrapperClassName?: string;
  hideIcon?: boolean;
}) => {
  const { displayToast, startToastTimer } = useToastNotification();

  return (
    <>
      <div
        role="button"
        className={classNames("flex", className)}
        onClick={() => {
          navigator.clipboard.writeText(copyData);

          startToastTimer();
        }}
      >
        {displayText}

        {hideIcon ? null : (
          <div className={classNames("ml-2", iconWrapperClassName)}>
            <Icon iconName={"copy_icon"} size="xx-small" {...iconProps} />
          </div>
        )}
        {children}
      </div>
      <ToastNotification
        displayToast={displayToast}
        toastText="Copied Text"
        position="bottom-right"
      />
    </>
  );
};
