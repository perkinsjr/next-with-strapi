import { getStrapiMedia } from "@/lib/strapi/media";
import Image from "next/image";
const Images = ({ image, style }) => {
  const imageUrl = getStrapiMedia(image);
  return (
    <Image
      src={imageUrl}
      alt={image.alternativeText || image.name}
      width={500}
      height={300}
      layout="intrinsic"
      loading="lazy"
      style={style}
    />
  );
};

export default Images;
