import { useState } from "react";
import Head from "next/head";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

interface WeatherData {
  [time: string]: {
    강수형태: string;
    강수량: string;
    하늘상태: string;
    기온: string;
    습도: string;
  };
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleCityChange = async (selectedOption: any) => {
    setSelectedCity(selectedOption.value.city);
    const res = await fetch(
      `http://localhost:3000/weather?nx=${selectedOption.value.nx}&ny=${selectedOption.value.ny}`
    );
    const data = (await res.json()) as WeatherData;
    setWeatherData(data);
  };

  const cityOptions = [
    { value: { city: "서울", nx: "55", ny: "127" }, label: "서울" },
    { value: { city: "부산", nx: "96", ny: "76" }, label: "부산" },
    { value: { city: "인천", nx: "55", ny: "124" }, label: "인천" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <Head>
        <title>Weather Data Visualization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold pt-9">
          <span className="text-blue-600">날씨 데이터 시각화</span>에 오신 것을
          환영합니다
        </h1>

        <p className="mt-3 text-2xl">날씨를 확인하려면 도시를 선택하세요.</p>

        <div className="flex items-center justify-center mt-4">
          <Select
            options={cityOptions}
            onChange={handleCityChange}
            placeholder="Select a city"
          />
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="p-6 mt-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600">
            {selectedCity ? (
              <div>
                {weatherData && (
                  <>
                    <div
                      className="flex space-x-6 text-xl m-10"
                      style={{ justifyContent: "space-between" }}
                    >
                      {Object.entries(weatherData).map(([time, data]) => {
                        const skyStatus = (data as any)["하늘상태"];
                        const precipitationType = (data as any)["강수형태"];

                        const skySymbols = {
                          맑음: "☀️",
                          구름많음: "⛅",
                          흐림: "☁️",
                        };

                        const precipitationSymbols = {
                          없음: "",
                          비: "🌧️",
                          "비/눈": "🌨️",
                          눈: "❄️",
                          소나기: "🌦️",
                        };

                        return (
                          <span key={time} style={{ margin: "0 10px" }}>
                            <h3>{parseInt(time) / 100}시</h3>
                            <p>
                              {skySymbols[skyStatus]}{" "}
                              {precipitationSymbols[precipitationType]}
                            </p>
                          </span>
                        );
                      })}
                    </div>

                    <h3 className="font-bold pt-3 text-xl">기온</h3>
                    <LineChart
                      width={Object.keys(weatherData).length * 100}
                      height={300}
                      data={Object.entries(weatherData).map(([time, data]) => ({
                        time,
                        temperature: Number(
                          (data as any)["기온"].split(" ")[0]
                        ),
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis
                        domain={["dataMin - 10", "dataMax + 10"]}
                        tickFormatter={(value) => `${value}°C`}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                    <h3 className="font-bold pt-3 text-xl">강수량</h3>
                    <BarChart
                      width={Object.keys(weatherData).length * 100}
                      height={300}
                      data={Object.entries(weatherData).map(([time, data]) => ({
                        time,
                        temperature: Number(
                          (data as any)["기온"].split(" ")[0]
                        ),
                        rainfall: Number((data as any)["강수량"].split(" ")[0]),
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis
                        domain={["dataMin - 10", "dataMax + 10"]}
                        tickFormatter={(value) => `${value}mm`}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rainfall" fill="#00FFFF" />
                    </BarChart>
                    <h3 className="font-bold pt-3 text-xl">습도</h3>
                    <BarChart
                      width={Object.keys(weatherData).length * 100}
                      height={300}
                      data={Object.entries(weatherData).map(([time, data]) => ({
                        time,
                        humidity: Number((data as any)["습도"].split(" ")[0]),
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="humidity" fill="#82ca9d" />
                    </BarChart>
                  </>
                )}
              </div>
            ) : (
              <h3 className="text-2xl">도시를 선택해 주세요</h3>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
