import React from "react";
import { cn } from "@/lib/utils";
import { MovieListResponse } from "@/types";
import CardMain from "./CardMain";

interface CardMainProps {
  className?: string;
  data?: MovieListResponse;
}

const CardMainList = ({ className, data }: CardMainProps) => {
  const movies = data?.items || [];
  return (
    <>
      <div className={cn("select-none", className)}>
        {movies.length > 0 ? (
          <>
            {movies?.map((movie: any) => (
              <CardMain key={movie._id} movie={movie} />
            ))}
          </>
        ) : (
          <h1>Không tồn tại phim nào...</h1>
        )}
      </div>
    </>
  );
};

export default CardMainList;
