import { useEffect, useState } from "react";

const impactSteps = [
    { amount: 7100, label: "₦7,100 = 1 child’s future unlocked" },
    { amount: 12000, label: "₦12,000 = 1 teacher honored" },
    { amount: 132000, label: "₦132,000 = 11 legacies preserved" },
];

export default function AnimatedImpactLoop() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % impactSteps.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-semibold text-center text-green-700 transition-opacity duration-700 ease-in-out">
                {impactSteps[currentStep].label}
            </div>
            <div className="mt-4 text-sm text-gray-500">
                Every gift restores flow. Every amount tells a story.
            </div>
        </div>
    );
}
