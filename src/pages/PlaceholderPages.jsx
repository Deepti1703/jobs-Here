import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const PageContainer = ({ children }) => (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {children}
    </div>
);

export const HomePage = () => (
    <PageContainer>
        <h1 className="mb-24">Stop Missing The Right Jobs.</h1>
        <p className="subtext mb-40" style={{ fontSize: '24px', color: '#666', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
            Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Link to="/settings">
            <Button style={{ padding: '16px 40px' }}>Start Tracking</Button>
        </Link>
    </PageContainer>
);

export const DashboardPage = () => (
    <PageContainer>
        <h1 className="mb-24">Dashboard</h1>
        <Card padding="large">
            <p className="subtext" style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                No jobs yet. In the next step, you will load a realistic dataset.
            </p>
        </Card>
    </PageContainer>
);

export const SavedPage = () => (
    <PageContainer>
        <h1 className="mb-24">Saved Jobs</h1>
        <Card padding="large" style={{ textAlign: 'center', borderStyle: 'dashed' }}>
            <p className="mb-16" style={{ fontSize: '18px', fontWeight: '500' }}>Your shortlist is empty.</p>
            <p style={{ color: '#666', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                Save jobs from your dashboard to track your application progress and get real-time status updates.
            </p>
        </Card>
    </PageContainer>
);

export const DigestPage = () => (
    <PageContainer>
        <h1 className="mb-24">Career Digest</h1>
        <Card padding="large">
            <p className="mb-16" style={{ fontSize: '18px', color: '#111' }}>The Daily Signal</p>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
                Your personalized summary of the market's most relevant opportunities. This feature will be active once your preferences are calibrated.
            </p>
        </Card>
    </PageContainer>
);

export const SettingsPage = () => (
    <PageContainer>
        <h1 className="mb-24">Settings</h1>
        <p className="mb-40" style={{ color: '#666' }}>Define your career filters to calibrate our job discovery engine.</p>

        <Card padding="large">
            <div className="mb-24">
                <Input label="Role Keywords" placeholder="e.g. Senior Product Designer, React Engineer" />
            </div>
            <div className="mb-24">
                <Input label="Preferred Locations" placeholder="e.g. London, Remote, New York" />
            </div>
            <div className="mb-24">
                <label className="input-label mb-8">Work Mode</label>
                <select className="input-field" style={{ width: '100%', height: '56px', background: '#fff' }}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Onsite</option>
                </select>
            </div>
            <div className="mb-40">
                <label className="input-label mb-8">Experience Level</label>
                <select className="input-field" style={{ width: '100%', height: '56px', background: '#fff' }}>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                    <option>Staff / Principal</option>
                    <option>Leadership</option>
                </select>
            </div>
            <Button style={{ width: '100%' }}>Update Preferences</Button>
        </Card>
    </PageContainer>
);

export const ProofPage = () => (
    <PageContainer>
        <h1 className="mb-24">Proof of Work</h1>
        <p className="subtext" style={{ fontSize: '18px', color: '#666' }}>
            A collection of artifacts and validation steps for the current development phase.
        </p>
    </PageContainer>
);

export const NotFoundPage = () => (
    <PageContainer>
        <h1 className="mb-24">Page Not Found</h1>
        <p className="subtext" style={{ fontSize: '18px', color: '#666' }}>
            The page you are looking for does not exist.
        </p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '24px', color: 'var(--accent-color)', fontWeight: '600' }}>
            Return Home →
        </Link>
    </PageContainer>
);
