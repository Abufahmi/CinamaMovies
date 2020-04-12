import { TestBed } from '@angular/core/testing';

import { CryptService } from './crypt.service';

describe('CryptService', () => {
  let service: CryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
