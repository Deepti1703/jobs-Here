import React from 'react';

const PagePlaceholder = ({ title }) => (
    <div style={{ maxWidth: '720px' }}>
        <h1 className="mb-24">{title}</h1>
        <p className="subtext" style={{ fontSize: '18px', color: '#666', fontStyle: 'italic' }}>
            This section will be built in the next step.
        </p>
    </div>
);

export const HomePage = () => <PagePlaceholder title="Welcome" />;
export const DashboardPage = () => <PagePlaceholder title="Dashboard" />;
export const SavedPage = () => <PagePlaceholder title="Saved Jobs" />;
export const DigestPage = () => <PagePlaceholder title="Career Digest" />;
export const SettingsPage = () => <PagePlaceholder title="Settings" />;
export const ProofPage = () => <PagePlaceholder title="Proof of Work" />;

export const NotFoundPage = () => (
    <div style={{ maxWidth: '720px' }}>
        <h1 className="mb-24">Page Not Found</h1>
        <p className="subtext" style={{ fontSize: '18px', color: '#666' }}>
            The page you are looking for does not exist.
        </p>
    </div>
);
