export const countLetters = (text: string): number => {
    return Array.from(text).filter((char) => /[a-zA-Z]/.test(char)).length;
  };
  
export const countWords = (text: string): number => {
return text.split(/\s+/).length;
};

export const countSentences = (text: string): number => {
return (text.match(/[.!?]/g) || []).length;
};

export const calculateReadability = (text: string): string => {
const letters = countLetters(text);
const words = countWords(text);
const sentences = countSentences(text);
const L = (letters / words) * 100;
const S = (sentences / words) * 100;
const index = 0.0588 * L - 0.296 * S - 15.8;
if (index >= 16) {
    return "Grade 16+";
} else if (index < 1) {
    return "Before Grade 1";
} else {
    return `Grade ${Math.round(index)}`;
}
};
  