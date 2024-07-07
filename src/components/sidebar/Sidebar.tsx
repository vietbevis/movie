import React from "react";
import { Button } from "../ui/button";
import CardSecondary from "../cards/CardSecondary";
import { MovieListResponse } from "@/types";
import Divider from "../divider/Divider";
import Link from "next/link";

const Sidebar = ({
  data,
  title,
  url,
}: {
  data: MovieListResponse;
  title?: string;
  url?: string;
}) => {
  return (
    <div className="dark:bg-dark1 bg-bgEE p-2 rounded-lg">
      <div className="bg-background rounded-md">
        <div className="flex items-center justify-between p-2 pl-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button size={"sm"} variant={"ghost"}>
            <Link href={url || "#"}>Tất cả</Link>
          </Button>
        </div>
        <Divider></Divider>
        <div className="grid xl:grid-cols-1 md:grid-cols-2 grid-cols-1">
          {data &&
            data?.items
              .map((item) => <CardSecondary key={item._id} item={item} />)
              .slice(0, 8)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
