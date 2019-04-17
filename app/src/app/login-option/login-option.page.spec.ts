import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOptionPage } from './login-option.page';

describe('LoginOptionPage', () => {
  let component: LoginOptionPage;
  let fixture: ComponentFixture<LoginOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
