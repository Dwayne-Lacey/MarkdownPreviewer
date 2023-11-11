import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInputFullscreen,
  setOutputFullscreen,
  setMarkdownText,
  selectMarkdown
} from './markdownSlice';
import styles from './Markdown.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownApp() {
    
    const markdown = useSelector(selectMarkdown);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                aria-label="Toggle markdown editor fullscreen"
                onClick={() => dispatch(setInputFullscreen())}
                >
                    Toggle Input Fullscreen
                </button>
                <textarea
                aria-label="Set markdown editor text"
                value={markdown}
                onChange={(e) => dispatch(setMarkdownText(e.target.value))}
                type="text"
                />
            </div>
            <div>
                <div aria-label="Markdown previewer header bar">

                    <button
                    aria-label="Toggle markdown previewer fullscreen"
                    onClick={() => dispatch(setOutputFullscreen())}
                    >
                        Toggle Output Fullscreen
                    </button>
                </div>
                
                <ReactMarkdown 
                children={markdown} 
                remarkPlugins={[remarkGfm]} 
                className={styles.markdown}
                components={{
                    img: ({node, ...props}) => <img className={styles.markImg} {...props} />,
                    pre: ({node, ...props}) => <pre className={styles.markPre} {...props} />,
                    code: ({node, ...props}) => <code className={styles.markCode} {...props} />
                }}
                />
            </div>
        </div>
  );
}