export const isLogin = () => {
  if (localStorage.getItem('UID')) {
      return true;
  }

  return false;
}