import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  const CITY = process.env.CITY;
  const COUNTRY = process.env.COUNTRY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${CITY},${COUNTRY}&appid=${API_KEY}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
