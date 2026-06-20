import { renderHook, act } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  it('should execute immediately if immediate is true', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useAsync(mockFn, true));

    expect(result.current.status).toBe('pending');
    
    // Wait for the promise to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should not execute immediately if immediate is false', () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useAsync(mockFn, false));

    expect(result.current.status).toBe('idle');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    const mockFn = vi.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useAsync(mockFn, true));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe(error);
  });
});
