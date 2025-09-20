import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perrito } from './perrito';

describe('Perrito', () => {
  let component: Perrito;
  let fixture: ComponentFixture<Perrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perrito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perrito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
