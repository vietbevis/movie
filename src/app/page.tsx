import { handleMovies } from "@/apiRequest";
import CardMainList from "@/components/cards/CardMainList";
import CarouselSmall from "@/components/carousel/CarouselSmall";
import MoviesSlider from "@/components/carousel/MoviesSlider";
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const [carousel, movies, trailer, single] = await Promise.all([
    handleMovies({ page: 1, limit: 24, type: "hoathinh" }),
    handleMovies({ page: 1, limit: 50 }),
    handleMovies({ page: 1, limit: 24, status: "trailer" }),
    handleMovies({ page: 1, limit: 24, type: "single" }),
  ]);

  return (
    <>
      <div className="dark:bg-dark1 bg-bgEE rounded-lg p-2 mb-3">
        <div className="px-2 py-3 rounded-md text-center space-y-2 bg-background lg:text-base text-xs">
          <h1>Chào mừng đến với web xem phim online</h1>
          <h1>Phát triển bởi VIET_NGUYEN</h1>
          <h1>Cảm ơn các bạn đã ghé xem ❤️</h1>
        </div>
      </div>
      <CarouselSmall data={carousel} />
      <div className="xl:grid grid-cols-7 gap-3 mt-3">
        <div className="col-span-5 mb-3">
          <MoviesSlider data={movies} />
          <div className="flex justify-between items-center mt-3">
            <Button variant={"destructive"} className="p-0">
              <Link href={"/the-loai/moi-cap-nhat"} className="px-4">
                Phim mới cập nhật
              </Link>
            </Button>
            <Button variant={"ghost"}>
              <Link href={`/the-loai/moi-cap-nhat`} className="text-sm">
                Tất cả
              </Link>
            </Button>
          </div>
          <CardMainList
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 mt-3"
            data={movies}
          />
          <div className="flex items-center justify-center mt-3">
            <Button>
              <Link href={"/the-loai/moi-cap-nhat"}>Xem thêm</Link>
            </Button>
          </div>
        </div>
        <div className="space-y-3 col-span-2">
          <Sidebar
            data={trailer}
            title={"Phim sắp chiếu"}
            url="/the-loai/trailer"
          />
          <Sidebar data={single} title={"Phim lẻ hot"} url="/the-loai/single" />
        </div>
      </div>
    </>
  );
}
