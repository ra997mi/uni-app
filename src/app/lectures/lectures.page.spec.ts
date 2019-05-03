import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesPage } from './lectures.page';

describe('LecturesPage', () => {
  let component: LecturesPage;
  let fixture: ComponentFixture<LecturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
