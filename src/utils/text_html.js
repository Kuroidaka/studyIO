// check is img link
const checkIsImgLink = (input) => {
    const urlRegex = /(http[s]?:\/\/){0,1}(\w+:\w+@){0,1}([a-zA-Z0-9.-]+)(:[0-9]+){0,1}(\/[a-zA-Z0-9.-]+)*\/?/;
    const url = input.match(urlRegex);

    const imageRegex = /\.(jpeg|jpg|gif|png)$/;
    const isImage = imageRegex.test(url[0]);
    console.log(isImage); // Outputs: true
    return isImage;
}


const splitCodeBlock = (text) => {

    const codeBlockRegex = /```(javascript|js|python)\n([\s\S]*?)\n```/gm;
    // const text = "Here is a code block:\n\n```javascript\nconsole.log('Hello, world!');\n```\n\nAnd here is another one:\n\n```python\nprint('Hello, world!')\n```";

    let listCode = []
    const matches = [...text.matchAll(codeBlockRegex)];
    matches.forEach((match, index) => {
        const language = match[1];
        const code = match[2];
        console.log(`Code block ${index + 1}:`);
        console.log("Language:", language);
        console.log("Code:", code);
        listCode.push(code)
    });

    return listCode
}
    
const formatCodeBlock = (text) => {
    const codeBoxCss = {
        wrapper:`border: 2px solid #000;padding: 0px 14px;background-color: #2B2D31;color: #fff;width: 100%;height: auto;border-radius: 8px;`,
        js: {
            const: "color: #FF7B72;",
            function: "color: #D2A8FF;",
            string: "color: #A5D6FF;", 
        }
    }

    const codeBlockRegex = /```(javascript|js|python|py)\n([\s\S]*?)\n```/gm;

    let codeBlocks = [];
    text.replace(codeBlockRegex, function(match, language, code) {
        // Adjust the code block here

        let htmlCode = `<div style = '${codeBoxCss.wrapper}'>`
        const lists = code.split('\n');
        for (let i = 0; i < lists.length; i++) {
            htmlCode += '<p>' + lists[i] + '</p>';
        }
        htmlCode += '</div>'

        // change color for keyword
        htmlCode= htmlCode.replace(/console.log/g, `<span style="${codeBoxCss.js.const}">console</span>.<span style="${codeBoxCss.js.function}">log</span>`); // Wrap console.log in a span
        htmlCode= htmlCode.replace(/function/g, `<span style="${codeBoxCss.js.function}">function</span>`); // Wrap console.log in a span
        htmlCode= htmlCode.replace(/\"(.*?)\"/g, `<span style="${codeBoxCss.js.string}">\"$1\"</span>`); // Wrap console.log in a span
        codeBlocks.push(`\n${htmlCode}\n`);
        return match; // This does not change the original text
    });

    codeBlocks.forEach(codeBlock => {
        text = text.replace(codeBlockRegex, codeBlock);
    });

    return text
}

export default function convertStringToHtml(input) {

    let html = ""
    if(checkIsImgLink(input)) 
        return `<img src="${input}" alt=""/>`;

    input = formatCodeBlock(input)

    var lines = input.split('\n');

    // Initialize an empty string to store the final HTML

    // Loop through each line
    for (let i = 0; i < lines.length; i++) {
        // Check if the line starts with a tab character
        if (lines[i].startsWith('/t')) {
            // Remove the tab character and add the rest of the line as a tabbed index
            html += '<span style="margin-left: 40px;">' + lines[i].substring(2) + '</span><br>';
        }
        // Check if the line starts with a number
        else if (/^\d+\.\s/.test(lines[i])) {
            // Add the line as an ordered list item
            html += '<ol><li>' + lines[i] + '</li></ol>';
        }
        else {
            html += '<p>' + lines[i] + '</p>';
        }
    }

    // Return the final HTML string
    return html;
}
  

//   // Usage
// const text = "Line 1\nLine 2\tTabbed text";
// const htmlText = textToHtml(text);

