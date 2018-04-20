import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSignedComponent } from './multi-signed.component';

describe('MultiSignedComponent', () => {
  let component: MultiSignedComponent;
  let fixture: ComponentFixture<MultiSignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
