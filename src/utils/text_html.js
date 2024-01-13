export default function convertStringToHtml(input) {
    // Split the input string by line breaks

    const checkIsImgLink = () => {
        const urlRegex = /(http[s]?:\/\/){0,1}(\w+:\w+@){0,1}([a-zA-Z0-9.-]+)(:[0-9]+){0,1}(\/[a-zA-Z0-9.-]+)*\/?/;
        const url = input.match(urlRegex);

        const imageRegex = /\.(jpeg|jpg|gif|png)$/;
        const isImage = imageRegex.test(url[0]);
        console.log(isImage); // Outputs: true
        return isImage;
    }
    
    if(checkIsImgLink(input)) 
        return `<img src="${input}" alt=""/>`;

    var lines = input.split('\n');

    // Initialize an empty string to store the final HTML
    var html = '';

    // Loop through each line
    for (var i = 0; i < lines.length; i++) {
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

