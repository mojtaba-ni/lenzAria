export const shortText = (text, length, appendar) => {
  let textLength = text.length;
  if (textLength > length)
    return text.substring(0, length) + (appendar || "...");
  return text;
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

// const _base64ToArrayBuffer = (base64) => {
//   var binary_string = window.atob(base64);
//   var len = binary_string.length;
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes.buffer;
// };

// export const binaryImageToUrl = (base64) => {
//   var data = _base64ToArrayBuffer(base64);
//   var blob = new Blob([data], { type: "image/png" });
//   var url = URL.createObjectURL(blob);
//   return url;
// };
