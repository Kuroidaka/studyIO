import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeCopyBtn from "./CopyBtn";
import styled from "styled-components";
import { Fragment } from "react";


const MarkDown = (p) => {

    const { text } = p 

    // eslint-disable-next-line react/prop-types
    const Pre = ({ children }) => (
        <pre className="blog-pre">
            <div className="code-block-header">
                <p className="code-block-title">Code</p>
                <CodeCopyBtn>{children}</CodeCopyBtn>
            </div>
            {children}
        </pre>
    )

    return (
        <Container>
            
            <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={text}
            remarkPlugins={[remarkGfm]}
            components={{
                pre: Pre,
                code({ inline, className = "blog-code", children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                    <SyntaxHighlighter
                    style={dracula} // theme
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    {...props}
                    />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                );
                },
            }}
            />
        </Container>
    )
}

export default MarkDown

const Container = styled.div `

.blog-pre {
    margin-bottom: 3em !important;
    -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 35px -23px 2px -16px rgba(0, 0, 0, 0);
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 35px -23px 2px -16px rgba(0, 0, 0, 0);
    position: relative;
    pre{
        margin: 0!important; 
    }
}

.code-block-header {
    background-color: #393939;
    width: 100%;
    height: auto;
    justify-content: space-between;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    position: relative;
    display: flex;
    padding: 5px;
    margin-bottom: -3px;
    align-items: center;
    
    .code-block-title {
        font-size: 12px;
        color: #fff;
        font-weight: 600;
        padding: 0 10px;
    }
    .code-copy-btn {
    
        .copy-btn {
            display: flex;
            align-items: center;
            cursor: pointer;
            svg {
                width: 15px;
            }
            span {
                font-size: 12px;
            }
        }
    }
}
/* .code-copy-btn:hover {
    transform: scale(1.1);
    opacity: 0.9;
} */


    
`