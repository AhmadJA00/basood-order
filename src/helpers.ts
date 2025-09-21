const helpers = {
  getCookie: (name: string) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  },
  setCookie: (name: string, value: string) => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();

    document.cookie = `${name}=${value};` + expires + ";path=/";
  },
};
export default helpers;
