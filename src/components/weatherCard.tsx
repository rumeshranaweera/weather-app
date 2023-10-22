import { convertTimestampToFormattedDate } from "@/lib/utils";
import { type CurrentWeatherData } from "@/types/types";
import {
  Droplets,
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";
import Image from "next/image";

type Props = { data: CurrentWeatherData };

const WeatherCard = ({ data }: Props) => {
  return (
    <div>
      <div className="w-full mx-auto max-w-screen-sm my-5 bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
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
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {data?.main.temp_min.toFixed(1)}°C
            </span>
            <ThermometerSnowflake />
            <span className="font-semibold mt-1 text-sm">Min</span>
          </div>
          <div className="xs:flex flex-col items-center hidden">
            <span className="font-semibold text-lg">
              {data?.main.feels_like.toFixed(1)}°C
            </span>
            <Thermometer />
            <span className="font-semibold mt-1 text-sm">Feels Like</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {data?.main.temp_max.toFixed(1)}°C
            </span>
            <ThermometerSun />
            <span className="font-semibold mt-1 text-sm">Max</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {data?.main.humidity}%
            </span>
            <Droplets />
            <span className="font-semibold mt-1 text-sm">Humidity</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {data?.wind.speed} m/s
            </span>
            <Wind />
            <span className="font-semibold mt-1 text-sm">Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
