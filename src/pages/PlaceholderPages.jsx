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

const calculateMatchScore = (job, prefs) => {
    if (!prefs) return 0;

    let score = 0;

    // +25 if any roleKeyword appears in job.title (case-insensitive)
    const roleKeywords = (prefs.roleKeywords || "").split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    if (roleKeywords.some(k => job.title.toLowerCase().includes(k))) {
        score += 25;
    }

    // +15 if any roleKeyword appears in job.description
    if (roleKeywords.some(k => job.description.toLowerCase().includes(k))) {
        score += 15;
    }

    // +15 if job.location matches preferredLocations
    const preferredLocations = prefs.preferredLocations || [];
    if (preferredLocations.includes(job.location)) {
        score += 15;
    }

    // +10 if job.mode matches preferredMode
    const preferredMode = prefs.preferredMode || [];
    if (preferredMode.includes(job.mode)) {
        score += 10;
    }

    // +10 if job.experience matches experienceLevel
    if (job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // +15 if overlap between job.skills and user.skills (any match)
    const userSkills = (prefs.skills || "").split(',').map(s => s.trim().toLowerCase()).filter(s => s);
    const jobSkills = job.skills.map(s => s.toLowerCase());
    if (userSkills.some(s => jobSkills.includes(s))) {
        score += 15;
    }

    // +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // +5 if source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(100, score);
};

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
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);
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

        const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        setPreferences(prefs);
    }, []);

    useEffect(() => {
        let result = jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));

        result = result.filter(job => {
            const matchesQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.query.toLowerCase());
            const matchesLocation = !filters.location || job.location === filters.location;
            const matchesMode = !filters.mode || job.mode === filters.mode;
            const matchesExp = !filters.experience || job.experience === filters.experience;
            const matchesSource = !filters.source || job.source === filters.source;
            const matchesThreshold = !showOnlyMatches || (preferences && job.matchScore >= (preferences.minMatchScore || 40));

            return matchesQuery && matchesLocation && matchesMode && matchesExp && matchesSource && matchesThreshold;
        });

        if (filters.sort === 'salary') {
            result.sort((a, b) => {
                const getSal = (s) => parseInt(s.replace(/[^0-9]/g, '')) || 0;
                return getSal(b.salaryRange) - getSal(a.salaryRange);
            });
        } else if (filters.sort === 'score') {
            result.sort((a, b) => b.matchScore - a.matchScore);
        } else {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        }

        setFilteredJobs(result);
    }, [filters, preferences, showOnlyMatches]);

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
            <div className="flex justify-between items-center mb-24">
                <h1 style={{ margin: 0 }}>Dashboard</h1>
                {preferences && (
                    <div className="flex items-center gap-12 toggle-container">
                        <label className="flex items-center gap-8 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showOnlyMatches}
                                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                            />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Show only jobs above my threshold ({preferences.minMatchScore}%)</span>
                        </label>
                    </div>
                )}
            </div>

            {!preferences && (
                <div className="preferences-banner mb-24">
                    <p>Set your preferences to activate intelligent matching.</p>
                    <Link to="/settings"><Button variant="secondary" size="small">Set Preferences</Button></Link>
                </div>
            )}

            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                showScoreSort={!!preferences}
            />

            {filteredJobs.length > 0 ? (
                <div className="job-grid">
                    {filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={toggleSave}
                            isSaved={savedJobIds.includes(job.id)}
                            matchScore={preferences ? job.matchScore : undefined}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-5) 0' }}>
                    <h3 className="serif">No roles match your criteria.</h3>
                    <p style={{ color: '#666' }}>Adjust filters or lower your matching threshold.</p>
                </div>
            )}

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

            <style>{`
                .job-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: var(--space-3);
                }
                .preferences-banner {
                    background: #fff;
                    border: 1px solid var(--accent-color);
                    padding: 16px 24px;
                    border-radius: var(--border-radius);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--accent-color);
                    font-weight: 500;
                }
                .preferences-banner p { margin: 0; }
                .toggle-container {
                    background: #fff;
                    padding: 8px 16px;
                    border-radius: 20px;
                    border: 1px solid var(--border-color);
                }
                .cursor-pointer { cursor: pointer; }
                .justify-between { justify-content: space-between; }
            `}</style>
        </PageContainer>
    );
};

