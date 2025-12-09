// Simple in-memory rate limiter for chat requests
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const MAX_REQUESTS = 18;
const RESET_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt?: number;
}

export function checkRateLimit(sessionId: string): RateLimitResult {
    const now = Date.now();
    const record = rateLimitStore.get(sessionId);

    // If no record or reset time has passed, create new record
    if (!record || now > record.resetAt) {
        rateLimitStore.set(sessionId, {
            count: 1,
            resetAt: now + RESET_INTERVAL,
        });
        return {
            allowed: true,
            remaining: MAX_REQUESTS - 1,
            resetAt: now + RESET_INTERVAL,
        };
    }

    // Check if limit exceeded
    if (record.count >= MAX_REQUESTS) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: record.resetAt,
        };
    }

    // Increment count
    record.count++;
    rateLimitStore.set(sessionId, record);

    return {
        allowed: true,
        remaining: MAX_REQUESTS - record.count,
        resetAt: record.resetAt,
    };
}

export function getRemainingRequests(sessionId: string): number {
    const record = rateLimitStore.get(sessionId);
    if (!record || Date.now() > record.resetAt) {
        return MAX_REQUESTS;
    }
    return Math.max(0, MAX_REQUESTS - record.count);
}

export function resetRateLimit(sessionId: string): void {
    rateLimitStore.delete(sessionId);
}
