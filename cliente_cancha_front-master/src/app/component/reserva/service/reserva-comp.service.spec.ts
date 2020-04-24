import { TestBed } from '@angular/core/testing';

import { ReservaCompService } from './reserva-comp.service';

describe('ReservaCompService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservaCompService = TestBed.get(ReservaCompService);
    expect(service).toBeTruthy();
  });
});
