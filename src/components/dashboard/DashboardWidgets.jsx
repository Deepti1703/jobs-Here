import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ChevronRight, Calendar, Clock } from 'lucide-react';

export const ContinuePractice = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Continue Practice</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Dynamic Programming</h3>
                    <p className="text-sm text-gray-500 uppercase font-semibold mt-1">Last Topic</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Progress</span>
                        <span>3/10 completed</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[30%]" />
                    </div>
                </div>
                <button className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all mt-2">
                    Continue <ChevronRight size={18} />
                </button>
            </div>
        </CardContent>
    </Card>
);

export const WeeklyGoals = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const activeDays = [true, true, true, false, true, false, false];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-00 uppercase tracking-wider">Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                            <span>Problems Solved</span>
                            <span>12/20 this week</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[60%]" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {days.map((day, idx) => (
                            <div key={day} className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${activeDays[idx]
                                            ? 'bg-primary border-primary'
                                            : 'border-gray-200'
                                        }`}
                                >
                                    {activeDays[idx] && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className="text-[10px] uppercase font-bold text-gray-400">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const UpcomingAssessments = () => {
    const assessments = [
        { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", variant: "bg-blue-50 text-blue-700" },
        { title: "System Design Review", time: "Wed, 2:00 PM", variant: "bg-purple-50 text-purple-700" },
        { title: "HR Interview Prep", time: "Friday, 11:00 AM", variant: "bg-orange-50 text-orange-700" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Upcoming Assessments</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {assessments.map((a, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all cursor-pointer">
                            <div className={`p-3 rounded-lg ${a.variant}`}>
                                <Calendar size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">{a.title}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                                    <Clock size={14} />
                                    <span>{a.time}</span>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-300" size={20} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
