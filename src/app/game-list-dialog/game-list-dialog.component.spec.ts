import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListDialogComponent } from './game-list-dialog.component';

describe('GameListDialogComponent', () => {
  let component: GameListDialogComponent;
  let fixture: ComponentFixture<GameListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
