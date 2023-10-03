import { NextPage } from 'next';
import { LoadingComponent } from '@/components/common/leaf/LoadingComponent';

const Index: NextPage = () => {
  // /next.config.jsの設定によりこのページは/aboutに必ずリダイレクトされるため、表示されることはない
  return <LoadingComponent />;
};

export default Index;
