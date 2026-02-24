import React from 'react';

const ReadinessCircle = ({ score = 72 }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative">
            <svg className="w-48 h-48 transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-100"
                />
                {/* Progress Circle */}
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: circumference,
                        animation: 'fillProgress 1.5s ease-out forwards'
                    }}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-1000"
                />
                <style>{`
          @keyframes fillProgress {
            to { stroke-dashoffset: ${offset}; }
          }
        `}</style>
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-900">{score}/100</span>
                <span className="text-sm text-gray-500 font-medium">Readiness Score</span>
            </div>
        </div>
    );
};

export default ReadinessCircle;
