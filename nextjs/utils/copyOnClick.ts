export const copyToClipboardOnClick =
  (content: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(content);
  };
