import { NextPage } from 'next';
import { MarkdownContentsComponent } from '@/components/organisms/MarkdownContentsComponent';

const AboutPage: NextPage = () => {
  return <MarkdownContentsComponent fineName='about.md' />;
};

export default AboutPage;
