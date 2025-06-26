import React, { useState, useRef } from 'react';
import { Filter } from 'lucide-react';
import { FilterChip } from './FilterChip';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from './Button';
import { SlidersHorizontal, X } from 'lucide-react';

const dateRanges = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Custom', value: 'custom' },
];

const segments = [
  { label: 'All Users', value: 'all' },
  { label: 'Returning', value: 'returning' },
  { label: 'New Users', value: 'new' },
];

export interface FilterState {
  dateRange: string;
  segment: string;
  // Add other filter keys here
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onClearFilters }) => {
  const [dateRange, setDateRange] = useState('today');
  const [segment, setSegment] = useState('all');
  const [mobileOpen, setMobileOpen] = useState(false);

  const debouncedOnFilterChange = useDebouncedCallback(onFilterChange, 300);

  // Show chips for applied filters (not default)
  const appliedFilters = [];
  if (dateRange !== 'today') appliedFilters.push({ label: `Date: ${dateRanges.find(d => d.value === dateRange)?.label || dateRange}`, key: 'dateRange' });
  if (segment !== 'all') appliedFilters.push({ label: `Segment: ${segments.find(s => s.value === segment)?.label || segment}`, key: 'segment' });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedOnFilterChange({ ...filters, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
    handleInputChange(e);
  };
  const handleSegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSegment(e.target.value);
    handleInputChange(e);
  };

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };
    if (key === 'dateRange') newFilters.dateRange = 'all'; // or a default value
    if (key === 'segment') newFilters.segment = 'all'; // or a default value
    onFilterChange(newFilters); // Clear immediately, no debounce
  };

  const handleClearAll = () => {
    onClearFilters(); // Clear immediately, no debounce
  };

  return (
    <div className="mb-6">
      {/* Filter Chips */}
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap items-center mb-2 gap-2">
          {appliedFilters.map(f => (
            <FilterChip key={f.key} label={f.label} onRemove={() => handleRemoveFilter(f.key)} />
          ))}
          <button
            onClick={handleClearAll}
            className="ml-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>
      )}
      {/* Mobile Toggle */}
      <button
        className="flex items-center gap-2 md:hidden px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1E2533]/60 text-gray-700 dark:text-gray-200 mb-2"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>
      <div
        className={`flex flex-wrap gap-4 items-center bg-white dark:bg-[#1E2533]/60 rounded-xl shadow p-4 transition-all duration-300
        ${mobileOpen ? 'block' : 'hidden'} md:flex md:gap-4 md:items-center md:bg-white md:dark:bg-[#1E2533]/60 md:rounded-xl md:shadow md:p-4 md:mb-0 md:static md:w-auto md:opacity-100 md:visible
        `}
      >
        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-300 mb-1">Date Range</label>
          <select
            value={dateRange}
            onChange={handleDateChange}
            className="rounded-lg border-gray-300 dark:border-indigo-500/20 bg-gray-50 dark:bg-[#0F172A] text-gray-700 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {dateRanges.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-300 mb-1">Segment</label>
          <select
            value={segment}
            onChange={handleSegmentChange}
            className="rounded-lg border-gray-300 dark:border-indigo-500/20 bg-gray-50 dark:bg-[#0F172A] text-gray-700 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {segments.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}; 