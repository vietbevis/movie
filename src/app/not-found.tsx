"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Divider from "@/components/divider/Divider";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "We're sorry, this page is unknown or does not exist the page you are looking for.",
};

const NotFound = () => {
  const router = useRouter();
  return (
    <div
      className={
        "flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 container min-w-96"
      }
    >
      <div
        className={
          "max-w-[700px] flex flex-col md:flex-row items-center justify-center text-center gap-5 lg:gap-10 mx-auto"
        }
      >
        <div className={"text-7xl lg:text-9xl font-bold"}>404</div>
        <Divider layout={"vertical"} className={"h-48 hidden md:block"} />
        <Divider className={"w-48 md:hidden"} />
        <div className={"space-y-2"}>
          <h1 className={"text-3xl font-bold"}>Page Not Found</h1>
          <p className={"text-gray-500"}>
            We&apos;re sorry, this page is unknown or does not exist the page
            you are looking for.
          </p>
          <div className={"h-2"}></div>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
