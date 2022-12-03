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
      width="auto"
      className={classNames("rounded-lg shadow-md w-fit", {
        "h-32": size === "sxm",
        "h-64": size === "md",
        "h-96": size === "lg",
      })}
    />
  );
};
