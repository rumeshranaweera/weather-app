"use client";
import { ForecastData } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

// type props = { searchParams: { lat: string; lon: string } };
// { searchParams: { lat, lon } }: props
const ForecastData = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const [data, setData] = useState<ForecastData | null>(null);
  const [viewMore, setViewMore] = useState(false);

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
    return <div>Loading ...</div>;
  }
  const uniqueDays: any = {};
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {data?.list
          .filter((item, index, arr) => {
            // Check if the current item and the next item are on the same day
            if (index < arr.length - 1) {
              const currentDate = new Date(item.dt_txt);
              const nextDate = new Date(arr[index + 1].dt_txt);
              return currentDate.getDate() !== nextDate.getDate();
            }
            // Include the last item in the list
            return true;
          })
          .slice(1, !viewMore ? 4 : undefined)
          .map((item) => (
            <div
              key={item.dt}
              className="m-10 items-center flex flex-col md:flex-row md:justify-center"
            >
              <div className="w-64 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6">
                <div className="text-md font-bold flex flex-col text-gray-900">
                  <span className="uppercase">
                    {item?.dt_txt && item.dt_txt.split(" ")[0]}
                  </span>
                </div>
                <div className="w-32 h-32 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={`https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`}
                    fill
                    alt={item?.weather[0].icon || "weather image"}
                  />
                </div>
                <p className="text-gray-700 mb-2">
                  {item?.weather[0].description}
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  {item?.main?.temp !== undefined
                    ? item.main.feels_like
                    : "N/A"}
                  <sup>c</sup>
                  <span className="font-normal text-gray-700 mx-1">/</span>
                  {item?.main?.temp_max !== undefined ? item.main.temp : "N/A"}
                  <sup>c</sup>
                </div>
              </div>
            </div>
          ))}
        <div className="m-10 w-64" onClick={() => setViewMore(!viewMore)}>
          <div className=" h-full transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6 font-bold text-xl ">
            {viewMore ? "View Less" : "View More"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastData;
