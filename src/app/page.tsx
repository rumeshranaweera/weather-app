import DisplayData from "@/components/displayData";
import ForecastData from "@/components/forecastData";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";

type params = { searchParams: { lat: string; lon: string } };
export default async function Home({ searchParams }: params) {
  return (
    <main className="container mx-auto my-2 space-y-3">
      <header className="my-10">
        <Header />
      </header>
      <div className="gird place-items-center">
        <SearchBar />
      </div>

      <section>
        <h2 className="font-bold text-2xl sm:text-3xl">Today Weather </h2>
        <DisplayData />
      </section>

      <section>
        <h2 className="font-bold text-2xl sm:text-3xl">forecast data</h2>
        <ForecastData />
      </section>
    </main>
  );
}
