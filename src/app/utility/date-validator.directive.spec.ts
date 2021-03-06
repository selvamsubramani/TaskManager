import { DateValidatorDirective } from './date-validator.directive';
import { TestBed, async, ComponentFixtureAutoDetect, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DateValidatorDirective', () => {

  @Component({
    template: '<form #f="ngForm">' +
      '<input type="date" name="startdate"' +
      '[(ngModel)]="StartDate" #startdate="ngModel">' +
      '<input type="date" name="enddate"' +
      '[(ngModel)]="EndDate" #enddate="ngModel" appDateValidator="startdate">'
  })
  class TestComponent {
    StartDate: string;
    EndDate: string;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          FormsModule,
          CommonModule
        ],
        declarations: [
          TestComponent,
          DateValidatorDirective],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true }
        ]
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });


  it('should create an instance', () => {
    const directive = new DateValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('validate', () => {
    component.StartDate = "2019-07-01";
    component.EndDate = "2017-07-01";
    fixture.detectChanges();

    const endDateControl = fixture.debugElement.query(By.css('[name=enddate]'));
    expect(endDateControl).toBeTruthy();

    fixture.whenStable().then(() => {
      const endDateControl = fixture.debugElement.query(By.css('[name=enddate]'));
      endDateControl.nativeElement.value = "2019-07-01";
      dispatchEvent(endDateControl.nativeElement);
      let end = endDateControl.references['enddate'];
      fixture.detectChanges();
      end.validate();
      expect(end.valid).toBe(true);
    });
  });
});
