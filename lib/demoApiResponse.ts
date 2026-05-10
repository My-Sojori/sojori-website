/**
 * Normalise les réponses srv-crm / Express qui utilisent encore `{ errors: [...] }`
 * sans `success` / `error` (voir errorHandler global).
 */
export function normalizeDemoBackendResponse(raw: unknown): Record<string, unknown> {
  const base = raw && typeof raw === 'object' && !Array.isArray(raw) ? { ...(raw as object) } : {};
  const o = base as Record<string, unknown>;

  if (o.success === true) return o;

  if (typeof o.error === 'string' && o.error.trim()) {
    if (o.success == null) o.success = false;
    return o;
  }

  const errors = o.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    const e0 = errors[0];
    let msg = '';
    if (typeof e0 === 'string') msg = e0.trim();
    else if (e0 && typeof e0 === 'object') {
      const e = e0 as Record<string, unknown>;
      msg = String(e.message ?? e.error ?? e.msg ?? '').trim();
    }
    if (msg) {
      o.error = msg;
      o.success = false;
    }
  }

  if (typeof o.message === 'string' && o.message.trim() && !o.error) {
    o.error = o.message.trim();
    if (o.success == null) o.success = false;
  }

  return o;
}

export function demoResponseErrorMessage(o: Record<string, unknown>): string {
  if (typeof o.error === 'string' && o.error.trim()) return o.error.trim();
  if (typeof o.message === 'string' && o.message.trim()) return o.message.trim();
  const errors = o.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    const e0 = errors[0];
    if (typeof e0 === 'string' && e0.trim()) return e0.trim();
    if (e0 && typeof e0 === 'object') {
      const e = e0 as Record<string, unknown>;
      const m = String(e.message ?? e.error ?? e.msg ?? '').trim();
      if (m) return m;
    }
  }
  return '';
}
