const loadTawk = () => {
  const script1 = document.createElement('script');
  const script0 = document.getElementsByTagName('script')[0];
  script1.async = true;
  //@ts-expect-errorts
  script1.src = TAWK_SRC;
  script1.setAttribute('crossorigin', '*');
  script0.parentNode.insertBefore(script1, script0);
};

export const initApp = () => {
  loadTawk();
};
