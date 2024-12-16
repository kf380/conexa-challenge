import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from './roles.guards';

describe('RolesGuard', () => {
  let guard: RolesGuard;

  beforeEach(() => {
    guard = new RolesGuard(new Reflector());
  });

  it('10. should allow if no roles are required', () => {
    const context = {
      getHandler: () => {},
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'regular' } }),
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(guard['reflector'], 'get').mockReturnValue(undefined);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('11. should block if user role is not requiredRoles', () => {
    const context = {
      getHandler: () => {},
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'regular' } }),
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(guard['reflector'], 'get').mockReturnValue(['admin']);
    expect(() => guard.canActivate(context)).toThrow();
  });

  it('12. should pass if user role matches required role', () => {
    const context = {
      getHandler: () => {},
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'admin' } }),
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(guard['reflector'], 'get').mockReturnValue(['admin']);
    expect(guard.canActivate(context)).toBe(true);
  });
});
