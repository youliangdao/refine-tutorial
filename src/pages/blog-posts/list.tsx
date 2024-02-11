import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group } from "@mantine/core";
import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  MarkdownField,
  DateField,
} from "@refinedev/mantine";
import { ColumnSorter } from "../../components/table/ColumnSorter";
import { ColumnFilter } from "../../components/table/ColumnFilter";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
        meta: {
          filterOperator: "contains",
        },
        cell: function render({ getValue }) {
          return (
            <MarkdownField value={getValue<string>()?.slice(0, 80) + "..."} />
          );
        },
      },
      {
        id: "category",
        accessorKey: "category.id",
        header: "Category",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        meta: {
          filterOperator: "contains",
        },
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        meta: {
          filterOperator: "contains",
        },
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List>
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      <ColumnSorter column={header.column} />
                      <ColumnFilter column={header.column} />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
