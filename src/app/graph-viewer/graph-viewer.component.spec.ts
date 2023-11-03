import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphViewerComponent } from './graph-viewer.component';

describe('GraphViewerComponent', () => {
  let component: GraphViewerComponent;
  let fixture: ComponentFixture<GraphViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphViewerComponent]
    });
    fixture = TestBed.createComponent(GraphViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
