import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { NicknameSettingComponent } from '../molecules/NicknameSettingComponent';
import { PasswordSettingComponent } from '../molecules/PasswordSettingComponent';

export const IndividualSettingComponent = () => {
  return (
    <>
      <div className='border border-black h-[calc(100%-5rem)]'>
        <div className='h-20 flex'>
          <h1 className='mt-4 ml-4 text-3xl'>個別設定</h1>
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
