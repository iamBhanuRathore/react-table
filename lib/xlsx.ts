import xlsx, { IJsonSheet } from "json-as-xlsx";

export const downloadToExcel = (data: any) => {
  let columns: IJsonSheet[] = [
    // First Sheet , we can have mulitple sheets
    {
      sheet: "Product History",
      columns: [
        {
          label: "ID",
          value: "Meter_Serial_No",
        },
        {
          label: "Category",
          value: "category",
        },
        {
          label: "Created by",
          value: (row: any) => new Date(row.createdAt).toLocaleString(),
        },
        {
          label: "UpdatedAt",
          value: "updatedAt",
        },
      ],
      content: data,
    },
  ];
  let settings = {
    fileName: "Data Sheet",
  };
  xlsx(columns, settings);
};
