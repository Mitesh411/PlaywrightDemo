import { APIResponse } from '@playwright/test';

export class SecurityUtils {
    /**
     * Validates that standard security headers are present in the response.
     */
    static validateSecurityHeaders(response: APIResponse) {
        const headers = response.headers();
        const missingHeaders: string[] = [];

        if (!headers['content-security-policy']) {
            missingHeaders.push('Content-Security-Policy');
        }
        if (!headers['x-frame-options']) {
            missingHeaders.push('X-Frame-Options');
        }
        if (!headers['x-content-type-options']) {
            missingHeaders.push('X-Content-Type-Options');
        }
        if (!headers['strict-transport-security']) {
            missingHeaders.push('Strict-Transport-Security');
        }

        return {
            isValid: missingHeaders.length === 0,
            missingHeaders
        };
    }

    /**
     * Returns a list of standard XSS payloads for injection testing.
     */
    static getXssPayloads(): string[] {
        return [
            '<script>alert(1)</script>',
            '"><script>alert(1)</script>',
            '<img src=x onerror=alert(1)>',
            'javascript:alert(1)'
        ];
    }

    /**
     * Returns a list of standard SQL injection payloads.
     */
    static getSqlInjectionPayloads(): string[] {
        return [
            "' OR '1'='1",
            "admin' --",
            "' UNION SELECT null, null, null--"
        ];
    }
}
