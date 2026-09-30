export type StageTone = "blush" | "sky" | "mint" | "butter" | "lilac";

export default function Stage({
  tone,
  children,
}: {
  tone: StageTone;
  children: React.ReactNode;
}) {
  return (
    <div className={`stage stage-${tone}`}>
      <div className="stage-window">{children}</div>
    </div>
  );
}
