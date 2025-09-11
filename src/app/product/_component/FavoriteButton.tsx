"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({ productId }: { productId: string }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favs") || "[]");
    setFav(storedFavs.includes(productId));
  }, [productId]);

  const toggleFav = () => {
    const storedFavs: string[] = JSON.parse(localStorage.getItem("favs") || "[]");

    if (storedFavs.includes(productId)) {
      const updated = storedFavs.filter((id) => id !== productId);
      localStorage.setItem("favs", JSON.stringify(updated));
      setFav(false);
    } else {

      storedFavs.push(productId);
      localStorage.setItem("favs", JSON.stringify(storedFavs));
      setFav(true);
    }
  };

  return (
    <button onClick={toggleFav} className="absolute top-3 right-3 text-xl">
      <i
        className={`fa-solid fa-heart ${
          fav ? "text-red-500" : "text-gray-400"
        }`}
      ></i>
    </button>
  );
}
