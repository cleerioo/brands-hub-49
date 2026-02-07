import HomeClient from "./HomeClient";
import { watches } from "@/data/watches";

export default async function Home() {
  // Fetch products on the server before rendering
  // This eliminates the loading delay - products are pre-rendered
  const products = watches;

  return <HomeClient initialProducts={products} />;
}
