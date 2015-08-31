import adjustIndent from './adjustIndent';

export default function indentNode(node, patcher, levels=1) {
  if (levels === 0) {
    return;
  }

  const source = patcher.original;
  let offset = node.range[0];
  const indent = adjustIndent(source, offset, levels);

  while (offset < node.range[1]) {
    patcher.insert(offset, indent);
    offset = source.indexOf('\n', offset + '\n'.length);
    if (offset < 0) {
      break;
    }
    offset += '\n'.length;
  }
}
