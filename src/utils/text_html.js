export default function convertStringToHtml(input) {

    //devide input into code and text
    function extractCodeBlock(input) {
        const startMarker = '```';
        const startIndex = input.indexOf(startMarker);
    
        if (startIndex !== -1) {
            const endIndex = input.indexOf(startMarker, startIndex + startMarker.length);
    
            if (endIndex !== -1) {
                const extractedString = input.substring(startIndex, endIndex + startMarker.length);
                return {
                    extractedString,
                    remainingString: input.replace(extractedString, '')
                };
            }
        }
    
        return {
            extractedString: '',
            remainingString: input
        };
    }

    const { CodeText, Text } = extractCodeBlock(input);
    // Handle Code Text
    




    // Split the input string by line breaks
    var lines = Text.split('\n');

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

