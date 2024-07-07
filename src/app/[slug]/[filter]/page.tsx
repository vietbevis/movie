import CardMainList from "@/components/cards/CardMainList";
import NavigationHeader from "@/components/navigation/NavigationHeader";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import { filterIsDisabled, filterMovies } from "@/lib/utils";
import React from "react";
import { SlugType } from "@/types";
import FormFilter from "@/components/form-filter/FormFilter";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    slug: string;
    filter:
      | SlugType
      | "moi-cap-nhat"
      | "series"
      | "single"
      | "trailer"
      | "hoathinh";
  };
  searchParams: {
    page: string;
    category?: string;
    country?: string;
    year?: string;
    type?: string;
    status?: string;
  };
}) => {
  const { data, query } = await filterMovies({ searchParams, params });

  // Generate query string
  const filteredEntries = Object.entries(searchParams).filter(
    ([key, value]) => key !== "page"
  );

  const queryString = filteredEntries
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return (
    <div className="">
      <NavigationHeader categoryOrCountry={query} />
      <div className="my-3 dark:bg-dark1 bg-bgEE p-2 rounded-lg">
        <FormFilter params={params} searchParams={searchParams}></FormFilter>
      </div>
      <CardMainList
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-3"
        data={data}
      />
      <PaginationCustom
        className={"mt-10 mb-5"}
        url={`/${params.slug}/${params.filter}?page=`}
        query={queryString}
        pagination={data?.pagination}
      />
    </div>
  );
};

export default page;
