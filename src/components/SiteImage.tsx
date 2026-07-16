import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "width" | "height" | "alt"> & {
  alt: string;
  width?: number;
  height?: number;
};

export default function SiteImage({
  alt,
  width = 1600,
  height = 1200,
  sizes = "(min-width: 1240px) 33vw, (min-width: 720px) 50vw, 100vw",
  ...props
}: SiteImageProps) {
  return <Image alt={alt} width={width} height={height} sizes={sizes} {...props} />;
}
