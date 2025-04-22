import moment from "moment-jalaali";

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



export const dateFullFilter = function (params) {
  return params && params !== Infinity
    ? moment(params).format("HH:mm  jYYYY/jMM/jDD")
    : "";
};

export const dateFilter = function (params) {
  return params && params !== Infinity
    ? moment(params).format("jYYYY/jMM/jDD")
    : "-";
};

export function commaThousondSeperator(input) {
  let str = isNaN(input) ? input : input.toString();
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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