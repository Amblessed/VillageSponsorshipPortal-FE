// pages/ChristmasImpact.tsx

import AnimatedImpactLoop from "./AnimatedImpactLoop";

export default function ChristmasImpactPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
                🎁 Your Gift Unlocks Legacy
            </h1>
            <AnimatedImpactLoop />
            <p className="mt-6 text-center text-gray-600 max-w-xl">
                Even ₦7,100 can unlock a child’s future. Every gift restores flow. Every amount tells a story.
            </p>
        </main>
    );
}
