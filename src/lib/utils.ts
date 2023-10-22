import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimestampToFormattedDate(
  utcTimestamp: number,
  timezoneOffsetSeconds: number
): string {
  // Create a Date object with the UTC timestamp
  const date = new Date(utcTimestamp * 1000); // Convert to milliseconds

  // Apply the time zone offset
  date.setSeconds(date.getSeconds() + timezoneOffsetSeconds);

  // Define month names
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month and day
  const month: string = monthNames[date.getUTCMonth()];
  const day: number = date.getUTCDate();

  // Format the date as 'Month Day'
  const formattedDate: string = `${month} ${day}`;

  return formattedDate;
}

// Example usage with a time zone offset of 19800 seconds (5 hours and 30 minutes):
const utcTimestamp: number = 1634870000; // UTC timestamp (Unix timestamp)
const timezoneOffsetSeconds: number = 19800; // Time zone offset in seconds (5 hours and 30 minutes)
