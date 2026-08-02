import { timingSafeEqual } from 'node:crypto';

type RevalidationEnv = Partial<Record<'REVALIDATION_SECRET' | 'SANITY_REVALIDATE_SECRET', string | undefined>>;
type RevalidationRequestAuth = {
  authorizationHeader?: string | null;
  secretHeader?: string | null;
};

function normalizeSecret(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export function getRevalidationSecrets(env?: RevalidationEnv) {
  const source = env ?? (process.env as RevalidationEnv);
  const secrets = [source.REVALIDATION_SECRET, source.SANITY_REVALIDATE_SECRET]
    .map((value) => normalizeSecret(value))
    .filter((value): value is string => Boolean(value));

  return Array.from(new Set(secrets));
}

export function extractBearerToken(authHeader?: string | null) {
  const normalizedHeader = authHeader?.trim();

  if (!normalizedHeader) {
    return null;
  }

  const [scheme, ...valueParts] = normalizedHeader.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'bearer' || valueParts.length === 0) {
    return null;
  }

  return normalizeSecret(valueParts.join(' '));
}

export function getPresentedRevalidationSecret({
  authorizationHeader,
  secretHeader,
}: RevalidationRequestAuth) {
  return normalizeSecret(secretHeader) ?? extractBearerToken(authorizationHeader);
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAuthorizedRevalidationRequest(
  requestAuth: RevalidationRequestAuth,
  secrets: string[] = getRevalidationSecrets(),
) {
  const token = getPresentedRevalidationSecret(requestAuth);

  if (!token || secrets.length === 0) {
    return false;
  }

  return secrets.some((secret) => safeEqual(token, secret));
}
