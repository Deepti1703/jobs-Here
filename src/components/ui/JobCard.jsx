import React from 'react';
import { Button } from './Button';
import './JobCard.css';

export const JobCard = ({ job, onView, onSave, isSaved }) => {
    const { title, company, location, mode, experience, salaryRange, source, postedDaysAgo } = job;

    return (
        <div className="job-card">
            <div className="job-card-header">
                <span className="source-badge">{source}</span>
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
