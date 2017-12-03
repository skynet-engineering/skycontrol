import { bootstrap } from 'react-elemental';
import barlowBold from 'resources/fonts/barlow-bold';
import barlowRegular from 'resources/fonts/barlow-regular';
import cousineBold from 'resources/fonts/cousine-bold';
import cousineRegular from 'resources/fonts/cousine-regular';
import injectCSS from 'app/util/inject-css';

const fontDataURL = (base64) => `url(data:application/x-font-ttf;base64,${base64})`;

/**
 * Stateful initialization procedures to run during client-side application bootstrapping.
 */
const init = () => {
  const fontOpts = {
    primary: {
      regular: fontDataURL(cousineRegular),
      bold: fontDataURL(cousineBold),
    },
    secondary: {
      regular: fontDataURL(barlowRegular),
      bold: fontDataURL(barlowBold),
    },
  };
  const colorsOpts = {
    primary: '#6fc0e3',
    primaryLight: '#b7d2e0',
    primaryDark: '#146e96',
  };
  bootstrap(fontOpts, colorsOpts);

  // I know, I know.
  const googleMapsHideAttribution = `
    a[href^="http://maps.google.com/maps"] {
      display: none !important;
    }

    a[href^="https://maps.google.com/maps"] {
      display: none !important;
    }

    .gmnoprint a, .gmnoprint span, .gm-style-cc {
      display: none;
    }
  `;
  injectCSS(googleMapsHideAttribution);
};

export default init;
