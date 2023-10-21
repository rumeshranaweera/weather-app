"use client";
import { ForecastData } from "@/types/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// type props = { searchParams: { lat: string; lon: string } };
// { searchParams: { lat, lon } }: props
const ForecastData = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const [data, setData] = useState<ForecastData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (lat && lon) {
        try {
          const { data } = await axios.post("/api/forecastData", { lat, lon });
          setData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData(); // Invoke the async function immediately

    // Add dependencies as needed (e.g., [lat, lon])
  }, [lat, lon]);
  if (!lat || !lon) {
    return <div>nothing to display</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default ForecastData;
