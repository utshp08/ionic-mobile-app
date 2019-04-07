import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpassPage } from './resetpass.page';

describe('ResetpassPage', () => {
  let component: ResetpassPage;
  let fixture: ComponentFixture<ResetpassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
