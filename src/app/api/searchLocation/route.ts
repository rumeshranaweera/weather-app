import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${process.env.OPEN_WEATHER}`
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
