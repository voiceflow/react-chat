import { describe, expect, it } from 'vitest';

import { TurnType } from '@/types';

import { getLastSystemTurn, resolveAction } from './runtime.utils';

describe('getLastSystemTurn', () => {
  it('should return the last SYSTEM turn', () => {
    const mockTurns1 = [{ type: TurnType.USER }, { type: TurnType.SYSTEM }] as any[];
    expect(getLastSystemTurn(mockTurns1)).toBe(mockTurns1[1]);

    const mockTurns2 = [{ type: TurnType.SYSTEM }, { type: TurnType.USER }] as any[];
    expect(getLastSystemTurn(mockTurns2)).toBe(mockTurns2[0]);
  });

  it('should return null if no SYSTEM turn is present', () => {
    expect(getLastSystemTurn([])).toBeNull();
    expect(getLastSystemTurn([{ type: TurnType.USER }] as any)).toBeNull();
  });
});

describe('resolveAction', () => {
  it('should return the matched action if user text request matches system action name', () => {
    const mockTurns = [
      // wrong system turn:
      { type: TurnType.SYSTEM, actions: [{ name: 'action1', request: 'request0' }] },
      // right system turn:
      { type: TurnType.SYSTEM, actions: [{ name: 'action1', request: 'request1' }] },
      { type: TurnType.USER, actions: [] },
    ] as any[];

    const result = resolveAction({ type: 'text', payload: 'action1' }, mockTurns);
    expect(result).toEqual('request1');
  });

  it('should return the original action if no matching system action is found', () => {
    const mockTurns = [
      { type: TurnType.USER, actions: [] },
      { type: TurnType.SYSTEM, actions: [{ name: 'action1', request: 'request1' }] },
    ] as any[];

    const action = { type: 'text', payload: 'non-existent' };
    const result = resolveAction(action, mockTurns);
    expect(result).toEqual(action);
  });

  it('should return the original action if action is not a text request', () => {
    const mockTurns = [{ type: TurnType.SYSTEM, actions: [{ name: 'action1', request: 'request1' }] }] as any[];

    const action = { type: 'not-text', payload: 'action1' };
    const result = resolveAction(action, mockTurns);
    expect(result).toEqual(action);
  });
});
