import { loadMap } from "$lib/db";
import { logger } from "$lib/observability";
import type { LayoutLoad } from "../$types";

const console = logger('norad admin page')

export const load: LayoutLoad = async () => {
  const hoggarnMap = await loadMap();
  console.log('load', hoggarnMap);
  return { hoggarn: hoggarnMap };
}