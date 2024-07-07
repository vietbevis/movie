import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import checkImage from "@/lib/utils";
import { Episode, MovieDetailsResponse, ServerData } from "@/types";
import PlayVideo from "../player/PlayVideo";

// import { Star } from "lucide-react";

const MovieDetails = async ({
  movieDetail,
  searchParams,
}: {
  movieDetail: MovieDetailsResponse;
  searchParams: {
    episode: string;
    server: string;
  };
}) => {
  const movie = movieDetail?.movie;

  const director = movie?.director?.join(", ") ?? "";
  const category =
    movie?.category?.map((item: any) => item.name).join(", ") ?? "";
  const actor = movie?.actor?.join(", ") ?? "";
  const country =
    movie?.country?.map((item: any) => item.name).join(", ") ?? "";

  const isActiveEpisode = (episode: string, server: string) => {
    if (searchParams?.episode === episode && searchParams?.server === server) {
      return true;
    }
    return false;
  };

  return (
    <div className="col-span-3">
      {searchParams?.episode ? (
        <PlayVideo
          movie={movieDetail}
          episode={searchParams.episode}
          server={searchParams.server}
        />
      ) : (
        <div className="bg-background p-2 rounded-md xl:flex gap-4 items-start">
          <div className="space-y-3">
            <div className="sm:w-80 w-full aspect-[3/4] rounded-sm overflow-hidden mx-auto mb-4 xl:mb-0 relative">
              <Image
                src={checkImage(movie?.thumb_url)}
                fill
                alt=""
                quality={100}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-dark1 bg-opacity-50 flex items-center p-4 gap-3">
                <Button variant={"outline"} className="w-full">
                  <Link href={`${movie?.trailer_url}`} target={"_blank"}>
                    Trailer
                  </Link>
                </Button>
                <Button className="w-full">
                  <Link
                    href={`/xem-phim/${movie?.slug}?episode=${
                      movieDetail?.episodes[0].server_data.length === 1
                        ? movieDetail?.episodes[0].server_data[0].slug
                        : "1"
                    }&server=0`}
                  >
                    Xem phim
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="lg:text-3xl text-2xl uppercase xl:text-left text-center text-foreground dark:text-yellowFF font-semibold line-clamp-3">
              {movie?.name}
            </h1>
            <p className="opacity-50">
              {movie?.origin_name} ({movie?.year})
            </p>
            <div className="py-2 px-3 mt-3 space-y-2 rounded-sm lg:text-base text-sm">
              <p>
                <span className="font-semibold opacity-50">Trạng thái:</span>{" "}
                <span className="bg-background px-2">
                  {movie?.episode_current}
                </span>
              </p>
              <p>
                <span className="font-semibold opacity-50">Đạo diễn:</span>{" "}
                {director}
              </p>
              <p>
                <span className="font-semibold opacity-50">Thời lương:</span>{" "}
                {movie?.time}
              </p>
              <p>
                <span className="font-semibold opacity-50">Số tập:</span>{" "}
                {movie?.episode_total}
              </p>
              <p>
                <span className="font-semibold opacity-50">Tình trạng:</span>{" "}
                {movie?.status === "completed" ? "Hoàn thành" : "Đang cập nhật"}
              </p>
              <p>
                <span className="font-semibold opacity-50">Ngôn ngữ:</span>{" "}
                {movie?.lang}
              </p>
              <p>
                <span className="font-semibold opacity-50">Năm sản xuất:</span>{" "}
                {movie?.year}
              </p>
              <p>
                <span className="font-semibold opacity-50">Quốc gia:</span>{" "}
                {country}
              </p>
              <p>
                <span className="font-semibold opacity-50">Thể loại:</span>{" "}
                {category}
              </p>
              <p>
                <span className="font-semibold opacity-50">Diễn viên:</span>{" "}
                {actor}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="border border-yellowFF p-3 bg-background mt-3 rounded-md">
        <span className="uppercase font-semibold">LỊCH CHIẾU: </span>Đang cập
        nhật
      </div>
      <div className="p-3 mt-3 bg-background rounded-md">
        <Tabs defaultValue={searchParams.server ?? "0"}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="uppercase font-semibold text-lg">
              TẬP MỚI NHẤT :
            </span>
            <TabsList>
              {movieDetail?.episodes.map((server: Episode, index: number) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {/* {server.server_name} */}
                  Server {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {movieDetail?.episodes.map(
            (server: Episode, server_index: number) => (
              <TabsContent
                value={server_index.toString()}
                key={server_index}
                className="flex flex-wrap gap-1 max-h-96 overflow-scroll scroll-hidden w-full"
              >
                {server.server_data
                  .map((item: ServerData, index: number) => (
                    <Button
                      key={index}
                      title={item.name}
                      variant={"outline"}
                      className={`size-10 dark:bg-gray-700 dark:hover:bg-gray-800 p-0 ${
                        isActiveEpisode(
                          (index + 1).toString(),
                          server_index.toString()
                        ) && "!bg-yellowFF text-background"
                      }`}
                    >
                      <Link
                        href={`/xem-phim/${
                          movie?.slug
                        }?episode=${item.slug.replace(
                          /^tap-/,
                          ""
                        )}&server=${server_index}`}
                        className="w-full h-full leading-10 text-center"
                      >
                        {index + 1}
                      </Link>
                    </Button>
                  ))
                  .reverse()}
              </TabsContent>
            )
          )}
        </Tabs>
      </div>
      <div className="bg-background p-3 mt-3 rounded-md">
        <p className="uppercase font-semibold text-xl">NỘI DUNG PHIM</p>
        <p className="capitalize font-semibold mt-2 mb-1 opacity-50">
          {movie?.name} - {movie?.origin_name} ({movie?.year})
        </p>
        <p className="opacity-50">{movie?.content}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
