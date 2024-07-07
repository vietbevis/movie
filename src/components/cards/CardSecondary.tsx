import checkImage, { cn } from "@/lib/utils";
import { MovieChildResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardSecondary = ({
  item,
  className,
}: {
  item: MovieChildResponse;
  className?: string;
}) => {
  return (
    <Link
      href={`/xem-phim/${item.slug}`}
      className={cn(
        "flex items-center gap-2 bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer p-2 rounded-md transition-all",
        className
      )}
    >
      <Image
        src={checkImage(item.poster_url)}
        alt={item.name}
        width={56}
        height={56}
        className="size-14 rounded-md object-cover"
      />
      <div>
        <h3 className="font-medium line-clamp-1">{item.name}</h3>
        <p className="text-sm line-clamp-1">{item.origin_name}</p>
      </div>
    </Link>
  );
};

export default CardSecondary;
