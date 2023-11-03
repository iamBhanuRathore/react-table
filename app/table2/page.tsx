import { makeData } from "@/demo/makeData";
import React from "react";
import { DataTable } from "./table";
import { column } from "./columns";
import axios from "axios";
const Table2 = async () => {
  const { data } = await axios.post(
    "http://www.pesonline12.in/meterinstallation/record/get?category=3-phaseMeter&location=history",
    {
      Designation: "storekeeper",
      Employee_Active_Status: true,
      Employee_Id: "1001",
      MobileNo: "1001",
      name: "Laxmi",
    }
  );
  console.log("Re-Render");
  // const data = makeData(10);
  // console.log(data);
  return (
    <section className="m-20 p-5 border h-full">
      {/* <DataTable data={data} columns={column} /> */}
      <DataTable data={data.Data} columns={column} />
    </section>
  );
};

export default Table2;
