import HomeClient from "@/components/home/HomeClient";
import { getWordOfDay } from "@/lib/word-of-day";

export default async function Page() {
  const wordOfDay = await getWordOfDay();

  return <HomeClient wordOfDay={wordOfDay} />;
}