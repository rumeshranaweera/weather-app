import { convertTimestampToFormattedDate } from "@/lib/utils";
import { type CurrentWeatherData } from "@/types/types";
import Image from "next/image";
import React from "react";

type Props = { data: CurrentWeatherData };

const WeatherCard = ({ data }: Props) => {
  return (
    <div className="m-10 items-center flex flex-col md:flex-row md:justify-center">
      <div className="w-64 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6">
        <div className="text-md font-bold flex flex-col text-gray-900">
          <span className="uppercase">
            {data?.name}, {data?.sys.country}
          </span>{" "}
          <span className="font-normal text-gray-700 text-sm">
            {/* {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })} */}

            {data?.dt &&
              convertTimestampToFormattedDate(data?.dt, data?.timezone)}
          </span>
        </div>
        <div className="w-32 h-32 flex items-center justify-center overflow-hidden relative">
          <Image
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            fill
            alt={data?.weather[0].icon || "weather image"}
          />
        </div>
        <p className="text-gray-700 mb-2">{data?.weather[0].description}</p>
        <div className="text-3xl font-bold text-gray-900 mb-6">
          {data?.main?.temp !== undefined ? data.main.feels_like : "N/A"}
          <sup>c</sup>
          <span className="font-normal text-gray-700 mx-1">/</span>
          {data?.main?.temp_max !== undefined ? data.main.temp : "N/A"}
          <sup>c</sup>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
