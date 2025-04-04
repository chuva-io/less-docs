import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPage() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch('/markdown/terms-and-conditions.md');
      const text = await response.text();
      setMarkdown(text);
    };
    fetchMarkdown();
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
