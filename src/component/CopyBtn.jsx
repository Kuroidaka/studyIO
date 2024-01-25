import React, { Fragment } from "react";
import { Clipboard, Check } from "react-feather"

export default function CodeCopyBtn(p) {
    const { children } = p

    const [copyOk, setCopyOk] = React.useState(false);
    // const iconColor = copyOk ? '#0af20a' : '#ddd';
    const handleClick = async () => {
        console.log(children)

        try {
            await navigator.clipboard.writeText(children.props.children);
            setCopyOk(true);
            
        } catch (error) {
            setCopyOk(false);
        }
    }
    return (
        <div className="code-copy-btn">
        {copyOk ?
        <div className="copy-btn">
            <Check />
            <span> Copied! </span> 
        </div>
        : 
        <div className="copy-btn" onClick={handleClick} >
            <Clipboard />
            <span> Copy Code </span> 
        </div>
        }
        </div>
    )
}
