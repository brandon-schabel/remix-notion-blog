import classNames from "classnames";
import { getPageMainImageUrl } from "~/utils/render-utils";

export const PageImage = ({
  page,
  size = "md",
}: {
  page: any;
  size?: "sm" | "md" | "lg";
}) => {
  const pageImageUrl = getPageMainImageUrl(page);

  if (!pageImageUrl) {
    return null;
  }

  return (
    <img
      src={pageImageUrl}
      height="auto"
      className={classNames("rounded-lg shadow-md object-cover", {
        "w-32": size === "sm",
        "w-64": size === "md",
        "w-96": size === "lg",
      })}
    />
  );
};
