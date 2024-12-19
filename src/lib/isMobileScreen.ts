import { browser } from "$app/environment";

function isMobileScreen(): boolean {
  if (browser) {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (width == 0) {
      // 그냥 인식을 못 한 부분 (완전 이상한 브라우저 인듯.)
      return false;
    }

    return width < 1024;
  }

  return false
}

export default isMobileScreen