import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";
import Link from "next/link";

interface LogoProps {
  classNameContainer?: string;
  classNameImg?: string;
  classNameBrand?: string;
  name?: string;
}

const Logo = ({
  classNameContainer,
  classNameImg,
  classNameBrand,
  name,
}: LogoProps) => {
  return (
    <Link href={"/"} className={classNameContainer}>
      <Image
        src={logo}
        alt=""
        width={54}
        height={54}
        priority
        className={classNameImg}
      />
      <span className={classNameBrand}>{name}</span>
    </Link>
  );
};

export default Logo;
