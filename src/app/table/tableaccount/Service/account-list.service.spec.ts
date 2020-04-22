import { TestBed, inject } from '@angular/core/testing';

import { AccountListService } from './account-list.service';

describe('AccountListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountListService]
    });
  });

  it('should be created', inject([AccountListService], (service: AccountListService) => {
    expect(service).toBeTruthy();
  }));
});
