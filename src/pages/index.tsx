import { useState } from "react";
import Head from "next/head";
import Select from "react-select";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption.value);
  };

  const cityOptions = [
    { value: "City 1", label: "City 1" },
    { value: "City 2", label: "City 2" },
    { value: "City 3", label: "City 3" },
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
              <h3 className="text-2xl font-bold">
                {selectedCity}의 날씨 데이터가 이 곳으로 들어올 겁니다.
              </h3>
            ) : (
              <h3 className="text-2xl font-bold">도시를 선택해 주세요</h3>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
