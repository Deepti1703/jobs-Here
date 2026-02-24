import React from 'react';
import './Layout.css';

export const TopBar = ({ appName, step, totalSteps, status }) => (
    <header className="top-bar">
        <div className="top-bar-left">{appName}</div>
        <div className="top-bar-center">Step {step} / {totalSteps}</div>
        <div className="top-bar-right">
            <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
                {status}
            </span>
        </div>
    </header>
);

export const ContextHeader = ({ title, subtext, eyebrow }) => (
    <section className="context-header">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p className="subtext">{subtext}</p>
    </section>
);

export const Layout = ({ children, secondary }) => (
    <main className="layout-container">
        <div className="primary-workspace">
            {children}
        </div>
        <div className="secondary-panel">
            {secondary}
        </div>
    </main>
);

export const ProofFooter = ({ items }) => (
    <footer className="proof-footer">
        <div className="checklist">
            {items.map((item, index) => (
                <div key={index} className="checklist-item">
                    <span className={`checkbox ${item.completed ? 'checked' : ''}`}>
                        {item.completed ? '▣' : '□'}
                    </span>
                    <span className="label">{item.label}</span>
                </div>
            ))}
        </div>
    </footer>
);
