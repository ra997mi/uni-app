import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullviewPage } from './fullview.page';

describe('FullviewPage', () => {
  let component: FullviewPage;
  let fixture: ComponentFixture<FullviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
