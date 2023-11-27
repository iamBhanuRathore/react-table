"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const filterableCapitals = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
];

const ShowCountries = ({ data }: { data: any }) => {
  const [country, setCountry] = useState(data);
  const [capital, setCapital] = useState("");
  //   console.log(data);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setCapital(e.target.value);
  };
  useEffect(() => {
    if (capital) {
      (async () => {
        const { data } = await axios.get(
          `https://restcountries.com/v3.1/capital/${capital}`
        );
        setCountry(data);
      })();
    }
  }, [capital]);
  return (
    <>
      <select onChange={(e) => handleChange(e)}>
        {filterableCapitals.map((single: any) => (
          <option key={single}>{single}</option>
        ))}
      </select>
      <select>
        {country.map((single: any) => (
          <option key={single.name.common}>{single.name.common}</option>
        ))}
      </select>
    </>
  );
};

export default ShowCountries;
