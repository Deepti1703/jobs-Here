import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    Video,
    BarChart3,
    BookOpen,
    UserCircle,
    Menu,
    X,
    ChevronRight,
    Monitor
} from 'lucide-react';

// Landing Page Components
const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-white py-20 px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Ace Your <span className="text-primary">Placement</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto"
                >
                    Get Started <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
};

const Features = () => {
    const features = [
        {
            title: "Practice Problems",
            description: "Solve thousands of coding challenges and technical questions.",
            icon: <Code2 className="text-primary" size={32} />
        },
        {
            title: "Mock Interviews",
            description: "Experience real-world interview scenarios with video simulations.",
            icon: <Video className="text-primary" size={32} />
        },
        {
            title: "Track Progress",
            description: "Monitor your improvement with detailed analytical charts.",
            icon: <BarChart3 className="text-primary" size={32} />
        }
    ];

    return (
        <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="mb-6 bg-primary bg-opacity-10 w-16 h-16 rounded-xl flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Placement Prep. All rights reserved.</p>
        </div>
    </footer>
);

const LandingPage = () => (
    <div className="min-h-screen">
        <Hero />
        <Features />
        <Footer />
    </div>
);

// Dashboard Layout (App Shell)
const DashboardLayout = () => {
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Practice', icon: <Code2 size={20} />, path: '/dashboard/practice' },
        { name: 'Assessments', icon: <Monitor size={20} />, path: '/dashboard/assessments' },
        { name: 'Resources', icon: <BookOpen size={20} />, path: '/dashboard/resources' },
        { name: 'Profile', icon: <UserCircle size={20} />, path: '/dashboard/profile' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        Placement Prep
                    </h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary transition-all"
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold text-gray-800">Placement Prep</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center text-primary font-bold">
                            JD
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// Placeholder Pages
const PagePlaceholder = ({ title }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600">This is the {title.toLowerCase()} page. Content for {title} will be implemented here.</p>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<PagePlaceholder title="Dashboard" />} />
                    <Route path="practice" element={<PagePlaceholder title="Practice" />} />
                    <Route path="assessments" element={<PagePlaceholder title="Assessments" />} />
                    <Route path="resources" element={<PagePlaceholder title="Resources" />} />
                    <Route path="profile" element={<PagePlaceholder title="Profile" />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
