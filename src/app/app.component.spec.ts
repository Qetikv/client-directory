import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client-directory'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client-directory');
  });

  it('should render the navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const h2Element = compiled.querySelector('h2')!;
    
    expect(compiled.querySelector('nav')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/users"]')).toBeTruthy();
    expect(h2Element.textContent).toContain('კლიენტების ცნობარი');
    
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
