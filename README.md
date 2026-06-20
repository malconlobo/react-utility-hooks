# @malconlobo/react-utility-hooks

A collection of robust, type-safe, and thoroughly tested utility React hooks.

## Installation

```bash
npm install @malconlobo/react-utility-hooks
```

## Hooks

### `useDebounce`
Delays updating a value until after a specified delay has elapsed since the last time the value was changed.

**Parameters**
- `value: T` - The value to debounce.
- `delay: number` - The delay in milliseconds.

**Example**
```tsx
import { useState, useEffect } from 'react';
import { useDebounce } from '@malconlobo/react-utility-hooks';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Fetch results
      console.log('Fetching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### `useThrottle`
Returns a throttled version of a value that only updates at most once every specified amount of milliseconds.

**Parameters**
- `value: T` - The value to throttle.
- `delay: number` - The throttle limit in milliseconds.

**Example**
```tsx
import { useState } from 'react';
import { useThrottle } from '@malconlobo/react-utility-hooks';

function ThrottledInput() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 1000);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Throttled value: {throttledValue}</p>
    </div>
  );
}
```

### `usePrevious`
Stores and returns the previous state or prop value.

**Parameters**
- `value: T` - The value to track.

**Example**
```tsx
import { useState } from 'react';
import { usePrevious } from '@malconlobo/react-utility-hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### `useLocalStorage`
Syncs state to local storage so that it persists through a page refresh.

**Parameters**
- `key: string` - The local storage key.
- `initialValue: T` - The initial value if no value exists in local storage.

**Example**
```tsx
import { useLocalStorage } from '@malconlobo/react-utility-hooks';

function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

### `useMediaQuery`
Tracks the state of a CSS media query.

**Parameters**
- `query: string` - The media query to track (e.g., `(min-width: 768px)`).

**Example**
```tsx
import { useMediaQuery } from '@malconlobo/react-utility-hooks';

function ResponsiveComponent() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return <div>{isDesktop ? 'Desktop View' : 'Mobile View'}</div>;
}
```

### `useAsync`
Handles asynchronous operations (promises) providing `status`, `value`, and `error` state.

**Parameters**
- `asyncFunction: () => Promise<T>` - The async function to execute.
- `immediate?: boolean` - (Optional, default `true`) Whether to execute the function immediately on mount.

**Example**
```tsx
import { useAsync } from '@malconlobo/react-utility-hooks';

const fetchUser = () => fetch('/api/user').then(res => res.json());

function UserProfile() {
  const { status, value, error, execute } = useAsync(fetchUser);

  if (status === 'pending' || status === 'idle') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error?.message}</p>;

  return (
    <div>
      <h1>{value?.name}</h1>
      <button onClick={execute}>Refresh</button>
    </div>
  );
}
```

### `useIntersectionObserver`
Tracks the intersection of a target element with the viewport.

**Parameters**
- `elementRef: RefObject<Element>` - The ref of the element to observe.
- `options: IntersectionObserverInit & { freezeOnceVisible?: boolean }` - Configuration options:
  - `threshold?: number | number[]` - Ratio of intersection (0 to 1).
  - `root?: Element | null` - Element used as the viewport.
  - `rootMargin?: string` - Margin around the root.
  - `freezeOnceVisible?: boolean` - Stop tracking once the element becomes visible.

**Example**
```tsx
import { useRef } from 'react';
import { useIntersectionObserver } from '@malconlobo/react-utility-hooks';

function FadeInSection() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true, threshold: 0.5 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}>
      I will fade in when visible!
    </div>
  );
}
```

### `useInfiniteScroll`
Triggers a callback when the user scrolls near the bottom of a container.

**Parameters**
- `callback: () => void` - The function to call when the element intersects.
- `options?: IntersectionObserverInit` - Options for the intersection observer (default: `{ rootMargin: '100px' }`).

**Example**
```tsx
import { useState } from 'react';
import { useInfiniteScroll } from '@malconlobo/react-utility-hooks';

function InfiniteList() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const loadMore = () => {
    // Simulate loading data
    setItems(prev => [...prev, prev.length + 1, prev.length + 2]);
  };

  const loaderRef = useInfiniteScroll<HTMLDivElement>(loadMore);

  return (
    <div>
      {items.map(item => <div key={item} style={{ height: 100 }}>Item {item}</div>)}
      <div ref={loaderRef}>Loading more...</div>
    </div>
  );
}
```

## License
MIT
