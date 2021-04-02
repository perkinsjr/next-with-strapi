import Image from "next/image";
const Images = ({ image, style }) => {
  return (
    <Image
      src={image.url}
      alt={image.alternativeText || image.name}
      width={500}
      height={300}
      layout="intrinsic"
      loading="lazy"
      className={style}
    />
  );
};

export default Images;
