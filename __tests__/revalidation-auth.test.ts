import { describe, expect, it } from 'vitest';
import {
  extractBearerToken,
  getPresentedRevalidationSecret,
  getRevalidationSecrets,
  isAuthorizedRevalidationRequest,
} from '../lib/revalidation-auth';

describe('[unit][auth] revalidation auth helpers', () => {
  it('[secrets] returns canonical and legacy secrets in priority order', () => {
    expect(
      getRevalidationSecrets({
        REVALIDATION_SECRET: 'primary-secret',
        SANITY_REVALIDATE_SECRET: 'legacy-secret',
      }),
    ).toEqual(['primary-secret', 'legacy-secret']);
  });

  it('[secrets] deduplicates and trims configured secrets', () => {
    expect(
      getRevalidationSecrets({
        REVALIDATION_SECRET: ' same-secret ',
        SANITY_REVALIDATE_SECRET: 'same-secret',
      }),
    ).toEqual(['same-secret']);
  });

  it('[headers] extracts bearer token and trims whitespace', () => {
    expect(extractBearerToken('  Bearer test-secret  ')).toBe('test-secret');
  });

  it('[headers] prefers explicit secret header over authorization header', () => {
    expect(
      getPresentedRevalidationSecret({
        authorizationHeader: 'Bearer primary-secret',
        secretHeader: 'legacy-secret',
      }),
    ).toBe('legacy-secret');
  });

  it('[authz] accepts requests matching any supported secret', () => {
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

  it('[authz] rejects malformed or mismatched authorization headers', () => {
    expect(
      isAuthorizedRevalidationRequest({ authorizationHeader: 'Token test-secret' }, ['test-secret']),
    ).toBe(false);
    expect(
      isAuthorizedRevalidationRequest({ authorizationHeader: 'Bearer wrong-secret' }, ['test-secret']),
    ).toBe(false);
  });
});
