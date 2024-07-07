import { notFound } from "next/navigation";
import React from "react";
import { MovieDetailsResponse } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";

const PlayVideo = ({
  movie,
  episode,
  server,
}: {
  movie: MovieDetailsResponse;
  episode: string;
  server: string;
}) => {
  const serverNumber = parseInt(server);

  if (
    isNaN(serverNumber) ||
    serverNumber < 0 ||
    serverNumber >= movie.episodes.length
  ) {
    return notFound();
  }

  const episodeNumber =
    episode.toLowerCase() === "full" ? "full" : parseInt(episode);
  const episodeData = movie.episodes[serverNumber].server_data;

  if (
    episodeNumber !== "full" &&
    (isNaN(episodeNumber) ||
      episodeNumber < 1 ||
      episodeNumber > episodeData.length)
  ) {
    return notFound();
  }

  const getEmbedLink = () => {
    if (episodeNumber === "full") {
      return movie.episodes[serverNumber].server_data[0]?.link_embed ?? "";
    }
    return episodeData[episodeNumber - 1]?.link_embed ?? "";
  };

  const renderButtons = () => {
    if (episodeNumber === "full") {
      return (
        <>
          <Button disabled>Tập trước</Button>
          <Button disabled>Tập sau</Button>
        </>
      );
    }
    return (
      <>
        <Button>
          {episodeNumber === 1 ? (
            "Tập trước"
          ) : (
            <Link
              scroll={false}
              href={`/xem-phim/${movie.movie.slug}?episode=${
                episodeNumber - 1
              }&server=${serverNumber}`}
            >
              Tập trước
            </Link>
          )}
        </Button>
        <Button>
          {episodeNumber === episodeData.length ? (
            "Tập sau"
          ) : (
            <Link
              scroll={false}
              href={`/xem-phim/${movie.movie.slug}?episode=${
                episodeNumber + 1
              }&server=${serverNumber}`}
            >
              Tập sau
            </Link>
          )}
        </Button>
      </>
    );
  };

  return (
    <div>
      <div className="bg-background p-2 rounded-md">
        <div className="w-full aspect-video rounded-sm overflow-hidden">
          <iframe
            src={getEmbedLink()}
            title={movie.movie.name}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="p-2 bg-background mt-2 rounded-md flex items-center justify-center gap-2">
        {renderButtons()}
        <Button>Phóng to</Button>
      </div>
    </div>
  );
};

export default PlayVideo;
