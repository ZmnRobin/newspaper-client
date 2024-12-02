// Formated date
export const formatedDate = (date:Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

export const convertDateFormat=(date:string)=>{
  let currentDate = new Date(date);
  return currentDate.toDateString();
}

export const getImageSrc = (thumbnail: string) => {
  // If the thumbnail is an external URL, return it as is
  if (thumbnail.startsWith('http')) {
    return thumbnail;
  }
  // If the thumbnail is a local file (e.g., starts with '/uploads'), prepend the backend URL
  return `http://localhost:5000${thumbnail}`; // Adjust the base URL if needed
};
