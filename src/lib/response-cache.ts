// Simple in-memory cache for AI responses
import type { Message } from './types';

interface CacheEntry {
    query: string;
    response: Omit<Message, 'id'>;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Normalize user input for cache key (lowercase, trim, remove extra spaces)
function normalizeQuery(query: string): string {
    return query.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function getCachedResponse(userMessage: string): Omit<Message, 'id'> | null {
    const normalizedQuery = normalizeQuery(userMessage);
    const entry = cache.get(normalizedQuery);

    if (!entry) return null;

    // Check if cache entry is still valid
    const now = Date.now();
    if (now - entry.timestamp > CACHE_DURATION) {
        cache.delete(normalizedQuery);
        return null;
    }

    console.log('✅ Cache hit for:', userMessage.substring(0, 50));
    return entry.response;
}

export function setCachedResponse(
    userMessage: string,
    response: Omit<Message, 'id'>
): void {
    const normalizedQuery = normalizeQuery(userMessage);
    cache.set(normalizedQuery, {
        query: normalizedQuery,
        response,
        timestamp: Date.now(),
    });
    console.log('💾 Cached response for:', userMessage.substring(0, 50));
}

export function clearCache(): void {
    cache.clear();
    console.log('🗑️ Cache cleared');
}

export function getCacheStats(): { size: number; entries: string[] } {
    return {
        size: cache.size,
        entries: Array.from(cache.keys()),
    };
}
