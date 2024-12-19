import { configRead } from "$lib/readerConfig.js";

export function load() {
  return {
    config: configRead(),
  };
}
