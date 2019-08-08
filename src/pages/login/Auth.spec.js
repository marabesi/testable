import firebase from 'firebase/app';
import { auth } from './Auth';

firebase.auth = () => {
  return {
    signOut: jest.fn()
  };
};

const availableRoutes = [
  '/',
  '/intro',
  '/tutorial',
  '/intro-tdd',
  '/tdd',
  '/tdd-end',
  '/rocket-01',
  '/rocket-02',
  '/rocket-03',
  '/completed',
  '/survey'
];

describe('Auth behavior', () => {

  test('should logout', () => {
    const callback = jest.fn();
    auth.signout(callback);

    expect(callback).toBeCalled();
  });

  describe('route access and redirection', () => {

    describe.each(availableRoutes)(
      'should redirect unauthenticated user ',
      (route) => {
        test(`trying to access: ${route}`, () => {
          const can = auth.canEnter({}, { pathname: route});
        
          expect(can.flag).toBeFalsy();
          expect(can.to).toEqual('/');
        });
      },
    );
  
    test.each(availableRoutes.filter(route => route !== '/intro'))(
      'should keep the user level 1 in the introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 1;
        const can = auth.canEnter({}, { pathname: currentRoute });
      
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/intro');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/tutorial'))(
      'should keep the user level 2 in the tutorial section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 2;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tutorial');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/tutorial-end'))(
      'should keep the user level 3 in the tutorial end section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 3;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tutorial-end');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/tdd-intro'))(
      'should keep the user level 4 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 4;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tdd-intro');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/tdd'))(
      'should keep the user level 5 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 5;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tdd');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/tdd-end'))(
      'should keep the user level 6 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 6;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tdd-end');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/rocket-01'))(
      'should keep the user level 7 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 7;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/rocket-01');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/rocket-02'))(
      'should keep the user level 8 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 8;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/rocket-02');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/rocket-03'))(
      'should keep the user level 9 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 9;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/rocket-03');
      },
    );

    test.each(availableRoutes.filter(route => route !== '/completed'))(
      'should keep the user level 10 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 10;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/completed');
      },
    );
    test.each(availableRoutes.filter(route => route !== '/survey'))(
      'should keep the user level 11 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 11;
        const can = auth.canEnter({}, { pathname: currentRoute });

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/survey');
      },
    );

    test.each([
      ['/intro', 1],
      ['/tutorial', 2],
      ['/tutorial-end', 3],
      ['/tdd-intro', 4],
      ['/tdd', 5],
      ['/tdd-end', 6],
      ['/rocket-01', 7],
      ['/rocket-02', 8],
      ['/rocket-03', 9],
      ['/completed', 10],
      ['/survey', 11],
    ])(
      'should render the related component  based on the level, trying to access route %s, level %s',
      (currentRoute, level) => {
        auth.isAuthenticated = true;
        // @ts-ignore
        auth.user.level = level;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeTruthy();
      },
    );
  });
});