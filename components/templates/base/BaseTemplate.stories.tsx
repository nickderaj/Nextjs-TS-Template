import { ComponentMeta, ComponentStory } from '@storybook/react';
import BaseTemplate, { IBaseTemplate } from './BaseTemplate';

export default {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
  argTypes: {},
} as ComponentMeta<typeof BaseTemplate>;

const Template: ComponentStory<typeof BaseTemplate> = (args) => <BaseTemplate {...args} />;

export const Base = Template.bind({});

const base: IBaseTemplate = {
  sampleTextProp: 'Hello world!',
};

Base.args = {
  ...base,
} as IBaseTemplate;
