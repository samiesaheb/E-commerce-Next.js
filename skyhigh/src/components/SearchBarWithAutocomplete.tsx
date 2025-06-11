'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { allProductBrands } from '@/data/allBrands'; // Ensure this data structure matches ProductSuggestion

interface ProductSuggestion {
  slug: string;
  name: string;
  category: string;
  description: string; // Not displayed, but can be used for filtering if needed
}

export default function SearchBarWithAutocomplete() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1); // For keyboard navigation
  const searchRef = useRef<HTMLDivElement>(null); // Ref for the entire search container
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element
  const suggestionsRef = useRef<HTMLDivElement>(null); // Ref for the suggestions list
  const router = useRouter();

  // Debounced search logic
  useEffect(() => {
    const handler = setTimeout(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

      if (lowerCaseSearchTerm.length > 1) {
        const filtered = allProductBrands.filter(
          (brand) =>
            brand.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            brand.category.toLowerCase().includes(lowerCaseSearchTerm)
        ).slice(0, 5); // Limit to top 5 suggestions
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setFocusedIndex(-1); // Reset focused index when suggestions change
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setFocusedIndex(-1);
      }
    }, 300); // Debounce time

    return () => clearTimeout(handler);
  }, [searchTerm]); // Dependency array: re-run when searchTerm changes

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // Dependency array: empty, runs once on mount

  // Scroll to focused suggestion
  useEffect(() => {
    if (focusedIndex !== -1 && suggestionsRef.current) {
      const activeItem = suggestionsRef.current.children[focusedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, showSuggestions]); // Re-run when focusedIndex or showSuggestions changes

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []); // useCallback for stable function reference

  const navigateToSuggestion = useCallback((suggestion: ProductSuggestion) => {
    setShowSuggestions(false);
    setSearchTerm(''); // Clear search bar
    router.push(`/brands/${suggestion.category}/${suggestion.slug}`);
    inputRef.current?.focus(); // Return focus to input after navigation
  }, [router]); // Dependency array: re-run when router changes

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor movement in input
      if (suggestions.length > 0) {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
        setShowSuggestions(true); // Ensure suggestions are visible if navigating
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor movement in input
      if (suggestions.length > 0) {
        setFocusedIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
        setShowSuggestions(true); // Ensure suggestions are visible if navigating
      }
    } else if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      if (focusedIndex !== -1 && suggestions[focusedIndex]) {
        navigateToSuggestion(suggestions[focusedIndex]); // Navigate to focused suggestion
      } else {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm.length > 0) {
          router.push(`/brands?query=${encodeURIComponent(trimmedSearchTerm)}`);
          setSearchTerm(''); // Clear search bar
        }
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedIndex(-1);
      inputRef.current?.blur(); // Remove focus from input
    }
  }, [focusedIndex, suggestions, searchTerm, navigateToSuggestion, router]); // Dependency array

  // Helper function to highlight the matching part
  const highlightMatch = (text: string, match: string) => {
    const lowerCaseText = text.toLowerCase();
    const trimmedLowerCaseMatch = match.toLowerCase().trim();

    if (trimmedLowerCaseMatch.length === 0) {
      return <span>{text}</span>;
    }

    const startIndex = lowerCaseText.indexOf(trimmedLowerCaseMatch);

    if (startIndex === -1) {
      return <span>{text}</span>;
    }

    const endIndex = startIndex + trimmedLowerCaseMatch.length;
    const beforeMatch = text.substring(0, startIndex);
    const matchedPart = text.substring(startIndex, endIndex);
    const afterMatch = text.substring(endIndex);

    return (
      <> {/* Using Fragment for direct sibling elements */}
        {beforeMatch}
        <span className="text-gray-500">{matchedPart}</span>
        {afterMatch}
      </>
    );
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <input
        type="text"
        name="query"
        placeholder="Search brands"
        className="w-full px-4 py-2 text-black placeholder-gray-400 focus:outline-none border border-gray-300 rounded-full"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => {
          // Only show suggestions on focus if there's existing search term and suggestions
          if (searchTerm.length > 1 && suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off" // Prevent browser's native autocomplete
        aria-autocomplete="list"
        aria-controls="autocomplete-suggestions"
        aria-expanded={showSuggestions}
        ref={inputRef}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          id="autocomplete-suggestions"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto" // Added max-height and overflow
          ref={suggestionsRef}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.slug} // Use slug for unique key
              role="option"
              aria-selected={focusedIndex === index}
              className={`px-4 py-2 cursor-pointer text-black ${
                focusedIndex === index ? 'bg-pink-100' : 'hover:bg-pink-50' // Highlight focused item
              }`}
              onClick={() => navigateToSuggestion(suggestion)}
              onMouseEnter={() => setFocusedIndex(index)} // Highlight on mouse hover
              onMouseLeave={() => setFocusedIndex(-1)} // Remove highlight on mouse leave
            >
              <p className="font-semibold">{highlightMatch(suggestion.name, searchTerm)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}