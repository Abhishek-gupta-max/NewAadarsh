const fs = require('fs');
const readline = require('readline');

const logPath = "C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\729aa742-bb51-4079-bc31-83020cfc43d7\\.system_generated\\logs\\transcript.jsonl";

const rl = readline.createInterface({
  input: fs.createReadStream(logPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('replace-blue-with-red.js') && line.includes('CodeContent')) {
    try {
      const obj = JSON.parse(line);
      // Find the tool calls
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'write_to_file' && tc.args && tc.args.CodeContent) {
            console.log("Found replace-blue-with-red.js CodeContent:");
            console.log(tc.args.CodeContent);
          }
        }
      }
    } catch (e) {
      // Ignore parse errors for long lines
    }
  }
});
