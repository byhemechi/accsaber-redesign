import { redirect } from "@remix-run/node";
export const loader = () => redirect("/leaderboards/overall");
