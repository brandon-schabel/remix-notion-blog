import { Text } from "~/components/text";

export const getPageMainImageUrl = (page: any) => {
  return page?.properties["Post Image"]?.files[0]?.file?.url;
};

export const getPageTitle = (page: any) => {
  return <Text text={page.properties.Name.title} />;
};

export const getPageSubTitle = (page: any) => {
  const subtitleProperties = page.properties["Sub Title"].rich_text;
  return <Text text={subtitleProperties} />;
};

export const getPostCreatedAt = (page: any) => {
  const createdAtProperties = page.properties["Created"].created_time;

  return new Date(createdAtProperties);
};
