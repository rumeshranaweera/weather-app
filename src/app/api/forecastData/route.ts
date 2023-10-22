import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lat, lon } = await req.json();

  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER}`
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
