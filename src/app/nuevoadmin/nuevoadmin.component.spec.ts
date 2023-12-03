import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoadminComponent } from './nuevoadmin.component';

describe('NuevoadminComponent', () => {
  let component: NuevoadminComponent;
  let fixture: ComponentFixture<NuevoadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoadminComponent]
    });
    fixture = TestBed.createComponent(NuevoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
