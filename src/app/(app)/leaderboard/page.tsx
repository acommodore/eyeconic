import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 rounded-full bg-[#FF4F00]/10 flex items-center justify-center mb-6 border border-[#FF4F00]/30 shadow-[0_0_30px_rgba(255,79,0,0.2)]">
        <Trophy className="w-12 h-12 text-[#FF4F00]" />
      </div>
      <h1 className="text-3xl font-black tracking-widest text-white mb-4">GLOBAL RANKINGS</h1>
      <p className="text-gray-400 max-w-md mx-auto">
        The leaderboard is being calibrated. Soon you'll see the top fans with the highest Eye Accuracy and prediction streaks globally.
      </p>
    </div>
  );
}
