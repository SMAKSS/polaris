import React, {useEffect, useRef, useState} from 'react';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {updateGrowFrameHeight} from '../src/components/GrowFrame';
import {ResizeObserver} from '@juggle/resize-observer';

export default function FrameComponent({
  theme = enTranslations,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) {
  const [features, setFeatures] =
    useState<React.ComponentProps<typeof AppProvider>['features']>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Tell parent frame of the initial size on first render
  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    var {height} = wrapperRef.current.getBoundingClientRect();
    updateGrowFrameHeight(`${Math.ceil(height)}px`);
  }, []);

  // Watch for changes in size (screen resizing, interacting, etc);
  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const {blockSize: height} = entries[0].contentBoxSize[0];
      updateGrowFrameHeight(`${Math.ceil(height)}px`);
    });
    observer.observe(wrapperRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const urlFeatures = new URLSearchParams(window.location.search).get(
      'features',
    );
    if (typeof urlFeatures === 'string') {
      setFeatures(
        Object.fromEntries(
          urlFeatures.split(',').map((feature) => [feature.trim(), true]),
        ),
      );
    }
  }, []);

  return (
    <AppProvider i18n={theme || enTranslations} features={features}>
      <div id="polaris-sandbox-wrapper" ref={wrapperRef}>
        {children}
      </div>
    </AppProvider>
  );
}
