import React from 'react';
import { Button } from './Button';
import './JobCard.css';

export const JobCard = ({ job, onView, onSave, isSaved, matchScore, status, onStatusChange }) => {
    const { id, title, company, location, mode, experience, salaryRange, source, postedDaysAgo } = job;

    const getScoreCategory = (score) => {
        if (score >= 80) return 'high';
        if (score >= 60) return 'medium';
        if (score >= 40) return 'low';
        return 'none';
    };

    const currentStatus = status || 'Not Applied';

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="flex gap-8 items-center">
                    <span className="source-badge">{source}</span>
                    {matchScore !== undefined && (
                        <span className={`match-badge ${getScoreCategory(matchScore)}`}>
                            {matchScore}% Match
                        </span>
                    )}
                    {currentStatus !== 'Not Applied' && (
                        <span className={`status-badge ${currentStatus.toLowerCase().replace(' ', '-')}`}>
                            {currentStatus}
                        </span>
                    )}
                </div>
                <span className="posted-time">{postedDaysAgo === 0 ? 'Today' : `${postedDaysAgo} days ago`}</span>
            </div>

            <h3 className="job-title serif">{title}</h3>
            <p className="company-name">{company}</p>

            <div className="job-meta">
                <div className="meta-item">
                    <span className="meta-label">Location:</span> {location} ({mode})
                </div>
                <div className="meta-item">
                    <span className="meta-label">Exp:</span> {experience}
                </div>
                <div className="meta-item">
                    <span className="meta-label">Salary:</span> {salaryRange}
                </div>
            </div>

            <div className="status-selector mb-16">
                <label className="input-label mb-4" style={{ fontSize: '10px' }}>Application Status</label>
                <div className="status-buttons">
                    {['Not Applied', 'Applied', 'Rejected', 'Selected'].map(s => (
                        <button
                            key={s}
                            className={`status-btn ${currentStatus === s ? 'active' : ''}`}
                            onClick={() => onStatusChange(id, s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="job-card-footer">
                <div className="flex gap-8">
                    <Button variant="secondary" onClick={() => onView(job)}>View</Button>
                    <Button variant="secondary" onClick={() => onSave(job)}>
                        {isSaved ? 'Saved' : 'Save'}
                    </Button>
                </div>
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                    <Button>Apply</Button>
                </a>
            </div>
        </div>
    );
};
