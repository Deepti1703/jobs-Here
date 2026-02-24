import React from 'react';
import './FilterBar.css';

export const FilterBar = ({ filters, onFilterChange, showScoreSort }) => {
    return (
        <div className="filter-bar">
            <div className="filter-group-main">
                <input
                    type="text"
                    placeholder="Search by title or company..."
                    className="filter-search"
                    value={filters.query}
                    onChange={(e) => onFilterChange('query', e.target.value)}
                />
            </div>

            <div className="filter-group-dropdowns">
                <select
                    value={filters.location}
                    onChange={(e) => onFilterChange('location', e.target.value)}
                >
                    <option value="">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Remote">Remote (Everywhere)</option>
                </select>

                <select
                    value={filters.mode}
                    onChange={(e) => onFilterChange('mode', e.target.value)}
                >
                    <option value="">All Modes</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    value={filters.experience}
                    onChange={(e) => onFilterChange('experience', e.target.value)}
                >
                    <option value="">All Exp</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 Year</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                </select>

                <select
                    value={filters.source}
                    onChange={(e) => onFilterChange('source', e.target.value)}
                >
                    <option value="">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>

                <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange('sort', e.target.value)}
                    className="filter-sort"
                >
                    <option value="latest">Latest First</option>
                    {showScoreSort && <option value="score">Match Score</option>}
                    <option value="salary">Salary (High to Low)</option>
                </select>
            </div>
        </div>
    );
};
