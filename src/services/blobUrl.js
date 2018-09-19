import b64toBlob from './b64toBlob';
import resizeImageBeforeUpload from './resizeImageBeforeUpload';

export default async (image) => {
  const url = await resizeImageBeforeUpload(image);

  console.log(url);

  const res = await fetch(url);

  const blob = await res.blob();

  console.log(blob);
  return blob;

  // const contentType = 'image/png';
  // const b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  // const blob = b64toBlob(b64Data, contentType);

  // return URL.createObjectURL(blob);
};
