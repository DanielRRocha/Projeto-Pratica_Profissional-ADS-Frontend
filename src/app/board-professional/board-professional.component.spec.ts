import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardProfessionalComponent } from './board-professional.component';

describe('BoardProfessionalComponent', () => {
  let component: BoardProfessionalComponent;
  let fixture: ComponentFixture<BoardProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
