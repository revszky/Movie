import React from "react";
import { Metadata } from "next";
import AllSearch from "@/app/components/search/AllSearch";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { s?: string };
}): Promise<Metadata> {
  const query = searchParams?.s || "";
  return {
    title: query ? `${query} • KYMOVIES` : "Search • KYMOVIES",
  };
}

const Page = () => {
  return (
    <main>
      <section className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <AllSearch />
        </div>
      </section>
    </main>
  );
};

export default Page;
