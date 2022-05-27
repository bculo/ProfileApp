import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificaitonComponent } from './notificaiton.component';

describe('NotificaitonComponent', () => {
  let component: NotificaitonComponent;
  let fixture: ComponentFixture<NotificaitonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificaitonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificaitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
