interface ReadingTimeProps {
  content: string;
  className?: string;
}

const WORDS_PER_MINUTE = 220;

export default function ReadingTime({ content, className = "" }: ReadingTimeProps) {
  const text = content.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

  return (
    <span className={`mono text-xs ${className}`}>
      · {minutes} min read
    </span>
  );
}
