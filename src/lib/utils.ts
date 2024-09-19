import { handleMovies } from "@/apiRequest";
import { categories, countries } from "@/constants";
import { MovieListResponse } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function checkImage(url: string) {
  return url?.startsWith("https://apii.online/storage/images/")
    ? url
    : `https://apii.online/storage/images/${url}`;
}

export async function filterMovies({
  searchParams,
  params,
}: {
  searchParams: {
    page?: string;
    category?: string;
    country?: string;
    year?: string;
    type?: string;
    status?: string;
  };
  params: { slug: string; filter: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  let data: MovieListResponse | undefined = undefined;
  let query = "";
  if (params.slug === "the-loai") {
    if (params.filter === "moi-cap-nhat") {
      query = "Phim mới cập nhật";
      const res = await handleMovies({
        page: currentPage,
        limit: 50, // Vô nghĩa với phim mới cập nhật
        category: searchParams.category,
        country: searchParams.country,
        year: searchParams.year,
        type: searchParams.type as any,
        status: searchParams.status as any,
      });
      data = res;
    } else if (params.filter === "trailer") {
      query = "Trailer";
      const res = await handleMovies({
        page: currentPage,
        limit: 24,
        status: params.filter,
        category: searchParams.category,
        country: searchParams.country,
        year: searchParams.year,
        type: searchParams.type as any,
      });
      data = res;
    } else if (
      params.filter === "series" ||
      params.filter === "single" ||
      params.filter === "hoathinh"
    ) {
      switch (params.filter) {
        case "series":
          query = "Phim bộ";
          break;
        case "single":
          query = "Phim lẻ";
          break;
        case "hoathinh":
          query = "Phim hoạt hình";
          break;
        default:
          break;
      }
      const res = await handleMovies({
        page: currentPage,
        limit: 24,
        type: params.filter,
        category: searchParams.category,
        country: searchParams.country,
        year: searchParams.year,
        status: searchParams.status as any,
      });
      data = res;
    } else {
      query =
        categories.find((item) => item.slug === `/the-loai/${params.filter}`)
          ?.name || "";
      const res = await handleMovies({
        page: currentPage,
        limit: 24,
        category: params.filter,
        country: searchParams.country,
        year: searchParams.year,
        type: searchParams.type as any,
        status: searchParams.status as any,
      });
      data = res;
    }
  } else {
    query =
      countries.find((item) => item.slug === `/quoc-gia/${params.filter}`)
        ?.name || "";
    const res = await handleMovies({
      page: currentPage,
      limit: 24,
      country: params.filter,
      category: searchParams.category,
      year: searchParams.year,
      type: searchParams.type as any,
      status: searchParams.status as any,
    });
    data = res;
  }
  return { data, query };
}

export const filterIsDisabled = (params: { filter: string }) => {
  const { filter } = params;

  // Tìm category và country
  const categoryIsExists = categories.find(
    (c) => c.slug === `/the-loai/${filter}`
  );
  const countryIsExists = countries.find(
    (c) => c.slug === `/quoc-gia/${filter}`
  );

  // Xác định typeIsDisabled
  let typeIsDisabled: {
    name?: string;
    disabled?: boolean;
  } = {};
  const typeMap: { [key: string]: string } = {
    series: "Phim bộ",
    single: "Phim lẻ",
    hoathinh: "Hoạt hình",
  };

  if (typeMap[filter]) {
    typeIsDisabled = {
      name: typeMap[filter],
      disabled: true,
    };
  }

  // Xác định statusIsDisabled
  let statusIsDisabled: {
    name?: string;
    disabled?: boolean;
  } = {};
  const statusMap: { [key: string]: string } = {
    trailer: "Trailer",
    ongoing: "Đang cập nhật",
    completed: "Hoàn thành",
  };
  if (statusMap[filter]) {
    statusIsDisabled = {
      name: statusMap[filter],
      disabled: true,
    };
  }

  return {
    categoryIsDisabled: {
      name: categoryIsExists?.name,
      disabled: Boolean(categoryIsExists),
    },
    countryIsDisabled: {
      name: countryIsExists?.name,
      disabled: Boolean(countryIsExists),
    },
    typeIsDisabled,
    statusIsDisabled,
  };
};
