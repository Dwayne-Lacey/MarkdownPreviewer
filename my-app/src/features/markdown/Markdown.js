import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInputFullscreen,
  setOutputFullscreen,
  setMarkdownText,
  selectMarkdown,
  selectInput,
  selectOutput
} from './markdownSlice';
import styles from './Markdown.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownApp() {
    
    const markdown = useSelector(selectMarkdown);
    const inputFullscreen = useSelector(selectInput);
    const outputFullscreen = useSelector(selectOutput);
    const dispatch = useDispatch();

    //Determine what classes to load with based on fullscreen
    const outputStyle = outputFullscreen ? styles.previewFull : "";
    const inputStyle = inputFullscreen ? styles.textEditorFull : styles.textEditorMin;

    return (
        <div>
            {!outputFullscreen && //Only show input window when output is not fullscreen
            <div className={styles.editor}>
                <div className={styles.titleBar} aria-label="Markdown editor">
                    <h1>Markdown Editor</h1>
                    <button
                    aria-label="Toggle markdown editor fullscreen"
                    onClick={() => dispatch(setInputFullscreen())}
                    >
                        Toggle Input Fullscreen
                    </button>
                </div>
                
                <textarea
                aria-label="Set markdown editor text"
                value={markdown}
                onChange={(e) => dispatch(setMarkdownText(e.target.value))}
                type="text"
                className={styles.textEditor + ' ' + inputStyle}
                />
            </div>
            }
            {!inputFullscreen && //Only show output window when input is not fullscreen
            <div className={styles.preview + ' ' + outputStyle}>
                <div className={styles.titleBar} aria-label="Markdown previewer header bar">
                    <h1>Markdown Preview</h1>
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
                    img: ({node, ...props}) => <img className={styles.markImg} alt="Markdown preview" {...props} />,
                    pre: ({node, ...props}) => <pre className={styles.markPre} {...props} />,
                    code: ({node, ...props}) => <code className={styles.markCode} {...props} />,
                    table: ({node, ...props}) => <table className={styles.markTable} {...props} />,
                    td: ({node, ...props}) => <td className={styles.markTd} {...props} />,
                    th: ({node, ...props}) => <th className={styles.markTh} {...props} />
                }}
                />
            </div>
            }
        </div>
    );
}