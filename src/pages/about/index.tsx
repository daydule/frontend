import fs from 'fs';
import path from 'path';
import { NextPage, GetStaticProps } from 'next';
import { MarkdownContentsComponent } from '@/components/organisms/MarkdownContentsComponent';

type Props = {
  markdownText: string;
};

const AboutPage: NextPage<Props> = ({ markdownText }: Props) => {
  return <MarkdownContentsComponent markDownContents={markdownText} />;
};

const getStaticProps: GetStaticProps<Props> = async () => {
  const filePath = path.join(process.cwd(), 'public/markdownContents/about.md');
  const markdownText = fs.readFileSync(filePath, 'utf-8');
  return {
    props: {
      markdownText,
    },
  };
};

export { getStaticProps };
export default AboutPage;
