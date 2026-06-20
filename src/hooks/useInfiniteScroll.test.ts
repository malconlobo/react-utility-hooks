import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  let mockIntersectionObserver: any;

  beforeEach(() => {
    mockIntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should initialize and return a ref', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll(callback));
    
    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('current');
  });
});
