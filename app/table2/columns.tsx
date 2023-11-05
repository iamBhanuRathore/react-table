"use client";
import { Person } from "@/demo/makeData";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";

export interface DataType {
  ActivityLog: string;
  Category: "A" | "B" | "C" | "D";
  Customer_Name: string;
  Customer_Unique_Id: string;
  Defective: boolean;
  DefectiveToStore: number | null;
  Employee_Id: string | null;
  Flat_No: string | null;
  InProduction: boolean | null;
  InStore: boolean | null;
  IssueForEngineer: string | null;
  IssueForSite: string | null;
  Job_Card_No: string | null;
  Meter_Id: string | null;
  Meter_Serial_No: string;
  ProductionToStore: boolean | null;
  Rejected: boolean;
  SiteUsed: boolean;
  Site_Name: string | null;
  Sr_NO: number;
  StoreToDefective: number | null;
  StoreToProduction: number | null;
  challanNumber: string | null;
  createdAt: number;
  siteToStore: number | null;
  storeToSite: number | null;
  updatedAt: string;
  whichDealer: string | null;
  withDealer: true | null;
}

// export const column: ColumnDef<Person>[] = [
//   {
//     header: "ID",
//     accessorKey: "id",
//   },
//   {
//     header: "firstName",
//     accessorKey: "firstName",
//   },
//   {
//     header: "lastName",
//     accessorKey: "lastName",
//   },
//   {
//     header: "visits",
//     accessorKey: "visits",
//   },
// ];
export const column: ColumnDef<DataType>[] = [
  {
    header: "ID",
    accessorKey: "Meter_Serial_No",
  },
  {
    header: "Category",
    accessorKey: "Category",
  },
  {
    header: "Created by (MM DD YYYY)",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      let date = row.getValue("createdAt");
      let formatted = new Date(date as string).toLocaleString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "UpdatedAt",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      let date = row.getValue("updatedAt");
      let formatted = new Date(date as string).toLocaleString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => <ActionColumn row={row.original} />,
  },
];
