import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableaccountComponent } from './tableaccount.component';

describe('TableaccountComponent', () => {
  let component: TableaccountComponent;
  let fixture: ComponentFixture<TableaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
