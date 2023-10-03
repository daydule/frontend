import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeBlockComponent from '@/components/common/leaf/CodeBlockComponent';

type Props = {
  markDownContents: string;
};

export const MarkdownContentsComponent = (props: Props) => {
  return (
    <div className='prose prose-xl mx-auto my-12 pb-8'>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ code: CodeBlockComponent }}>
        {props.markDownContents}
      </ReactMarkdown>
    </div>
  );
};
