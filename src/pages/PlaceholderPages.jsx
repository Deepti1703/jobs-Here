import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { JobCard } from '../components/ui/JobCard';
import { JobModal } from '../components/ui/JobModal';
import { FilterBar } from '../components/ui/FilterBar';
import { jobs } from '../data/jobs';

const PageContainer = ({ children, fullWidth = false }) => (
    <div style={{ maxWidth: fullWidth ? '1400px' : '720px', margin: '0 auto', width: '100%' }}>
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

export const DashboardPage = () => {
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        query: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest'
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(saved);
    }, []);

    useEffect(() => {
        let result = jobs.filter(job => {
            const matchesQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.query.toLowerCase());
            const matchesLocation = !filters.location || job.location === filters.location;
            const matchesMode = !filters.mode || job.mode === filters.mode;
            const matchesExp = !filters.experience || job.experience === filters.experience;
            const matchesSource = !filters.source || job.source === filters.source;

            return matchesQuery && matchesLocation && matchesMode && matchesExp && matchesSource;
        });

        if (filters.sort === 'salary') {
            result.sort((a, b) => {
                const getSal = (s) => parseInt(s.replace(/[^0-9]/g, '')) || 0;
                return getSal(b.salaryRange) - getSal(a.salaryRange);
            });
        } else {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        }

        setFilteredJobs(result);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleSave = (job) => {
        const currentSaved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        let newSaved;
        if (currentSaved.includes(job.id)) {
            newSaved = currentSaved.filter(id => id !== job.id);
        } else {
            newSaved = [...currentSaved, job.id];
        }
        localStorage.setItem('savedJobs', JSON.stringify(newSaved));
        setSavedJobIds(newSaved);
    };

    return (
        <PageContainer fullWidth={true}>
            <h1 className="mb-24">Dashboard</h1>

            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {filteredJobs.length > 0 ? (
                <div className="job-grid">
                    {filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={toggleSave}
                            isSaved={savedJobIds.includes(job.id)}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-5) 0' }}>
                    <h3 className="serif">No jobs match your search.</h3>
                    <p style={{ color: '#666' }}>Try adjusting your filters or search terms.</p>
                </div>
            )}

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

            <style>{`
                .job-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: var(--space-3);
                }
            `}</style>
        </PageContainer>
    );
};

export const SavedPage = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const filtered = jobs.filter(j => savedIds.includes(j.id));
        setSavedJobs(filtered);
    }, []);

    const handleRemove = (job) => {
        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const newIds = savedIds.filter(id => id !== job.id);
        localStorage.setItem('savedJobs', JSON.stringify(newIds));
        setSavedJobs(savedJobs.filter(j => j.id !== job.id));
    };

    return (
        <PageContainer fullWidth={true}>
            <h1 className="mb-24">Saved Jobs</h1>

            {savedJobs.length > 0 ? (
                <div className="job-grid">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={handleRemove}
                            isSaved={true}
                        />
                    ))}
                </div>
            ) : (
                <Card padding="large" style={{ textAlign: 'center', borderStyle: 'dashed' }}>
                    <p className="mb-16" style={{ fontSize: '18px', fontWeight: '500' }}>Your shortlist is empty.</p>
                    <p style={{ color: '#666', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                        Browse the dashboard and save jobs to see them here. Your saved jobs are stored locally for your convenience.
                    </p>
                </Card>
            )}

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

            <style>{`
                .job-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: var(--space-3);
                }
            `}</style>
        </PageContainer>
    );
};

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
                    <option>Fresher</option>
                    <option>0-1 Year</option>
                    <option>1-3 Years</option>
                    <option>3-5 Years</option>
                    <option>Senior (5+)</option>
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
