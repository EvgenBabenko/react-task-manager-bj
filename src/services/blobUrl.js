import resizeImage from '../utils/resizeImage';

export default async (image) => {
  const url = await resizeImage(image);

  const res = await fetch(url);

  const blob = await res.blob();

  return blob;
};
