import { use } from "react";
import { json } from "~/lib/api/fetcher";
import { getSkills } from "~/lib/api/skills";
import { Category } from "~/lib/interfaces/api/category";
import SkillTriangle from "./SkillTriangle";

export default function SkillsContainer({
  playerId,
  category = "overall",
}: {
  playerId: string;
  category?: string;
}) {
  const categories = use(json<Category[]>("categories"));
  const skills = use(getSkills(playerId));

  return <SkillTriangle categories={categories}>{skills}</SkillTriangle>;
}
