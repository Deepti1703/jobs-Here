import React from 'react';
import './Card.css';

export const Card = ({ children, title, padding = 'large' }) => {
    return (
        <div className={`card card-padding-${padding}`}>
            {title && <h3 className="card-title serif">{title}</h3>}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};
