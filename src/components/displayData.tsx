"use client";
import { CurrentWeatherData } from "@/types/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WeatherCard from "./weatherCard";
import { useRouter } from "next/navigation";

// type props = { searchParams: { lat: string; lon: string } };
// { searchParams: { lat, lon } }: props
const DisplayData = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let lat = searchParams.get("lat");
  let lon = searchParams.get("lon");
  const [data, setData] = useState<CurrentWeatherData | null>(null);
  useEffect(() => {
    router.push("?lat=6.9387469&lon=79.8541134");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (lat && lon) {
        try {
          const { data } = await axios.post("/api/weatherData", { lat, lon });
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
    return <div>Loading...</div>;
  }

  return <>{!!data && <WeatherCard data={data} />}</>;
};

export default DisplayData;
