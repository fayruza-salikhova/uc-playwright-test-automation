const uiTestingPlayground = process.env.UI_TESTING_PLAYGROUND_URL!;
const globalsQa = process.env.GLOBALS_QA_URL!;

export const urls = {
  globalsQa: {
    dragAndDrop: `${globalsQa}/demo-site/draganddrop/`,
  },

  uiTestingPlayground: {
    ajax: `${uiTestingPlayground}/ajax`,
    ajaxData: `${uiTestingPlayground}/ajaxdata`,
  },
};
