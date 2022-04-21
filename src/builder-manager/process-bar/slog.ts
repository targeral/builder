import stringWidth from 'string-width';

const MOVE_LEFT = Buffer.from('1b5b3130303044', 'hex').toString();
const MOVE_UP = Buffer.from('1b5b3141', 'hex').toString();
const CLEAR_LINE = Buffer.from('1b5b304b', 'hex').toString();

export const slog = (stream: NodeJS.WriteStream) => {
	let write = stream.write;
	let str: string | undefined | null;

	stream.write = function(...rest) {
        let data = rest[0];
		if (str && data !== str) str = null;
		return write.apply(this, rest as any);
	};

	if (stream === process.stderr || stream === process.stdout) {
		process.on('exit', function() {
			if (str !== null) stream.write('');
		});
	}

	let prevLineCount = 0;
	let log = function(...rest: string[]) {
        
		str = '';
		let nextStr = rest.join(' ');

		// Clear screen
		for (let i = 0; i < prevLineCount; i++) {
			str += MOVE_LEFT + CLEAR_LINE + (i < prevLineCount-1 ? MOVE_UP : '');
		}

		// Actual log output
		str += nextStr;
		stream.write(str);

		// How many lines to remove on next clear screen
		var prevLines = nextStr.split('\n');
		prevLineCount = 0;
		for (var i=0; i < prevLines.length; i++) {
			prevLineCount += Math.ceil(stringWidth(prevLines[i]) / stream.columns) || 1;
		}
	};

	(log as any).clear = function() {
		stream.write('');
	};

	return log;
};
