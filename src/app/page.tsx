import HomeClient from "@/components/home/HomeClient";
import { getRecentWords } from "@/lib/recent-words";
import { getWordOfDay } from "@/lib/word-of-day";

export default async function Page() {
const [wordOfDay, recentWords] = await Promise.all([
  getWordOfDay(),
  getRecentWords(),
]);

  return <HomeClient wordOfDay={wordOfDay}
   RecentWords={recentWords} />;
}
