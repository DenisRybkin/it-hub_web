export function getLineStartPosition(string: string, position: number) {
  const charLength = 1;
  let char = '';

  while (char !== '\n' && position > 0) {
    position = position - charLength;
    char = string.substr(position, charLength);
  }

  if (char === '\n') {
    position += 1;
  }

  return position;
}
