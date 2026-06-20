import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from './useIntersectionObserver';
import { createRef } from 'react';

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: any;

  beforeEach(() => {
    mockIntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should initialize and observe the element', () => {
    const ref = createRef<Element>();
    // @ts-ignore
    ref.current = document.createElement('div');

    renderHook(() => useIntersectionObserver(ref, {}));
    
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });
});
