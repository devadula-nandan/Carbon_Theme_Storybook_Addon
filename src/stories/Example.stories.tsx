import React from 'react';
import { formatTokenName, g10 } from '@carbon/themes';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { RenderCounter } from './RenderCounter';

const meta: Meta = {
  title: 'Example/Demo',
  tags: ['autodocs'],
};

export default meta;

// Every colour token of a Carbon theme, as the custom property the addon sets for it.
const colorTokens = Object.keys(g10)
  .filter((token) => token !== 'colorScheme')
  .map((token) => `--cds-${formatTokenName(token)}`);

/**
 * Lists a story's args under one heading in the controls table, and shows each
 * arg's starting value as its default.
 */
const describeArgs = <Args extends Record<string, unknown>>(
  category: string,
  args: Args,
  argTypes: ArgTypes<Args>,
) => ({
  args,
  argTypes: Object.fromEntries(
    Object.entries(argTypes).map(([name, argType]) => [
      name,
      { ...argType, table: { category, defaultValue: { summary: JSON.stringify(args[name]) } } },
    ]),
  ),
});

/**
 * COLOR TOKEN
 * A simple div showing the background color of Carbon Design System color tokens
 */
export const ColorToken: StoryObj<{ colorToken: string }> = {
  ...describeArgs(
    'Color Tokens',
    { colorToken: '--cds-layer-01' },
    {
      colorToken: {
        control: 'select',
        options: colorTokens,
        description: 'Select a Carbon Design System color token',
      },
    },
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Check that the selected color token is rendered in the paragraph
    const tokenText = await canvas.findByText(args.colorToken);
    await expect(tokenText).toBeInTheDocument();
  },
  render: (args) => {
    return (
      <div
        style={{
          aspectRatio: '1',
          height: 'min(70vh, 200px)',
          backgroundColor: `var(${args.colorToken})`,
        }}
      >
        <p
          style={{
            background: 'var(--cds-background-inverse)',
            color: 'var(--cds-background)',
            fontFamily: 'IBM Plex Sans',
            fontSize: '14px',
            paddingInline: '0.4rem',
            margin: '0',
          }}
        >
          {args.colorToken}
        </p>
      </div>
    );
  },
};

/**
 * DUMMY CONTROLS
 * A story showcasing every Storybook control type available.
 */
export const DummyControls: StoryObj = {
  ...describeArgs(
    'Dummy Controls',
    {
      booleanControl: true,
      numberControl: 42,
      rangeControl: 50,
      colorControl: '#00ff00',
      textControl: 'Sample text',
      selectControl: 'Option B',
      radioControl: 'Radio 2',
      inlineRadioControl: 'Inline 2',
      checkControl: ['Check A', 'Check C'],
      inlineCheckControl: ['Inline A'],
      dateControl: new Date('2026-01-01'),
      fileControl: [],
    },
    {
      booleanControl: { control: 'boolean', description: 'A boolean toggle control' },
      numberControl: { control: 'number', description: 'A number input control' },
      rangeControl: { control: { type: 'range', min: 0, max: 100, step: 5 }, description: 'A slider (range) control' },
      colorControl: { control: 'color', description: 'Color picker control' },
      textControl: { control: 'text', description: 'Text input control' },
      selectControl: {
        control: 'select',
        options: ['Option A', 'Option B', 'Option C'],
        description: 'Select dropdown control',
      },
      radioControl: {
        control: 'radio',
        options: ['Radio 1', 'Radio 2', 'Radio 3'],
        description: 'Radio button group',
      },
      inlineRadioControl: {
        control: 'inline-radio',
        options: ['Inline 1', 'Inline 2'],
        description: 'Inline radio button group',
      },
      checkControl: {
        control: 'check',
        options: ['Check A', 'Check B', 'Check C'],
        description: 'Multi-select checkbox group',
      },
      inlineCheckControl: {
        control: 'inline-check',
        options: ['Inline A', 'Inline B'],
        description: 'Inline checkbox group',
      },
      dateControl: { control: 'date', description: 'Date picker control' },
      fileControl: { control: 'file', description: 'File upload control (string[] expected)' },
    },
  ),
  render: (args) => {
    return (
      <pre
        style={{
          color: 'var(--cds-text-primary)',
        }}
      >
        {JSON.stringify(args, null, 2)}
      </pre>
    );
  },
};

/**
 * RENDER COUNTER
 * A component that tracks how many times it has rendered
 */
export const RenderCounterStory: StoryObj = {
  render: () => <RenderCounter storageKey="render-count-story" />,
};
