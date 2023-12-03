import { Meta, StoryObj } from '@storybook/react';
import { CheckBoxComponent } from './CheckBoxComponent';

const meta: Meta<typeof CheckBoxComponent> = {
  component: CheckBoxComponent,
  title: 'common/leaf/CheckBoxComponent',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * チェックボックス上部にテキストを配置します。
 */
export const TopCheckBox: Story = {
  args: {
    id: 'test',
    name: 'test',
    title: 'testtesttest',
    value: true,
    labelLocation: 'top',
  },
};

/**
 * チェックボックス下部にテキストを配置します。
 */
export const BottomCheckBox: Story = {
  args: {
    id: 'test',
    name: 'test',
    title: 'testtesttest',
    value: true,
    labelLocation: 'bottom',
  },
};

/**
 * チェックボックス右側にテキストを配置します。
 */
export const RightCheckBox: Story = {
  args: {
    id: 'test',
    name: 'test',
    title: 'testtesttest',
    value: true,
    labelLocation: 'right',
  },
};

/**
 * チェックボックス左側にテキストを配置します。
 */
export const LeftCheckBox: Story = {
  args: {
    id: 'test',
    name: 'test',
    title: 'testtesttest',
    value: true,
    labelLocation: 'left',
  },
};

/**
 * 複数のチェックボックスを並べて表示させます。
 */
const isTargetDays = [false, true, true, true, true, true, false];
const targetDaysName = ['日', '月', '火', '水', '木', '金', '土'];
export const GroupedCheckBox = {
  render: () => (
    <div className='flex'>
      {isTargetDays.map((targetDay, index) => (
        <div className='mr-2' key={index}>
          <CheckBoxComponent
            id={`day-${index}`}
            name={`day-${index}`}
            title={`${targetDaysName[index]}`}
            value={targetDay}
            labelLocation='bottom'
            handleChange={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};