export const SavedPage = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [preferences, setPreferences] = useState(null);

    useEffect(() => {
        const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        setPreferences(prefs);

        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const filtered = jobs.filter(j => savedIds.includes(j.id)).map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs)
        }));
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
                            matchScore={preferences ? job.matchScore : undefined}
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

export const SettingsPage = () => {
    const [prefs, setPrefs] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: 'Fresher',
        skills: '',
        minMatchScore: 40
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        if (stored) setPrefs(stored);
    }, []);

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const toggleMultiSelect = (key, value) => {
        setPrefs(prev => {
            const current = prev[key] || [];
            const newValue = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [key]: newValue };
        });
    };

    const locations = ['Bangalore', 'Mumbai', 'Gurgaon', 'Chennai', 'Pune', 'Hyderabad', 'Remote'];
    const modes = ['Remote', 'Hybrid', 'Onsite'];

    return (
        <PageContainer>
            <h1 className="mb-24">Settings</h1>
            <p className="mb-40" style={{ color: '#666' }}>Define your career filters to calibrate our intelligent matching engine.</p>

            <Card padding="large">
                <div className="mb-24">
                    <label className="input-label mb-8">Role Keywords (comma separated)</label>
                    <input
                        className="input-field"
                        placeholder="e.g. React Developer, SDE, Product Manager"
                        value={prefs.roleKeywords}
                        onChange={(e) => setPrefs({ ...prefs, roleKeywords: e.target.value })}
                    />
                </div>

                <div className="mb-24">
                    <label className="input-label mb-8">Preferred Locations</label>
                    <div className="flex flex-wrap gap-8">
                        {locations.map(loc => (
                            <button
                                key={loc}
                                className={`tag-button ${prefs.preferredLocations.includes(loc) ? 'active' : ''}`}
                                onClick={() => toggleMultiSelect('preferredLocations', loc)}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-24">
                    <label className="input-label mb-8">Work Mode</label>
                    <div className="flex gap-16">
                        {modes.map(mode => (
                            <label key={mode} className="flex items-center gap-8 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={prefs.preferredMode.includes(mode)}
                                    onChange={() => toggleMultiSelect('preferredMode', mode)}
                                />
                                {mode}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-24">
                    <label className="input-label mb-8">Experience Level</label>
                    <select
                        className="input-field"
                        value={prefs.experienceLevel}
                        onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                    >
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Year</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                    </select>
                </div>

                <div className="mb-24">
                    <label className="input-label mb-8">Your Skills (comma separated)</label>
                    <input
                        className="input-field"
                        placeholder="e.g. Java, React, SQL, Figma"
                        value={prefs.skills}
                        onChange={(e) => setPrefs({ ...prefs, skills: e.target.value })}
                    />
                </div>

                <div className="mb-40">
                    <div className="flex justify-between mb-8">
                        <label className="input-label">Minimum Match Score Threshold</label>
                        <span style={{ fontWeight: '600', color: 'var(--accent-color)' }}>{prefs.minMatchScore}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className="slider"
                        value={prefs.minMatchScore}
                        onChange={(e) => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
                    />
                </div>

                <Button
                    style={{ width: '100%' }}
                    onClick={handleSave}
                >
                    {saved ? 'Preferences Saved ✓' : 'Save Preferences'}
                </Button>
            </Card>

            <style>{`
                .tag-button {
                    background: #fff;
                    border: 1px solid var(--border-color);
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                }
                .tag-button.active {
                    background: var(--accent-color);
                    color: #fff;
                    border-color: var(--accent-color);
                }
                .flex-wrap { flex-wrap: wrap; }
                .gap-16 { gap: 16px; }
                .slider {
                    width: 100%;
                    accent-color: var(--accent-color);
                }
            `}</style>
        </PageContainer>
    );
};

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
