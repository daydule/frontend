import { LoadingComponent } from '@/components/atoms/LoadingComponent';
import { NextPage } from 'next';

const Index: NextPage = () => {
  // /next.config.jsの設定によりこのページは/aboutに必ずリダイレクトされるため、表示されることはない
  return <LoadingComponent />;
};

export default Index;
