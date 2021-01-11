/**
 * Changing file to dataURI
 *
 * @function
 * @param {String} file This is file from input control
 * @param {Function} cb This is callback function that returns converted file in a desired format
 * @returns {void}
 */
export const toDataURI = (file, cb) => {
  const reader = new FileReader();
  reader.onloadend = cb;
  reader.readAsDataURL(file);
};

/**
 * Converting base64 to blob
 *
 * @function
 * @param {String} b64Data Base64 item
 * @returns {void}
 */
export const b64toBlob = async (b64Data) => {
  const response = await fetch(b64Data);
  const blob = await response.blob();
  return blob;
};
