import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

export const TopBar = ({ appName }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="top-bar">
            <div className="top-bar-left">
                <NavLink to="/" className="app-logo">{appName}</NavLink>
            </div>

            <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                <span className="hamburger"></span>
            </button>

            <nav className={`top-bar-nav ${isMenuOpen ? 'open' : ''}`}>
                <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                <NavLink to="/saved" onClick={() => setIsMenuOpen(false)}>Saved</NavLink>
                <NavLink to="/digest" onClick={() => setIsMenuOpen(false)}>Digest</NavLink>
                <NavLink to="/settings" onClick={() => setIsMenuOpen(false)}>Settings</NavLink>
                <NavLink to="/proof" onClick={() => setIsMenuOpen(false)}>Proof</NavLink>
            </nav>

            <div className="top-bar-right">
                <div className="status-badge shipped">Online</div>
            </div>
        </header>
    );
};

export const ContextHeader = ({ title, subtext, eyebrow }) => (
    <section className="context-header">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p className="subtext">{subtext}</p>
    </section>
);

export const Layout = ({ children }) => (
    <main className="layout-container">
        <div className="primary-workspace">
            {children}
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
