import { handleMovieDetail, handleMovies } from "@/apiRequest";
import CarouselSmall from "@/components/carousel/CarouselSmall";
import MovieDetails from "@/components/movie/MovieDetails";
import NavigationHeader from "@/components/navigation/NavigationHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import React from "react";
import testAnh from "../../../../public/avatar.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

//export async function generateStaticParams() {
//  const paths: { slug: string }[] = [];

//  const requests = [
//    handleMovies({ page: 1, limit: 50 }),
//    handleMovies({ page: 1, limit: 24, status: "trailer" }),
//    handleMovies({ page: 1, limit: 24, type: "series" }),
//    handleMovies({ page: 1, limit: 24, type: "single" }),
//  ];

//  const allResponses = await Promise.all(requests);

//  allResponses.forEach((response) => {
//    response.items.forEach((item) => {
//      paths.push({ slug: item.slug });
//    });
//  });

//  return paths;
//}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { episode: string };
}): Promise<Metadata> {
  const response = await handleMovieDetail(params.slug);
  const defaultTitle = `${response?.movie?.name} - ${response?.movie?.origin_name} - VITFLIX`;
  if (searchParams.episode) {
    return {
      title: `Tập ${searchParams.episode} - ${defaultTitle}` || "",
    };
  }
  return {
    title: defaultTitle || "",
  };
}

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    episode: string;
    server: string;
  };
}) => {
  const [movieDetail, trailer, single, news] = await Promise.all([
    handleMovieDetail(params.slug),
    handleMovies({ page: 1, limit: 24, status: "trailer" }),
    handleMovies({ page: 1, limit: 24, type: "single" }),
    handleMovies({ page: 1, limit: 24 }),
  ]);
  if (!movieDetail.status) {
    return notFound();
  }
  return (
    <div>
      <NavigationHeader
        nameMovie={movieDetail?.movie}
        episode={searchParams.episode}
      />
      <div className="lg:gap-3 items-start grid grid-cols-7 mt-3">
        <div className="dark:bg-dark1 bg-bgEE p-2 rounded-lg flex-1 xl:col-span-5 col-span-7">
          <MovieDetails movieDetail={movieDetail} searchParams={searchParams} />
          {/* Comment */}
          <div className="bg-background p-3 mt-2 rounded-md">
            <p className="text-xl font-semibold uppercase">Bình luận</p>
            <div className="flex gap-3 mt-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testAnh}
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex-1">
                <div
                  className="dark:bg-dark1 bg-bgEE
                 p-2 rounded-md space-y-2"
                >
                  <p className="font-semibold">Nguyễn Văn A</p>
                  <p className="opacity-50">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background p-2 mt-2 rounded-md">
            <div className="flex items-center mb-2 pl-1 pt-1 justify-between">
              <p className="uppercase font-semibold text-xl">Phim đề cử</p>
              <Button variant={"ghost"} size={"sm"}>
                <Link href={"/the-loai/moi-cap-nhat"}>Tất cả</Link>
              </Button>
            </div>
            <CarouselSmall
              data={news}
              className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-1/2"
            />
          </div>
        </div>
        <div className="xl:col-span-2 xl:mt-0 mt-3 col-span-7 space-y-3">
          <Sidebar
            data={trailer}
            title={"Phim sắp chiếu"}
            url="/the-loai/trailer"
          />
          <Sidebar data={single} title={"Phim lẻ hot"} url="/the-loai/single" />
        </div>
      </div>
    </div>
  );
};

export default page;
