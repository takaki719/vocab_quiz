export function generatePlaceholder(answer: string): string {
  // 答えの文字数に応じてアンダースコアを生成
  const words = answer.split(' ');
  return words.map(word => '_'.repeat(word.length)).join(' ');
}

export function createBlankSentence(sentence: string, answer: string): string {
  // 文中の答えの部分を空欄に置き換える
  const placeholder = generatePlaceholder(answer);
  return sentence.replace(/_+(\s+_+)*/g, placeholder);
}