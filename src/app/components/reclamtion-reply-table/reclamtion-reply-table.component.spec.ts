import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamtionReplyTableComponent } from './reclamtion-reply-table.component';

describe('ReclamtionReplyTableComponent', () => {
  let component: ReclamtionReplyTableComponent;
  let fixture: ComponentFixture<ReclamtionReplyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamtionReplyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamtionReplyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
