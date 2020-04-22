import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetUpdateComponent } from './widget-update.component';

describe('WidgetUpdateComponent', () => {
  let component: WidgetUpdateComponent;
  let fixture: ComponentFixture<WidgetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
