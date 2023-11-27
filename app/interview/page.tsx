import ShowCountries from "@/components/show-countries";
import axios from "axios";
import React from "react";

const InterviewPage = async () => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  return <ShowCountries data={data} />;
};

export default InterviewPage;
