import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrimaryLayout, { IPrimaryLayout } from './PrimaryLayout';

export default {
  title: 'layouts/PrimaryLayout',
  component: PrimaryLayout,
  argTypes: {},
} as ComponentMeta<typeof PrimaryLayout>;

const Template: ComponentStory<typeof PrimaryLayout> = (args) => <PrimaryLayout {...args} />;

export const Base = Template.bind({});

const base: IPrimaryLayout = {
  title: 'Example Title',
  children: '{{component}}',
};

Base.args = {
  ...base,
} as IPrimaryLayout;
