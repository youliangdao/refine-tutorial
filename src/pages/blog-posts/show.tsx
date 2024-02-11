import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        Id
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        Title
      </Title>
      <TextField value={record?.title} />
      <Title mt="xs" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
      <Title my="xs" order={5}>
        Category
      </Title>
      <TextField value={record?.category?.title} />
      <Title my="xs" order={5}>
        Status
      </Title>
      <TextField value={record?.status} />
      <Title my="xs" order={5}>
        Created At
      </Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
