import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorationComponent } from './data-exploration.component';

describe('DataExplorationComponent', () => {
  let component: DataExplorationComponent;
  let fixture: ComponentFixture<DataExplorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExplorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
