import React, { memo, useCallback, useEffect } from 'react';
import { useGlobals } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { BeakerIcon } from '@storybook/icons';
import { ADDON_ID, CARBONIZE_KEY } from '../constants';

export const ToggleTool = memo(function CarbonizeToggle() {
  const [globals, updateGlobals] = useGlobals();
  const isCarbonized = globals[CARBONIZE_KEY] === true;

  const toggleCarbonize = useCallback(() => {
    const newValue = !isCarbonized;

    updateGlobals({
      [CARBONIZE_KEY]: newValue,
    });

    // Update the carbonize attribute on both manager and preview HTML elements
    const managerRoot = document.documentElement;
    const previewIframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;

    if (managerRoot) {
      if (newValue) {
        managerRoot.setAttribute('data-carbonize', 'true');
      } else {
        managerRoot.removeAttribute('data-carbonize');
      }
    }

    if (previewIframe?.contentDocument?.documentElement) {
      if (newValue) {
        previewIframe.contentDocument.documentElement.setAttribute('data-carbonize', 'true');
      } else {
        previewIframe.contentDocument.documentElement.removeAttribute('data-carbonize');
      }
    }
  }, [isCarbonized, updateGlobals]);

  // Set initial state on mount
  useEffect(() => {
    const managerRoot = document.documentElement;
    const previewIframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;

    if (managerRoot) {
      if (isCarbonized) {
        managerRoot.setAttribute('data-carbonize', 'true');
      } else {
        managerRoot.removeAttribute('data-carbonize');
      }
    }

    if (previewIframe?.contentDocument?.documentElement) {
      if (isCarbonized) {
        previewIframe.contentDocument.documentElement.setAttribute('data-carbonize', 'true');
      } else {
        previewIframe.contentDocument.documentElement.removeAttribute('data-carbonize');
      }
    }
  }, []);

  return (
    <IconButton
      key={`${ADDON_ID}-toggle`}
      title={isCarbonized ? 'Decarbonize' : 'Carbonize'}
      active={isCarbonized}
      onClick={toggleCarbonize}
    >
      <BeakerIcon />
    </IconButton>
  );
});

// Made with Bob
