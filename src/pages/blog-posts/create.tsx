import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { TextInput, Textarea, Select } from "@mantine/core";

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      title: "",
      content: "",
      category: { id: "" },
      status: "",
      createdAt: "",
    },
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Title" {...getInputProps("title")} />
      <Textarea
        mt="sm"
        label="Content"
        autosize
        {...getInputProps("content")}
      />
      <Select
        mt="sm"
        label="Category"
        {...getInputProps("category.id")}
        {...categorySelectProps}
      />
      <TextInput mt="sm" label="Status" {...getInputProps("status")} />
      {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}
      <TextInput mt="sm" label="Created At" {...getInputProps("createdAt")} />
    </Create>
  );
};
