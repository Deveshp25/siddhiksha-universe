import { getAsset, type SiteAssetKey } from "@/lib/assets";

export type GalleryItem = {
  id: string;
  image: string;
  blurDataURL: string;
  title: string;
  description: string;
  category: string;
  date: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square" | "feature";
};

function imageAsset(key: SiteAssetKey) {
  const asset = getAsset(key);

  return {
    image: asset.jpg,
    blurDataURL: asset.blur,
  };
}

export const galleryItems: GalleryItem[] = [
  {
    id: "hero-portrait",
    ...imageAsset("hero-portrait"),
    title: "Portrait In Warm Light",
    description: "A quiet portrait of Siddhiksha, carrying the warmth and stillness of her creative world.",
    category: "Portrait",
    date: "Author",
    alt: "Portrait of Siddhiksha Patel in warm indoor light.",
    aspect: "portrait",
  },
  {
    id: "writing-moment",
    ...imageAsset("writing-moment"),
    title: "The Writing Hour",
    description: "A focused moment at the page, where characters and worlds begin as handwritten thoughts.",
    category: "Writing",
    date: "Creative Process",
    alt: "Siddhiksha Patel writing in a notebook.",
    aspect: "feature",
  },
  {
    id: "whispers-cover",
    ...imageAsset("whispers-of-elvoria-cover"),
    title: "Whispers of Elvoria",
    description: "The published world of magic, myth, mystery, friendship, and hidden power.",
    category: "Books",
    date: "Book One",
    alt: "Cover of Whispers of Elvoria by Siddhiksha Patel.",
    aspect: "portrait",
  },
  {
    id: "statue-evening",
    ...imageAsset("statue-evening"),
    title: "Standing Before Giants",
    description: "A cinematic travel memory with scale, shadow, and the feeling of stories larger than life.",
    category: "Journey",
    date: "Memory",
    alt: "Siddhiksha Patel standing at night before a monumental statue.",
    aspect: "feature",
  },
  {
    id: "author-feature",
    ...imageAsset("author-feature"),
    title: "Author Feature",
    description: "A press moment celebrating Siddhiksha's author journey and published work.",
    category: "Press",
    date: "Feature",
    alt: "Author feature graphic for Siddhiksha Patel.",
    aspect: "landscape",
  },
  {
    id: "bookishmania-author",
    ...imageAsset("bookishmania-author"),
    title: "Interview Pages",
    description: "A magazine-style feature documenting the voice behind the worlds.",
    category: "Press",
    date: "Interview",
    alt: "Magazine interview spread featuring Siddhiksha Patel.",
    aspect: "square",
  },
  {
    id: "shadows-cover",
    ...imageAsset("shadows-beneath-cover"),
    title: "Shadows Beneath",
    description: "A darker second world of mystery, boarding school secrets, and ancient magic below the surface.",
    category: "Books",
    date: "Book Two",
    alt: "Cover of Shadows Beneath: Whispers of the Forgotten by Siddhiksha Patel.",
    aspect: "portrait",
  },
];
