import { browser } from "$app/environment";
import type { Config } from "@sveltejs/kit";

interface ConfigType {
  showJapanese: boolean;
  showGPT: boolean;
  showClaude: boolean;
  scrollShow: boolean;
  scrollByLine: boolean;
  scrollInfiniteChapter: boolean;
  viewWide: boolean;
  viewFontSize: number;
  viewLineHeight: number;
  viewFontFamily: String;
}

function configRead(): ConfigType {
  const default_config = {
    showJapanese: false,
    showGPT: true,
    showClaude: false,

    scrollShow: false,
    scrollByLine: false,
    scrollInfiniteChapter: false,

    viewWide: false,
    viewFontSize: 18,
    viewLineHeight: 1.4,
    viewFontFamily: 'kopub-b-bold'
  };

  if (browser) {
    const saved_data = JSON.parse(localStorage.getItem("readerConfig") ?? "{}");

    return Object.assign(default_config, saved_data);
  }

  return default_config;
}
function configUpdate<K extends keyof ConfigType>(key: K, val: ConfigType[K]) {
  const original_data = configRead();

  original_data[key] = val;
  localStorage.setItem("readerConfig", JSON.stringify(original_data));
}
function configSet(config: ConfigType) {
  localStorage.setItem("readerConfig", JSON.stringify(config));
}

export { configRead, configUpdate, configSet };
