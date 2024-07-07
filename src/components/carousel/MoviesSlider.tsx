import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import checkImage from "@/lib/utils";
import {
  CalendarDays,
  Clapperboard,
  Clock,
  Play,
  Star,
  UserRound,
  Video,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { MovieDetailsResponse, MovieListResponse } from "@/types";
import { handleMovieDetail } from "@/apiRequest";

const MoviesSlider = async ({ data }: { data?: MovieListResponse }) => {
  const arr = Array.from({ length: 5 });
  const items = data?.items.slice(0, 5);
  const movies = items
    ? await Promise.all(items.map((item: any) => handleMovieDetail(item.slug)))
    : [];

  return (
    <div className="rounded-lg overflow-hidden p-2 bg-bgEE dark:bg-dark1 relative lg:block hidden">
      <Carousel>
        <CarouselContent>
          {movies &&
            movies?.map((item: MovieDetailsResponse, index: number) => (
              <CarouselItem key={item.movie._id}>
                <div className="rounded-md overflow-hidden">
                  <div className="relative select-none">
                    <div className="max-h-[400px] h-full overflow-hidden">
                      <Image
                        src={checkImage(item.movie.poster_url)}
                        alt=""
                        width={1920}
                        height={1080}
                        quality={100}
                        className="h-full max-h-[400px] w-full object-cover"
                      />
                    </div>
                    <div className="absolute top-0 bottom-0 left-0 right-0 pl-16 xl:pt-10 pt-6 bg-gradient-to-r from-[#000000e7] to-[#61616162]">
                      <div className="xl:w-8/12 lg:w-5/6 flex flex-col xl:gap-4 lg:gap-2 text-white">
                        <h1 className="text-3xl font-bold line-clamp-2 capitalize">
                          {item.movie.name}
                        </h1>
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="flex items-center gap-1 text-greenB5">
                            <Star width="15" height="14" color="#b5e745" />
                            {parseFloat(item.movie.tmdb?.vote_average).toFixed(
                              1
                            ) === "NaN"
                              ? "N/a"
                              : parseFloat(
                                  item.movie.tmdb?.vote_average
                                ).toFixed(1)}
                          </span>
                          <span className="flex items-center gap-1 text-white">
                            <Clock width="15" height="14" color="#ffffff80" />
                            {item.movie.episode_current?.slice(4) +
                              "/" +
                              (item.movie.episode_total || "???")}
                          </span>
                          <span className="flex items-center gap-1 text-white">
                            <CalendarDays
                              width="15"
                              height="14"
                              color="#ffffff80"
                            />
                            {item.movie.year}
                          </span>
                        </div>
                        <p className="line-clamp-2">{item.movie.content}</p>
                        <div>
                          <p className="text-sm flex items-center gap-1 line-clamp-1 w-8/12">
                            <Video size={16} color="#b5e745" />
                            <span className="font-bold">Lượt xem: </span>
                            {item.movie.view}
                          </p>
                          <p className="text-sm flex items-center gap-1 line w-8/12">
                            <Clapperboard size={16} color="#b5e745" />
                            <span className="font-bold">Thể loại: </span>
                            <span className="line-clamp-1 flex-1">
                              {item.movie.category
                                ?.map((item: any) => item.name)
                                .join(", ")}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {arr.map((_, index) => (
                            <div
                              key={index}
                              className="xl:size-12 size-10 flex items-center justify-center rounded-full bg-black bg-opacity-50"
                            >
                              {index + 1 === arr.length ? "..." : <UserRound />}
                            </div>
                          ))}
                        </div>
                        <Button
                          className="capitalize flex-none w-36 p-0"
                          variant={"destructive"}
                        >
                          <Link
                            href={`/xem-phim/${item.movie.slug}`}
                            className="flex items-center justify-center gap-1 w-full h-full"
                          >
                            Xem phim
                            <Play size={20} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-0 bg-transparent border-none h-full rounded-none
          hover:bg-[#ffffff11]"
        />
        <CarouselNext className="right-0 bg-transparent border-none h-full rounded-none hover:bg-[#ffffff11]" />
      </Carousel>
    </div>
  );
};

export default MoviesSlider;
