import React, { useEffect, useRef, type MutableRefObject, type PropsWithChildren } from 'react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';

import type { CarbonTheme } from '../constants';
import { docsThemes } from '../storybook-themes';
import { useTheme } from '../theme-state';

// Storybook's DocsContainer scrolls to the heading named in the URL hash after
// every one of its renders, not only the first. Re-theming a docs page has to
// re-render it, so without a guard each theme switch would drag the reader
// back to that heading.
//
// React runs effects children first. HideHashTarget sits inside DocsContainer,
// so on a theme switch its effect runs just before DocsContainer looks the
// heading up, and takes the heading's id away. CarbonDocsContainer's effect
// runs just after and puts the id back. Both happen in the same pass, before
// anything is painted.

type HiddenTarget = { element: HTMLElement; id: string };

/** The element that the hash of the Storybook URL points at, if there is one. */
const getHashTarget = (): HTMLElement | null => {
  try {
    const hash = window.parent.location.hash.slice(1);
    return hash ? document.getElementById(decodeURIComponent(hash)) : null;
  } catch {
    // the Storybook UI is on another origin, in which case Storybook can't read the hash either
    return null;
  }
};

const HideHashTarget = ({ theme, hidden }: { theme: CarbonTheme; hidden: MutableRefObject<HiddenTarget | null> }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Leave the first render alone: opening a link to a heading should still scroll to it.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const element = getHashTarget();
    if (element) {
      hidden.current = { element, id: element.id };
      element.removeAttribute('id');
    }
  }, [theme, hidden]);

  return null;
};

/**
 * Docs container that gives docs pages the Carbon theme.
 *
 * A theme switch only changes the `theme` prop, so the page is re-themed in
 * place: it keeps its scroll position and its stories are left untouched.
 */
export const CarbonDocsContainer = ({ children, ...props }: PropsWithChildren<DocsContainerProps>) => {
  const theme = useTheme();
  const hidden = useRef<HiddenTarget | null>(null);

  useEffect(() => {
    if (hidden.current) {
      hidden.current.element.id = hidden.current.id;
      hidden.current = null;
    }
  }, [theme]);

  return (
    <DocsContainer {...props} theme={docsThemes[theme]}>
      <HideHashTarget theme={theme} hidden={hidden} />
      {children}
    </DocsContainer>
  );
};
