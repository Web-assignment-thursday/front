import { useState } from "react";
import Head from "next/head";
import Select from "react-select";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);

  const [weatherData, setWeatherData] = useState(null); // Add this line

  const handleCityChange = async (selectedOption: any) => {
    setSelectedCity(selectedOption.value.city);
    const res = await fetch(
      `http://localhost:3000/weather?nx=${selectedOption.value.nx}&ny=${selectedOption.value.ny}`
    );
    const data = await res.json();
    setWeatherData(data);
  };

  const cityOptions = [
    { value: { city: "서울", nx: "55", ny: "127" }, label: "서울" },
    { value: { city: "부산", nx: "96", ny: "76" }, label: "부산" },
    { value: { city: "인천", nx: "55", ny: "124" }, label: "City 3" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Weather Data Visualization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          <span className="text-blue-600">날씨 데이터 시각화</span>에 오신 것을
          환영합니다
        </h1>

        <p className="mt-3 text-2xl">날씨 데이터를 보려면 도시를 선택하세요.</p>

        <div className="flex items-center justify-center mt-4">
          <Select
            options={cityOptions}
            onChange={handleCityChange}
            placeholder="Select a city"
          />
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            {selectedCity ? (
              <div>
                <h3 className="text-2xl font-bold">
                  {selectedCity}의 날씨 데이터입니다:
                </h3>
                <pre>{JSON.stringify(weatherData, null, 2)}</pre>
              </div>
            ) : (
              <h3 className="text-2xl font-bold">도시를 선택해 주세요</h3>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
