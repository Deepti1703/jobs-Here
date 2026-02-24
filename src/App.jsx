import React, { useState } from 'react';
import { TopBar, ContextHeader, Layout, ProofFooter } from './components/layout/Layout';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
import './index.css';

function App() {
    const [step, setStep] = useState(2);
    const [status, setStatus] = useState('In Progress');

    const proofItems = [
        { label: 'UI Built', completed: true },
        { label: 'Logic Working', completed: true },
        { label: 'Test Passed', completed: false },
        { label: 'Deployed', completed: false },
    ];

    const handleAction = (actionName) => {
        if (actionName === 'Save Configuration') {
            setStep(3);
            setStatus('Shipped');
            alert('Step 2 Complete. Moving to validation phase.');
        } else {
            alert(`${actionName} triggered.`);
        }
    };

    const secondaryContent = (
        <div className="secondary-content">
            <h3 className="serif mb-16">The Signal.</h3>
            <p className="mb-24">Noise is the enemy of progress. Our system filtered over 10,000 irrelevant leads last week so you don't have to.</p>

            <Card title="Privacy & Control" padding="medium">
                <p className="mb-16">Your data remains anonymous until you choose to reveal your identity.</p>
                <div className="mb-16">
                    <code style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', color: '#111' }}>
                        AES-256 Encrypted
                    </code>
                </div>
                <Button variant="secondary" style={{ width: '100%' }} onClick={() => handleAction('View Data Policy')}>
                    View Data Policy
                </Button>
            </Card>
        </div>
    );

    return (
        <div className="app-root">
            <TopBar
                appName="Job Notification App"
                step={step}
                totalSteps={4}
                status={status}
            />

            <ContextHeader
                eyebrow={step === 2 ? "Onboarding" : "Finalizing"}
                title={step === 2 ? "Define Your Career Path" : "Verification in Progress"}
                subtext={step === 2
                    ? "Calibrate your filters to receive only the most relevant opportunities."
                    : "We are now validating your preferences against our live market database."}
            />

            <Layout secondary={secondaryContent}>
                <div style={{ width: '100%' }}>
                    {step === 2 ? (
                        <>
                            <h2 className="mb-40">Your Preferences.</h2>

                            <div className="mb-64">
                                <Card title="Active Search Criteria">
                                    <p className="mb-40 max-width-text">
                                        Specify your non-negotiables. We use these to match you with hiring teams that align with your professional standards.
                                    </p>

                                    <div className="flex gap-16">
                                        <Button onClick={() => handleAction('Update Profile')}>Update Profile</Button>
                                        <Button variant="secondary" onClick={() => handleAction('Manage Alerts')}>Manage Alerts</Button>
                                    </div>
                                </Card>
                            </div>

                            <div className="mb-64">
                                <h3 className="serif mb-24">Core Configuration</h3>
                                <Card padding="large">
                                    <div style={{ maxWidth: '720px' }}>
                                        <Input label="Desired Role" placeholder="e.g. Senior Software Engineer" />
                                        <Input label="Minimum Annual Compensation" placeholder="e.g. $160,000" />
                                        <div className="mb-24">
                                            <label className="input-label mb-8">Specialized Experience</label>
                                            <textarea
                                                className="input-field"
                                                style={{ width: '100%', minHeight: '160px', resize: 'none' }}
                                                placeholder="Briefly describe your expertise..."
                                            />
                                        </div>
                                        <Button style={{ padding: '16px 40px' }} onClick={() => handleAction('Save Configuration')}>
                                            Save & Continue
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </>
                    ) : (
                        <Card title="Analysis Complete">
                            <p className="mb-24">Our engine has identified 12 high-intent matches based on your criteria.</p>
                            <Button onClick={() => setStep(2)}>Adjust Filters</Button>
                        </Card>
                    )}

                    <div className="mb-64">
                        <h3 className="serif mb-24">Operational Excellence</h3>
                        <div className="typography-demo">
                            <h1 className="mb-24">Calm. Intentional.</h1>
                            <h2 className="mb-16">Zero Noise.</h2>
                            <p className="mb-24 max-width-text">Our commitment is to your focus. You only hear from us when an opportunity meets 100% of your criteria.</p>
                            <p className="mb-16" style={{ fontSize: '14px', color: '#666', letterSpacing: '0.02em' }}>
                                System availability: High | Last data sync: 4 minutes ago
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>

            <ProofFooter items={proofItems} />

            <style>{`
                .app-root {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    width: 100%;
                }
                .flex { display: flex; }
                .gap-16 { gap: 16px; }
            `}</style>
        </div>
    );
}

export default App;
