import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprotPrikeyComponent } from './exprot-prikey.component';

describe('ExprotPrikeyComponent', () => {
  let component: ExprotPrikeyComponent;
  let fixture: ComponentFixture<ExprotPrikeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprotPrikeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprotPrikeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
