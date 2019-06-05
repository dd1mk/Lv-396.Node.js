import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SocialNetworksComponent } from './social-networks.component';

describe('SocialNetworksComponent', () => {
  let component: SocialNetworksComponent;
  let fixture: ComponentFixture<SocialNetworksComponent>;
  const mockLinksList = [
    {
      id: '0',
      title: 'instagram',
      link: 'https://www.instagram.com/softserve_career/?hl=uk',
      icon: 'assets/img/instagram.svg'
    },
    {
      id: '1',
      title: 'twitter',
      link: 'https://twitter.com/softserveinc',
      icon: 'assets/img/twitter.svg'
    },
    {
      id: '2',
      title: 'facebook',
      link: 'https://www.facebook.com/SoftServeInc',
      icon: 'assets/img/facebook.svg'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialNetworksComponent]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SocialNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it(`should be inject service, shouldn't get links list if note async`, () => {
    jasmine.createSpy('getLinksList').and
      .returnValue(Observable.of(mockLinksList));
    expect(component.links)
      .toEqual(mockLinksList);
    fixture.detectChanges();
  });

  it(`should return item id`, () => {
    expect(component.trackById(mockLinksList[1]))
      .toEqual('1');
  });
});
