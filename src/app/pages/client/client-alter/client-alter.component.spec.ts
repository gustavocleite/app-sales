import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAlterComponent } from './client-alter.component';

describe('ClientAlterComponent', () => {
  let component: ClientAlterComponent;
  let fixture: ComponentFixture<ClientAlterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAlterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAlterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
