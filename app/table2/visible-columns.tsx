import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import React from "react";

interface SelectVisibleCloumnsProps {
  table: Table<TData>;
}
const SelectVisibleCloumns: React.FC<SelectVisibleCloumnsProps> = ({
  table,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Filter - we are first filtering which columns can be hide or which dont
        like actions column */}
        {table
          .getAllColumns()
          .filter((col) => col.getCanHide())
          .map((col) => (
            <DropdownMenuCheckboxItem
              checked={col.getIsVisible()}
              onCheckedChange={(value) => {
                col.toggleVisibility(!!value);
              }}
              key={col.id}
              className="capitalize"
            >
              {col.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectVisibleCloumns;
