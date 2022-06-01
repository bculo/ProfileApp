import { TestBed } from '@angular/core/testing';

import { MapperService } from "./MapperService";

describe('MapperService', () => {
  let service: MapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
