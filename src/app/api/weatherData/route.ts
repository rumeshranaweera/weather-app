import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lat, lon } = await req.json();
  console.log(lat, lon);

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER}`
  );

  // Check if response.data contains circular references
  const circularReference: any[] = [];
  const jsonString = JSON.stringify(response.data, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (circularReference.includes(value)) return;
      circularReference.push(value);
    }
    return value;
  });

  return NextResponse.json(JSON.parse(jsonString));
}
