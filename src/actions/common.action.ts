"use server";
import { redirect } from "next/navigation";

export const handleFilterChange = async (e: any, path: string) => {
  const query = new URLSearchParams();

  for (const [key, value] of e) {
    if (value !== "null" && value !== "") {
      query.append(key, value);
    }
  }

  if (query.toString() === "") {
    redirect(path);
  } else {
    redirect(`${path}?page=1&limit=24&${query.toString()}`);
  }
};
