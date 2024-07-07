import React from "react";
import ToogleDarkMode from "../toogle-darkmode";
import Search from "../search/Search";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../logo/Logo";
import MenuMobile from "./MenuMobile";
import MenuLink from "./MenuLink";

const Header = () => {
  return (
    <>
      <header className="flex gap-2 mb-3 items-center container h-20 dark:bg-dark1 bg-bgEE min-w-96">
        <div className="block lg:hidden">
          <MenuMobile />
        </div>
        <h1 className="font-bold text-2xl">
          <Logo
            name="vitflix"
            classNameContainer="flex items-center gap-3 text-2xl font-bold"
            classNameBrand="hidden xl:block uppercase"
            classNameImg="w-12 h-12 md:w-14 md:h-14"
          />
        </h1>
        <div className="mx-auto lg:block hidden">
          <MenuLink />
        </div>
        <div className="flex items-center gap-2 lg:ml-0 ml-auto">
          <Search />
          <ToogleDarkMode />
          <Button className="h-10">
            <Link href={"/login"}>Đăng nhập</Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
