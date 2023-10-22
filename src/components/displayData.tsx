"use client";
import { convertTimestampToFormattedDate } from "@/lib/utils";
import { CurrentWeatherData } from "@/types/types";
import axios from "axios";
import {
  Droplets,
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <>
      {!!data && (
        <div>
          <div className="w-full mx-auto max-w-screen-sm my-5 bg-white py-10 px-3 xs:px-10 rounded-xl ring-8 ring-white ring-opacity-40">
            <div className="flex justify-between ">
              <div className="flex flex-col">
                <span className="text-3xl xs:text-6xl font-bold">
                  {data?.main?.temp}°C
                </span>
                <span className="font-semibold mt-1 text-gray-500">
                  <span className="uppercase">
                    {data?.name}, {data?.sys.country}{" "}
                  </span>{" "}
                </span>
                <p className="font-semibold mt-1 text-gray-500 tracking-wide">
                  {convertTimestampToFormattedDate(data?.dt, data?.timezone)}
                </p>
              </div>
              <div className="relative h-32 w-32 -mt-5">
                <Image
                  className="object-cover"
                  src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  fill
                  alt={data?.weather[0].icon || "weather image"}
                />
              </div>
            </div>
            <p className="text-gray-700 mb-2 text-end font-bold capitalize text-xl mr-5">
              {data?.weather[0].description}
            </p>
            <div className="flex justify-between mt-12 ">
              <div className="flex flex-col items-center text-sky-500">
                <span className="font-semibold text-lg">
                  {data?.main.temp_min.toFixed(1)}°C
                </span>
                <ThermometerSnowflake />
                <span className="font-semibold mt-1 text-sm">Min</span>
              </div>
              <div className="xs:flex flex-col items-center hidden text-neutral-600">
                <span className="font-semibold text-lg">
                  {data?.main.feels_like.toFixed(1)}°C
                </span>
                <Thermometer />
                <span className="font-semibold mt-1 text-sm">Feels Like</span>
              </div>
              <div className="flex flex-col items-center text-red-500">
                <span className="font-semibold text-lg">
                  {data?.main.temp_max.toFixed(1)}°C
                </span>
                <ThermometerSun />
                <span className="font-semibold mt-1 text-sm ">Max</span>
              </div>
              <div className="flex flex-col items-center text-emerald-500">
                <span className="font-semibold text-lg">
                  {data?.main.humidity}%
                </span>
                <Droplets />
                <span className="font-semibold mt-1 text-sm">Humidity</span>
              </div>
              <div className="flex flex-col items-center text-blue-500">
                <span className="font-semibold text-lg">
                  {data?.wind.speed} m/s
                </span>
                <Wind />
                <span className="font-semibold mt-1 text-sm">Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayData;
