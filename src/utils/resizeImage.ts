/**
 * Resize image
 * @param {string} dataUrl
 * @param {string} type
 * @param {number} maxSize
 */
export const resizeImage = (
  dataUrl: string,
  type?: string,
  maxSize: number = 1000
): Promise<string> => {
  const img = document.createElement("img");
  img.src = dataUrl;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // console.log(img.height);
      const canvas = document.createElement("canvas");
      const max = img.height > img.width ? img.height : img.width;
      if (max > maxSize) {
        canvas.height = (img.height / max) * maxSize;
        canvas.width = (img.width / max) * maxSize;

        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.scale(maxSize / max, maxSize / max);
        context.drawImage(img, 0, 0);
        // return canvas.toDataURL();
        resolve(canvas.toDataURL(type, 0.5));
      } else {
        // return dataUrl;
        resolve(dataUrl);
      }
    };
  });
};

export const base64MimeType = (encoded: string) => {
  let result = null;

  if (typeof encoded !== "string") {
    return result;
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
};

// function compressImageInDB(
//   postImageSnapShot: any,
//   postImageRef: any,
//   setState: any
// ) {
//   // compress images in database
//   resizeImage(
//     postImageSnapShot.val(),
//     base64MimeType(postImageSnapShot.val()) || "image/png"
//   ).then((dataUrl) => {
//     postImageRef.set(dataUrl).then(() => {
//       setState({ postImage: dataUrl, loadingImage: false });
//     });
//   });
// }
