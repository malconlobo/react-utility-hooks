# react-utility-hooks

A collection of robust, type-safe utility React hooks.

## Installation

```bash
npm install react-utility-hooks
```

## Hooks Available

- `useDebounce`: Delays updating a value.
- `useThrottle`: Limits how often a value updates.
- `usePrevious`: Tracks the previous state or prop value.
- `useLocalStorage`: Syncs state with local storage.
- `useMediaQuery`: Tracks the state of a CSS media query.
- `useAsync`: Handles asynchronous operations and exposes status/error.
- `useIntersectionObserver`: Tracks element visibility in the viewport.
- `useInfiniteScroll`: Triggers callbacks when scrolling near the bottom of a container.

## Usage Examples

### `useDebounce`
```tsx
import { useState } from 'react';
import { useDebounce } from 'react-utility-hooks';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <input 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
    />
  );
}
```

### `useLocalStorage`
```tsx
import { useLocalStorage } from 'react-utility-hooks';

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

## License
MIT
