import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyReclamtionsComponent } from './reply-reclamtions.component';

describe('ReplyReclamtionsComponent', () => {
  let component: ReplyReclamtionsComponent;
  let fixture: ComponentFixture<ReplyReclamtionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyReclamtionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyReclamtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
