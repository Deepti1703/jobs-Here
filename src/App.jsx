import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBar, Layout } from './components/layout/Layout';
import {
    HomePage,
    DashboardPage,
    SavedPage,
    DigestPage,
    SettingsPage,
    ProofPage,
    NotFoundPage
} from './pages/PlaceholderPages';
import './index.css';

function App() {
    return (
        <Router>
            <div className="app-root">
                <TopBar appName="Job Notification App" />

                <Layout>
                    <div style={{ maxWidth: '720px', margin: '0 auto', paddingTop: 'var(--space-5)' }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/saved" element={<SavedPage />} />
                            <Route path="/digest" element={<DigestPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/proof" element={<ProofPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </Layout>

                <style>{`
                    .app-root {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        width: 100%;
                    }
                `}</style>
            </div>
        </Router>
    );
}

export default App;
