import { useFetcher } from "@remix-run/react";
import { Fragment, useEffect } from "react";
import { renderBlock } from "~/utils/render-block";

export const ClientBlock = ({ id }: { id: string }) => {
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
