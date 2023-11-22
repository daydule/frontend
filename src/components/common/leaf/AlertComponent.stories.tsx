import { Meta, StoryObj } from '@storybook/react';
import { AlertComponent } from './AlertComponent';

const meta: Meta<typeof AlertComponent> = {
  component: AlertComponent,
  title: 'common/leaf/AlertComponent',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * エラー発生時に表示されるテキストです。
 */
export const AlertText: Story = {
  args: {
    text: '不正な入力値です',
  },
};
