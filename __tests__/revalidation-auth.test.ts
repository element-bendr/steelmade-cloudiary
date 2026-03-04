import { describe, expect, it } from 'vitest';
import {
  extractBearerToken,
  getPresentedRevalidationSecret,
  getRevalidationSecrets,
  isAuthorizedRevalidationRequest,
} from '../lib/revalidation-auth';

describe('revalidation auth helpers', () => {
  it('prefers the canonical secret but supports the legacy alias', () => {
    expect(
      getRevalidationSecrets({
        REVALIDATION_SECRET: 'primary-secret',
        SANITY_REVALIDATE_SECRET: 'legacy-secret',
      }),
    ).toEqual(['primary-secret', 'legacy-secret']);
  });

  it('deduplicates and trims configured secrets', () => {
    expect(
      getRevalidationSecrets({
        REVALIDATION_SECRET: ' same-secret ',
        SANITY_REVALIDATE_SECRET: 'same-secret',
      }),
    ).toEqual(['same-secret']);
  });

  it('extracts bearer tokens without preserving surrounding whitespace', () => {
    expect(extractBearerToken('  Bearer test-secret  ')).toBe('test-secret');
  });

  it('prefers the explicit secret header when present', () => {
    expect(
      getPresentedRevalidationSecret({
        authorizationHeader: 'Bearer primary-secret',
        secretHeader: 'legacy-secret',
      }),
    ).toBe('legacy-secret');
  });

  it('accepts requests that match either supported secret', () => {
    expect(
      isAuthorizedRevalidationRequest(
        { authorizationHeader: 'Bearer legacy-secret' },
        ['primary-secret', 'legacy-secret'],
      ),
    ).toBe(true);
    expect(
      isAuthorizedRevalidationRequest(
        { authorizationHeader: 'Bearer primary-secret' },
        ['primary-secret', 'legacy-secret'],
      ),
    ).toBe(true);
    expect(
      isAuthorizedRevalidationRequest(
        { secretHeader: 'legacy-secret' },
        ['primary-secret', 'legacy-secret'],
      ),
    ).toBe(true);
  });

  it('rejects malformed or mismatched authorization headers', () => {
    expect(
      isAuthorizedRevalidationRequest({ authorizationHeader: 'Token test-secret' }, ['test-secret']),
    ).toBe(false);
    expect(
      isAuthorizedRevalidationRequest({ authorizationHeader: 'Bearer wrong-secret' }, ['test-secret']),
    ).toBe(false);
  });
});
