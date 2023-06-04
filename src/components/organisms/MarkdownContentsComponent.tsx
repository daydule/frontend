import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeBlockComponent from '@/components/organisms/CodeBlockComponent';

type Props = {
  fineName: string;
};

export const MarkdownContentsComponent = (props: Props) => {
  const [markdownContents, setMarkdownContents] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const md = await fetch('/markdownContents/' + props.fineName);
      const text = await md.text();
      setMarkdownContents(text);
    };
    fetchMarkdown();
  }, [props]);

  return (
    <div className='prose prose-invert prose-xl'>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ code: CodeBlockComponent }}>
        {markdownContents}
      </ReactMarkdown>
    </div>
  );
};
