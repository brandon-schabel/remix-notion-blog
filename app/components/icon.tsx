import { iconMap } from "./icons/icon-map";

export const sizeClassNames = {
  "xxx-small": "h-4 w-4",
  "xx-small": "h-6 w-6",
  "x-small": "h-8 w-8",
  small: "h-12 w-12",
  medium: "h-16 w-16",
  large: "h-20 w-20",
  "x-large": "h-24 w-24",
  "xx-large": "h-32 w-32",
};

const sizeMap = {
  "xxx-small": { height: 16, width: 16 },
  "xx-small": { height: 24, width: 24 },
  "x-small": { height: 32, width: 32 },
  small: { height: 48, width: 48 },
  medium: { height: 64, width: 64 },
  large: { height: 80, width: 80 },
  "x-large": { height: 96, width: 96 },
  "xx-large": { height: 128, width: 128 },
};

type HTMLImage = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type IconNames = keyof typeof iconMap;
export type IconSizes = keyof typeof sizeClassNames;

export interface IconProps {
  size?: IconSizes;
  iconColor?: string;
  iconName: IconNames;
  backdrop?: "circle" | "rounded-square";
  className?: string;
}
export const Icon = ({
  size = "medium",
  iconName = "copy_icon",
  className,
  iconColor,
  backdrop,
}: IconProps) => {
  // @ts-ignore
  const Component = iconMap[iconName];
  if (!Component) {
    return null;
  }

  const selectedSize = sizeMap[size];

  const image = <Component color={iconColor} {...selectedSize} />;
  if (backdrop) {
    return (
      <div
        className={`flex justify-center items-center  ${
          backdrop === "circle" ? "rounded-full" : "rounded-box"
        } bg-neutral-focus ${className || ""}`}
      >
        {image}
      </div>
    );
  }

  return image;
};
