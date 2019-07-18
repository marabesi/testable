import firebase from 'firebase/app';
import { auth } from './Auth';

firebase.auth = () => {
  return {
    signOut: jest.fn()
  };
};

describe('Auth behavior', () => {

  test('should logout', () => {
    const callback = jest.fn();
    auth.signout(callback);

    expect(callback).toBeCalled();
  });

  describe('route access and redirection', () => {
    describe.each(['/', '/intro', '/tutorial', '/tutorial-end', '/intro-tdd', '/tdd'])(
      'should redirect unauthenticated user ',
      (route) => {
        test(`trying to access: ${route}`, () => {
          const can = auth.canEnter({}, { pathname: route});
        
          expect(can.flag).toBeFalsy();
          expect(can.to).toEqual('/');
        });
      },
    );
  
    test.each([['/'], ['/tutorial'], ['/tutorial-end'], ['/intro-tdd'], ['/tdd']])(
      'should keep the user leve 1 in the introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 1;
        const can = auth.canEnter({}, { pathname: currentRoute });
      
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/intro');
      },
    );
  
    test.each([['/'], ['/intro'], ['/tutorial-end'], ['/intro-tdd'], ['/tdd']])(
      'should keep the user leve 2 in the tutorial section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 2;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tutorial');
      },
    );
  
    test.each([['/'], ['/intro'], ['/tutorial'], ['/intro-tdd'], ['/tdd']])(
      'should keep the user leve 3 in the tutorial end section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 3;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tutorial-end');
      },
    );

    test.each([['/'], ['/intro'], ['/tutorial'], ['/tdd']])(
      'should keep the user leve 4 in the tdd introduction section, trying to access: %s',
      (currentRoute) => {
        auth.isAuthenticated = true;
        auth.user.level = 4;
        const can = auth.canEnter({}, { pathname: currentRoute });
  
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/tdd-intro');
      },
    );
  
  
    test.each([['/intro', 1], ['/tutorial', 2], ['/tutorial-end', 3], ['/tdd-intro', 4]])(
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