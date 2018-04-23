import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordinfoComponent } from './recordinfo.component';

describe('RecordinfoComponent', () => {
  let component: RecordinfoComponent;
  let fixture: ComponentFixture<RecordinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
