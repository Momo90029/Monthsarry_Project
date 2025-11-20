export interface PhotoItem {
  src: string;
  caption: string;
  date: string;
}

/** Auto-import all images from folder */
const imageModules = import.meta.glob<{ default: string }>(
  "../Images/Monthsarry_images/*.{jpg,jpeg,png}",
  { eager: true }
);

const images = Object.values(imageModules).map((m) => m.default);

/** Attach captions & dates manually */
export const photoGalleryData: PhotoItem[] = [
  {
    src: images[0],
    caption: "Our first smile together ❤️",
    date: "February 27, 2025",
  },
  {
    src: images[1],
    caption: "You looked so beautiful here",
    date: "May 24, 2025",
  },
  {
    src: images[2],
    caption: "A memory I will always cherish",
    date: "July 03, 2025",
  },
  {
    src: images[3],
    caption: "Thank you to all the treats you gave lang 💘💘",
    date: "November 06, 2025",
  },
  {
    src: images[4],
    caption: "That time nahulog tah sa buslot sa dalan!!",
    date: "June 03, 2025",
  },
  {
    src: images[5],
    caption: "Thank you sa Support Lang",
    date: "June 07, 2925",
  },
];
