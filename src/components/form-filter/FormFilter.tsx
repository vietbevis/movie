import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { categories, countries } from "@/constants";
import { handleFilterChange } from "@/actions/common.action";
import { SlugType } from "@/types";
import { filterIsDisabled } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import ButtonFilter from "./ButtonFilter";

const FormFilter = ({
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
  const {
    categoryIsDisabled,
    countryIsDisabled,
    typeIsDisabled,
    statusIsDisabled,
  } = filterIsDisabled(params);
  return (
    <form
      action={async (e: FormData) => {
        "use server";
        await handleFilterChange(e, `/${params.slug}/${params.filter}`);
      }}
      className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2"
    >
      {/* Thể loại */}
      <Select
        name="category"
        defaultValue={searchParams.category ?? ""}
        disabled={categoryIsDisabled.disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={categoryIsDisabled.name ?? "Thể loại"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null" className="font-medium">
              {categoryIsDisabled.name ?? "Thể loại"}
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug.replace("/the-loai/", "")}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Quốc gia */}
      <Select
        name="country"
        defaultValue={searchParams.country ?? ""}
        disabled={countryIsDisabled.disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={countryIsDisabled.name ?? "Quốc gia"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null" className="font-medium">
              {countryIsDisabled.name ?? "Quốc gia"}
            </SelectItem>
            {countries.map((country) => (
              <SelectItem
                key={country.id}
                value={country.slug.replace("/quoc-gia/", "")}
              >
                {country.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Năm sản xuất */}
      <Select name="year" defaultValue={searchParams.year ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder={searchParams.year ?? "Năm sản xuất"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null" className="font-medium">
              Năm sản xuất
            </SelectItem>
            {Array.from({ length: 2024 - 1977 + 1 }, (_, i) => (
              <SelectItem key={i} value={(i + 1977).toString()}>
                {i + 1977}
              </SelectItem>
            )).reverse()}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Loại phim */}
      <Select
        name="type"
        defaultValue={searchParams?.type ?? ""}
        disabled={typeIsDisabled.disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={typeIsDisabled.name ?? "Loại phim"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null" className="font-medium">
              Loại phim
            </SelectItem>
            <SelectItem value="single">Phim Lẻ</SelectItem>
            <SelectItem value="series">Phim Bộ</SelectItem>
            <SelectItem value="hoathinh">Hoạt hình</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Trạng thái */}
      <Select
        name="status"
        defaultValue={searchParams?.status ?? ""}
        disabled={statusIsDisabled.disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={statusIsDisabled.name ?? "Trạng thái"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null" className="font-medium">
              Trạng thái
            </SelectItem>
            <SelectItem value="completed">Hoàn thành</SelectItem>
            <SelectItem value="ongoing">Đang cập nhật</SelectItem>
            <SelectItem value="trailer">Trailer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ButtonFilter></ButtonFilter>
    </form>
  );
};

export default FormFilter;
