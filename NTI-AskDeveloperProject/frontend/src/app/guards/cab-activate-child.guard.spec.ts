import { TestBed } from '@angular/core/testing';

import { CabActivateChildGuard } from './cab-activate-child.guard';

describe('CabActivateChildGuard', () => {
  let guard: CabActivateChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CabActivateChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
