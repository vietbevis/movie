import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCardMini from "../cards/MovieCardMini";
import { MovieChildResponse, MovieListResponse } from "@/types";
import { cn } from "@/lib/utils";

const CarouselSmall = ({
  data,
  className,
}: {
  data?: MovieListResponse;
  className?: string;
}) => {
  const movieList: MovieChildResponse[] = data?.items || [];
  return (
    <div className="dark:bg-dark1 bg-bgEE rounded-lg p-2">
      <div className="bg-background rounded-md p-2 overflow-hidden">
        <Carousel>
          <CarouselContent>
            {movieList?.map((item) => (
              <CarouselItem
                key={item._id}
                className={cn(
                  "lg:basis-1/6 md:basis-1/4 sm:basis-1/3 basis-1/2",
                  className
                )}
              >
                <MovieCardMini data={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-transparent border-none h-full rounded-none hover:bg-[#ffffff11]" />
          <CarouselNext className="right-0 bg-transparent border-none h-full rounded-none hover:bg-[#ffffff11]" />
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSmall;
