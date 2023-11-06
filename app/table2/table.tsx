"use client";
import React from "react";
import {
  ColumnDef,
  RowSelectionState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Filter from "./filter";
import SelectVisibleCloumns from "./visible-columns";
import { downloadToExcel } from "@/lib/xlsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const table = useReactTable<TData, TValue>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // For Pagination
    getSortedRowModel: getSortedRowModel(), // For Sorting
    getFilteredRowModel: getFilteredRowModel(), // For Filtering
    onColumnVisibilityChange: setColumnVisibility, // For cloumn visibility
    onRowSelectionChange: setRowSelection, // For selecting the row
    state: {
      columnVisibility,
      rowSelection,
    },
  });
  console.log({ rowSelection });
  return (
    <>
      <>
        <div className="flex p-2">
          <p></p>
          <div className="ml-auto">
            <Button onClick={() => downloadToExcel(data)}>
              Export to Excel
            </Button>
            <SelectVisibleCloumns table={table} />
          </div>
        </div>
      </>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            // {...{
                            //   className: header.column.getCanSort()
                            //     ? "cursor-pointer select-none"
                            //     : "",
                            //   onClick: header.column.getToggleSortingHandler(),
                            // }}
                            className="flex items-center font-bold justify-center text-center"
                            onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div className="flex items-center justify-center text-center">
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full px-2 py-4 justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              table.setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage()}
            size="sm">
            {"<<"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            size="sm">
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            size="sm">
            Next
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
            size="sm">
            {">>"}
          </Button>
        </div>
      </div>
    </>
  );
}
