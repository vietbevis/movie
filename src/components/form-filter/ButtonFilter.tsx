"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const ButtonFilter = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button type="button">
          <LoaderCircle className="animate-spin" />
        </Button>
      ) : (
        <Button type="submit">Lọc Phim</Button>
      )}
    </>
  );
};

export default ButtonFilter;
