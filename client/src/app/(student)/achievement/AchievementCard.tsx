interface Props {
    title: string;
    icon: string;
    description: string;
    unlocked: boolean;
  }
  
  export default function AchievementCard({ title, icon, description, unlocked }: Props) {
    return (
      <div className={`rounded-xl p-4 border shadow-sm transition bg-white ${unlocked ? "opacity-100" : "opacity-50 grayscale"}`}>
        <div className="text-4xl mb-2 text-center">{icon}</div>
        <h3 className="text-sm font-semibold text-center mb-1">{title}</h3>
        <p className="text-xs text-gray-500 text-center">{description}</p>
        {!unlocked && (
          <p className="text-[10px] text-gray-400 mt-2 text-center italic">🔒 Chưa đạt</p>
        )}
      </div>
    );
  }
  