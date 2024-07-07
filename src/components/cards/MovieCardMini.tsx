import checkImage from "@/lib/utils";
import { MovieChildResponse } from "@/types";
import { PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCardMini = ({ data }: { data: MovieChildResponse }) => {
  return (
    <div
      className="w-full h-full rounded-sm overflow-hidden relative group select-none aspect-[5/7]"
      title={data?.name}
    >
      <Image
        src={checkImage(data?.thumb_url)}
        alt=""
        width={500}
        height={700}
        quality={100}
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center bg-gradient-to-t from-[#000000d3] bg-opacity-50 text-white px-3 text-center group-hover:opacity-0 transition-all duration-300">
        <div className="text-sm font-bold line-clamp-2">{data?.name}</div>
      </div>
      <Link
        href={`/xem-phim/${data?.slug}`}
        className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-0 flex items-center justify-center group-hover:bg-opacity-60 transition-all duration-300"
      >
        <PlayCircleIcon
          size={40}
          className="text-white group-hover:scale-100 scale-0 transition-all duration-300"
          strokeWidth={1}
        />
        <div className="absolute top-2 left-0 bg-black bg-opacity-60 pointer-events-none rounded-r-sm p-1 ">
          <span className="text-white text-xs px-1 line-clamp-1">
            {data?.episode_current}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default MovieCardMini;
