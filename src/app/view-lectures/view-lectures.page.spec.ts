import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLecturesPage } from './view-lectures.page';

describe('ViewLecturesPage', () => {
  let component: ViewLecturesPage;
  let fixture: ComponentFixture<ViewLecturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLecturesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLecturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
