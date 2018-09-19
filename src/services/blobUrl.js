import resizeImageBeforeUpload from './resizeImageBeforeUpload';

export default async (image) => {
  const url = await resizeImageBeforeUpload(image);

  const res = await fetch(url);

  const blob = await res.blob();

  return blob;
};
