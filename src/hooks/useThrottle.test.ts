import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value', () => {
    const { result } = renderHook(() => useThrottle('test', 500));
    expect(result.current).toBe('test');
  });

  it('should throttle updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 500),
      { initialProps: { value: 1 } }
    );

    expect(result.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(250);
    });
    
    rerender({ value: 3 });
    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe(3);
  });
});
