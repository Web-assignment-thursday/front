import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Weather Data Visualization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="text-blue-600">Weather Data Visualization</span>
        </h1>

        <p className="mt-3 text-2xl">Select a city to view its weather data:</p>

        <div className="flex items-center justify-center mt-4">
          <select className="border border-blue-300 p-2 rounded-md">
            <option>Select a city</option>
            <option>City 1</option>
            <option>City 2</option>
            <option>City 3</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Graph will be displayed here</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
