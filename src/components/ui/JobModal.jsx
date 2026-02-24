import React from 'react';
import { Button } from './Button';
import './JobModal.css';

export const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <span className="eyebrow">{job.company}</span>
                    <h2 className="serif">{job.title}</h2>
                    <div className="modal-quick-meta">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.mode}</span>
                        <span>•</span>
                        <span>{job.salaryRange}</span>
                    </div>
                </div>

                <div className="modal-body">
                    <section className="modal-section">
                        <h4 className="serif">Description</h4>
                        <p>{job.description}</p>
                    </section>

                    <section className="modal-section">
                        <h4 className="serif">Skills Required</h4>
                        <div className="skills-tags">
                            {job.skills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="modal-footer">
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                        <Button style={{ width: '100%' }}>Apply Now</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};
