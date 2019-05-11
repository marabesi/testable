import { auth } from './Auth';

describe('Auth class', () => {

  describe.each(['/', '/intro', '/tutorial', '/end'])(
    'should redirect unauthenticated user ',
    (route) => {
      test(`trying to access: ${route}`, () => {
        const can = auth.canEnter({}, { pathname: route});
      
        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/');
      });
    },
  );

  test.each([ ['/'], ['/tutorial'], ['/end'] ])(
    'should keep the user leve 1 in the introduction section, trying to access: %s',
    (currentRoute) => {
      auth.isAuthenticated = true;
      auth.user.level = 1;
      const can = auth.canEnter({}, { pathname: currentRoute });
    
      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/intro');
    },
  );

  test.each([['/'], ['/intro'], ['/end']])(
    'should keep the user leve 2 in the tutorial section, trying to access: %s',
    (currentRoute) => {
      auth.isAuthenticated = true;
      auth.user.level = 2;
      const can = auth.canEnter({}, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/tutorial');
    },
  );

  test.each([['/'], ['/intro'], ['/tutorial']])(
    'should keep the user leve 3 in the end section, trying to access: %s',
    (currentRoute) => {
      auth.isAuthenticated = true;
      auth.user.level = 3;
      const can = auth.canEnter({}, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/end');
    },
  );


  test.each([['/intro', 1], ['/tutorial', 2], ['/end', 3]])(
    'should render the related component  based on the level, trying to access route %s, level %s',
    (currentRoute, level) => {
      auth.isAuthenticated = true;
      auth.user.level = level;
      const can = auth.canEnter({}, { pathname: currentRoute });

      expect(can.flag).toBeTruthy();
    },
  );
});