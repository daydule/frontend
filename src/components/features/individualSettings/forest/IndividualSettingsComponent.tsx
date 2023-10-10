import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { NicknameSettingComponent } from '@/components/features/individualSettings/tree/NicknameSettingComponent';
import { PasswordSettingComponent } from '@/components/features/individualSettings/tree/PasswordSettingComponent';

export const IndividualSettingComponent = () => {
  return (
    <>
      <div className='h-[calc(100%-5rem)] border border-black'>
        <div className='flex h-20'>
          <h1 className='ml-4 mt-4 text-3xl'>個別設定</h1>
        </div>
        <Tabs>
          <TabList>
            <Tab>定期予定</Tab>
            <Tab>ニックネーム変更</Tab>
            <Tab>パスワード変更</Tab>
          </TabList>

          <TabPanel>
            <div></div>
          </TabPanel>
          <TabPanel>
            <NicknameSettingComponent />
          </TabPanel>
          <TabPanel>
            <PasswordSettingComponent />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
